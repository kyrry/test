<template>
  <div class="user-oeder-page">
  
  




    <div class="nav">
      <div class="order_nav">
            <nav>
                <p @click="toggle('all')" :class="{active:'all'==active}">全部</p>
                <p @click="toggle('state_new')" :class="{active:'state_new'==active}">待提交(<span>{{state_new || 0}}</span>)</p>

                <p @click="toggle('state_pay')" :class="{active:'state_pay'==active}">待拍摄(<span>{{state_pay  || 0}}</span>)</p>

                <p @click="toggle('state_send')" :class="{active:'state_send'==active}">待选图(<span>{{state_send || 0}}</span>)</p>

                <p @click="toggle('state_img')" :class="{active:'state_img'==active}">待评价(<span>{{state_img || 0}}</span>)</p>

                <p @click="toggle('state_appraise')" :class="{active:'state_appraise'==active}">待确认(<span>{{state_appraise || 0}}</span>)</p>

                <p @click="toggle('state_after')" :class="{active:'state_after'==active}">售后中(<span>{{state_after || 0}}</span>)</p>

                <p @click="toggle('state_cancel')" :class="{active:'state_cancel'==active}">已放弃(<span>{{state_cancel || 0}}</span>)</p>

                <p  @click="toggle('state_success')" :class="{active:'state_success'==active}">已完成(<span>{{state_success || 0}}</span>)</p>
            </nav>
        </div>
   


    </div>


      <!-- :on-refresh="refresh" -->
    <scroller
      :on-infinite="infinite"
      ref="my_scroller">
      <div class="wrapper">
        <div class="container">
         
          <ul class="order-list"  >
            
            <li v-for="(item, index) in orderList" :key="index" v-if="orderList">
               <div class="orderStatus">
                 <p class="flex-item3">订单编号：<span class="orderNUm">{{item.order_sn}}</span></p>
                 <p class="flex-item textL">{{item.class_name}}</p>
                  <!-- 0 放弃  10去提交  20带拍摄  30带选图  35待评价 带确认45 50待售后   -->

                  <!-- <p class="status">待提交</p> -->
                 <p class="status" v-if="item.order_state == 10" >{{item.state_desc}}</p>

                 <!-- <p class="status">待拍摄</p> -->
                 <p class="status" v-if="item.order_state == 20" >{{item.state_desc}}</p>

                <!-- <p>待选图</p> -->
                 <p v-if="item.order_state == 30" >{{item.state_desc}}</p>

                 <!-- <p>待评价</p> -->
                 <p v-if="item.order_state == 35" >{{item.state_desc}}</p>

                 <!-- <p>待确认</p> -->
                 <p v-if="item.order_state == 45" >{{item.state_desc}}</p>

                <!-- <p>商家发起售后</p> -->
                 <p v-if="item.order_state == 50" >{{item.state_desc}}</p>

                 <!-- <p>已放弃</p> -->
                 <p v-if="item.order_state == 0" >{{item.state_desc}}</p>

                 <!-- <p class="flex-item">已完成</p> -->
                 <p class="flex-item" v-if="item.order_state == 40" >{{item.state_desc}}</p>


               </div>
               <div class="order_list_content">
                <div class="order_img"> 
                    <img :src="item.goods_image_url">
                 </div>
                 <div class="order_info">
                   <dl>
                     <dt><span >试用时间：{{item.add_time|handleDate}}</span></dt>
                     <dd ><span>掌柜旺旺：{{item.goods_pdd_name}}</span></dd>
                     <dd ><span >活动价格：￥{{item.goods_buy_price}}</span></dd>
                     <dd ><span >活动奖励：￥{{item.return_money}}</span>   </dd>
                     
                   </dl>
                 </div>
               </div>
               <div class="nav_bottom">
                 <div class="nav_bottom_list">
                      <!-- 0 放弃  10去提交  20带拍摄  30带选图  35待评价 待确认45  50待售后   40已完成 -->
                    <!-- 10去提交 -->
                    <p  v-if="item.order_state == 10" @click="ToGiveUp(item.order_id)" >放弃活动</p>

                    <p  v-if="item.order_state == 10"  @click="toSDetailubmit(item.order_id,item.goods_id,item.order_state)">去提交</p>
                   
                    <p  v-if="item.order_state == 20"  @click="toSDetailubmit(item.order_id,item.goods_id,item.order_state)">待拍摄</p>
                    <!-- 20带拍摄 -->
                    <p  v-if="item.order_state == 30" @click="toSDetailubmit(item.order_id,item.goods_id,item.order_state)">查看详情</p>

                    <p v-if="item.order_state == 35" @click="toSDetailubmit(item.order_id,item.goods_id,item.order_state)">去评价</p>

                    <!-- <p v-if="item.order_state == 45 && item.appraise_time">还有{{(item.appraise_time,item.add_time)|getDays(item.appraise_time,item.add_time)}}天才可以评价</p> -->
                    <!-- <p >还有{{('2017-4-5','2017-5-5')|getDays('2017-4-5','2017-5-5')}}天才可以评价</p> -->

                    <!-- 待确认45 -->
                    <p v-if="item.order_state == 45" @click="toSDetailubmit(item.order_id,item.goods_id,item.order_state)">查看详情</p>

                    <p v-if="item.order_state == 50" @click="saleafter">处理售后</p>
                     <!-- 40已完成 -->
                    <p  v-if="item.order_state == 40" @click="toSDetailubmit(item.order_id,item.goods_id,item.order_state)">查看详情</p>

                 </div>
               </div>
         
    
            </li>
              <li  v-if="noDataShow">

                <div class="nodata" v-if="noDataShow && 'all'==active"> 
                  <img src="~assets/images/noData1.png">
                  <p>暂时没有订单哦~</p>
                </div>
                <div class="nodata" v-if="noDataShow && 'state_new'==active"> 
                  <img src="~assets/images/noData1.png">
                  <p>暂时没有待提交订单哦~</p>
                </div>

                <div class="nodata" v-if="noDataShow && 'state_pay'==active"> 
                  <img src="~assets/images/noData1.png">
                  <p>暂时没有待拍摄订单哦~</p>
                </div>
                <div class="nodata" v-if="noDataShow && 'state_send'==active"> 
                  <img src="~assets/images/noData1.png">
                  <p>暂时没有待选图订单哦~</p>
                </div>
                <div class="nodata" v-if="noDataShow && 'state_img'==active"> 
                  <img src="~assets/images/noData1.png">
                  <p>暂时没有待评价订单哦~</p>
                </div>
                <div class="nodata" v-if="noDataShow && 'state_appraise'==active"> 
                  <img src="~assets/images/noData1.png">
                  <p>暂时没有待确认订单哦~</p>
                </div>
                <div class="nodata" v-if="noDataShow && 'state_after'==active"> 
                  <img src="~assets/images/noData1.png">
                  <p>暂时没有售后中订单哦~</p>
                </div>

                <div class="nodata" v-if="noDataShow && 'state_cancel'==active"> 
                  <img src="~assets/images/noData1.png">
                  <p>暂时没有已放弃订单哦~</p>
                </div>
                <div class="nodata" v-if="noDataShow && 'state_success'==active"> 
                  <img src="~assets/images/noData1.png">
                  <p>暂时没有已完成订单哦~</p>
                </div>


              </li>

          </ul>



          
        </div>
      </div>

    </scroller>
      <transition name="fade" v-if="ToGiveUpPage">
      <div class="mdialog" > 
      <div class="content" >
          <div class="head">
            <h3>请填写放弃理由</h3>
          </div>
          <div class="main">
            <textarea name="" id="" cols="30" rows="10" v-model="GiveUpPageContent" placeholder="请输入理由，仅限22字"  class="reason">

            </textarea>
              <!-- <p v-html="data"></p> -->
            <!-- <p >完善拼多多资料并认证，可立即参与平台活动</p> -->
          </div>
          <div class="foot foot2 flex">
            <p class="dialog-item flex-item ok" @click="determineGiveUp">确定放弃</p>
            <p class="flex-item cancel" @click="cancelGiveUp">取消</p>
            
          </div>
        </div> 
      </div>
  </transition> 
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
