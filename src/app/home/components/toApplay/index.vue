<template>
  <div class="toapplay-page">

      <div class="wrapper">
  
        <div class="controller">
          <div class="masterMap">
              <img src="~assets/images/masterPic.png" alt="">
              <div class="masterMapBtn ">
                  <p class="bg"></p>
                  <div class="goodMsaage flex  ">
                    <!-- <p class=" flex-item">奖励：<span>拍下的商品</span></p> -->
                    <p  class=" flex-item" v-if="applayList.goods_product==1">奖励：<span>拍下的商品</span></p>
                    <p  class=" flex-item" v-if="applayList.goods_product==2">奖励：<span>获得小礼品</span></p>  
                    <p class=" flex-item" v-if="applayList.goods_id">活动编号：<span>{{applayList.goods_id}}</span></p>
                  </div>
                   <!-- 1小程序 2APP 3微信 4 扫码 -->
                  <p class="app" v-if="applayList.port_type==1"><span>端口：拼多多小程序</span></p>
                  <p class="app" v-if="applayList.port_type==2"><span>端口：拼多多APP</span></p>
                  <p class="app" v-if="applayList.port_type==3"><span>端口：微信</span></p>
                  <p class="app" v-if="applayList.port_type==4"><span>端口：扫码</span></p>

              </div>
          </div>
      
          <div class="detailList">
            
            <ul>
                <li @click="switchover(0)"><div :class="{ active: 0 == active}" >活动详情</div></li>
                <li @click="switchover(1)"><div :class="{ active: 1 == active}">新手必看</div></li>
            </ul>
            <div class="flex mainBg marginTopHeight "></div>   
            <nav>
                    <div class="status">
              <div class="sta-group">
            
                <div class="sta-txt">

                  <i  class="sp1 sp-success  " ></i>
                  <span class="num1 num mainBgColor" >1
                    <span class="color333">申请</span>

                  </span>
                </div>
                <div class="sta-txt">
                  <i  class="sp2 sp-success"></i>
                   <span class="num2 num" >2
                      <span  style="width:102px" class="color333">找到宝贝并付款</span>
                   </span>
                 
                </div>
                <div class="sta-txt">
                  <i  class="sp3 sp-success"></i>
                   <span class="num3 num">3
                     <span  class="span3 color333">拍摄图片</span>
                   </span>
                  
                </div>
                <div class="sta-txt">

                  <i  class="sp4 sp-success" ></i>
                   <span class="num4 num">4
                     <span  class="span4 color333">评价</span>
                   </span>
                  
                </div>
                <div class="sta-txt">
                    <span class="num5 num" >5
                      <span  class="span5 color333">完成</span>
                    </span>
                  
                </div>
              </div>
            </div>

            </nav>
          </div>
          
        </div>
        
      </div>

     <div class="flex mainBg marginTopHeight "></div>
      <!-- <scroller> -->
      <!--   :on-refresh="refresh"
        :on-infinite="infinite"
        ref="my_scroller"> -->
          <div class="main bgWrite">

              <!-- 申请 -->
              <div class="apply " v-if="applayList"> 
                <p v-if="applayList.goods_type==1">下单类型：<span class="mainFontColor">有团参团，无团开团</span></p>
                <p v-if="applayList.goods_type==2">下单类型：<span class="mainFontColor">去参团 </span></p>
                <p v-if="applayList.goods_type==3">下单类型：<span class="mainFontColor">一建开团</span></p>
                <p v-if="applayList.goods_type==4">下单类型：<span class="mainFontColor">单独购买</span></p>
                <p>商品价格：<span  class="mainFontColor">￥{{applayList.goods_price}}</span></p>
                <p>拍下件数:<span  class="mainFontColor"> {{applayList.goods_buy_num}}件</span></p>
                <p>拍下总价格(含邮费):<span  class="mainFontColor">￥{{applayList.goods_buy_price}}</span></p>
                <p>活动建议：<span> {{applayList.port_remain}}</span></p>
                <p>下单注意事项：<span> {{applayList.goods_desc}}</span></p>
            </div>
    

          </div>

    
        <!-- </scroller> -->
              <div class="applay-btn flex textC mainBoderTop">
                <p class="flex-item" @click="goHome">查看其他活动</p>
                <p class="flex-item active " @click="toApplay">立即申请</p>
          </div>
  </div>
</template>

<script>
import Index from "./index.js";
export default Index;
</script>
