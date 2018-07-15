<template>
  <div class="user-card-page">
  
    <div class="nav">
            <div class="navList">
            
            <ul>
                <li @click="switchover(0)"><div :class="{ active: 0 == active}" >差价申请</div></li>
                <li @click="switchover(1)"><div :class="{ active: 1 == active}">申请记录</div></li>
            </ul>
            <nav   v-show=" 1 == active">
              <div @click="switchState('check_pending')"><p  :class="{ active: 'check_pending' == type  }" >待审核</p></div>
              <div @click="switchState('pass')"><p  :class="{ active: 'pass' == type}">已通过</p></div>
              <div @click="switchState('no_pass')"><p  :class="{ active: 'no_pass' == type}">已拒绝</p></div>
            </nav>
          </div>

    </div>


    <scroller
      ref="my_scroller">

      <div class="applay_wrapper" v-show=" 0 == active">
        <div class="container">
          <div class="form-group" >
            <div class="item">
              <span>活动编号</span>
              <input vd-required
                type="tel"
                v-model.trim="orderNumber"
                placeholder="请填写活动编号">
              <div  class="textC" @click="getCode">
                   <p class="getcode code ">
                  点击获取
                </p>
              </div>
            </div>
 
            <div class="item">

              <span>活动价格</span>
              <input vd-required
                type="tel"
                v-model.trim="promotionPrice"
                placeholder="请填写活动价格">
      
            </div>
            <div class="item">
              <span>实付差价</span>
              <input vd-required
               type="tel"
                v-model.trim="RealPay"
                placeholder="请填写您实际支付的价格">
            </div>
            <div class="item">
              <span>需补差价</span>
              <span class="color999">{{Number(RealPay)-Number(promotionPrice)|| '自动获取'}}</span>
            </div>

          <p class="reason">填写您需要申请补差价的具体理由</p>
          <textarea v-model="user_desc"  class="reason-detail "  rows="3" cols="46" placeholder="请填写申请补差的具体理由，方便商家快速审核通过切勿填写联系方式、不文明字眼，否则将会被系统永久拉黑处理"></textarea>
            <div class="button-item">
              <button type="submit" class="mainBtn" @click="toApplay">提交申请</button>
            </div>
          </div>
          <div class="reason-tip">
            <p class="tit mainFontColor">申请差价注意：</p>
            <p >1.每个试用<span class="mainFontColor">只有2次</span>提交申请补差机会，请务必认真核对信息后再点击提交申请，如发现有弄虚作假等情况，平台将会对该账号永久拉黑，冻结资金处理。</p>
            <p >2.如该体验出现差价，请务必在该试用确认完成后<span class="mainFontColor">3天内提交申请补差</span>，逾期将无法提交补差申请（即：试用在1号确认完成，需要在3号之前申请补差）。</p>
          </div>


          
        </div>
      </div>

      <div class="wrapper" v-show=" 1 == active">
      <div class="container">
        <ul class="order-list"  >
              
          <li  v-for="(item, index) in mendList" :key="index" >
                <div class="orderStatus">
                 <p class="flex-items">体验编号：<span>{{item.order_sn}}</span></p>
                 <p class="flex-item textR">{{item.gc_name}}</p>
                 <p class="status" v-if="item.status==10">等待审核</p>
                 <p class="status green"  v-if="item.status==20">已通过</p>
                 <p class="flex-item"  v-if="item.status==30">已拒绝</p>

               </div>
               <div class="order_list_content">
                <div class="order_img"> 
                   <img :src="item.goods_image_url" alt="">
                 </div>
                 <div class="order_info">
                   <dl>
                     <dt><span >申请时间：</span>{{item.add_time}}</dt>
                     <dd ><span >体验价格：</span>{{item.experience_price}}</dd>
                     <dd ><span >实际价格：</span>{{item.reality_price}}</dd>
                     <dd ><span >需补差价：</span>{{item.difference_price}}</dd>
                     
                   </dl>
                 </div>
               </div>
               <div class="nav_bottom">
                  <p class="refuse"  v-if="item.status==30">{{item.user_desc}}</p>

                 <div class="nav_bottom_list">
                    <p v-if="item.status==10" @click="cancelClick(item.id)">取消申请</p>
                    <p class="gray"  v-if="item.status==20">查看详情</p>

                 </div>
               </div>
         
 
              </li>
          </ul>

          <div class="no-perform" v-if="performShow">
            <div class="img-wrapper">
              <img src="~assets/images/noData4.png">
                <p>暂时没有记录</p>
            </div>
          </div>
        
          
        </div>
      </div>

    </scroller>

        <mdialog  :message="err" :data="data" v-show=" isNoticeShow " @toggleNotify="toggleNotifyFn"></mdialog>
        <mdialog  :message="cancel" :data="data" v-show=" iscancelApplay " @togglecancel="togglecancel" ></mdialog>


  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
