<template>
  <div class="user-home-page">
    <!-- <scroller ref="myscroller"> -->
      <div class="wrapper">
          <div class="container">
      <div class="container-b" @click="toInformation">
          <img v-if="member_avatar" :src="member_avatar">
          <img v-else src="~assets/images/user/userPic.png">
          <a class="per">
             <span v-if="member_name " class="font20">{{member_name}}</span>
             <!-- <span v-if="member_nickname">{{member_nickname}}</span> -->
             <span v-else>{{member_nickname}}</span>
              <!-- 1为未认证 0为关闭 2认证中 3 已认证 -->
             <p v-if="member_state==1" class="authentication"><span class="font12">未认证</span></p>
             <p v-if="member_state==2" class="authentication"><span  class="font12">认证中</span></p>
             <p v-if="member_state==3" class="authentication"><span  class="font12">已认证</span></p>
          </a>
           <i class="iconMore headIcon icon-more2"></i>
      </div>


     <div class="container-order bgWrite " >
          <router-link class="container-order bgWrite "  tag="div" :to="{ name: 'home.orderList'}" >
         <div class="orderItem flex">
             <p class="left flex-item pleft20 font14">我的订单</p>
             <p class="right flex-item textC font14 color999 checkDetail">查看全部订单 </p>
             <i class="iconMore icon-more"></i>
         </div>
    </router-link>
      <div class="container-order bgWrite nav" >
      <!-- <router-link class="container-order bgWrite "  tag="div" :to="{ name: 'home.orderList'}" > -->
      <div class="container-order-b ">

              <div class="inBlock" @click="toggleState('state_new')" >
                 <span class="red-point" v-if="Number(state_new)<= 99"><em>{{ state_new ?  state_new : 0}}</em></span>
                 <span class="red-point" v-if="Number(state_new)>99" ><em style="width:30px;border-radius:10px">{{ state_new}}<i class="addMore font10">+</i></em></span>
                 <i class="iconSizes icon-waiting"></i>
                 <p>待提交</p>
             </div> 
            <div class="inBlock"  @click="toggleState('state_pay')" >
                <!-- <span class="red-point"><em>{{state_pay ? state_pay : 0}}</em></span> -->
                    <span class="red-point" v-if="Number(state_pay)<= 99"><em>{{ state_pay ?  state_pay : 0}}</em></span>
                    <span class="red-point" v-if="Number(state_pay)>99" ><em style="width:30px;border-radius:10px">{{ state_pay}}<i class="addMore font10">+</i></em></span>
                 <i class="iconSizes icon-phoneicon"></i>
                 <p>待拍摄</p>
             </div> 
            <div class="inBlock" @click="toggleState('state_send')" >

                   <!-- <span class="red-point"><em>{{state_send ? state_send : 0}}</em></span> -->
                     <span class="red-point" v-if="Number(state_send)<= 99"><em>{{ state_send ?  state_send : 0}}</em></span>
                    <span class="red-point" v-if="Number(state_send)>99" ><em style="width:30px;border-radius:10px">{{ state_send}}<i class="addMore font10">+</i></em></span>
                 <i class="iconSizes icon-waitPic"></i>
                 <p>待选图</p>
             </div> 
            <div class="inBlock"  @click="toggleState('state_img')">
                <!-- <span class="red-point"><em>{{state_img ? state_img : 0}}</em></span> -->
                  <span class="red-point" v-if="Number(state_img)<= 99"><em>{{ state_img ?  state_img : 0}}</em></span>
                    <span class="red-point" v-if="Number(state_img)>99" ><em style="width:30px;border-radius:10px">{{ state_img}}<i class="addMore font10">+</i></em></span>
                 <i class="iconSizes icon-commentIcon"></i>
                 <p>待评价</p>
             </div> 
            <div class="inBlock" @click="toggleState('state_appraise')" >
                <!-- <span class="red-point"><em>{{state_appraise ? state_appraise : 0}}</em></span> -->
                 <span class="red-point" v-if="Number(state_appraise)<= 99"><em>{{ state_appraise ?  state_appraise : 0}}</em></span>
                    <span class="red-point" v-if="Number(state_appraise)>99" ><em style="width:30px;border-radius:10px">{{ state_appraise}}<i class="addMore font10">+</i></em></span>
                 <i class="iconSizes icon-confirm"></i>
                 <p>待确认</p>
             </div> 
            <div class="inBlock"  @click="toggleState('state_after')" >
                <!-- <span class="red-point"><em>{{state_after ? state_after : 0}}</em></span> -->
                   <span class="red-point" v-if="Number(state_after)<= 99"><em>{{ state_after ?  state_after : 0}}</em></span>
                    <span class="red-point" v-if="Number(state_after)>99" ><em style="width:30px;border-radius:10px">{{ state_after}}<i class="addMore font10">+</i></em></span>
                 
                 <i class="iconSizes icon-saleAfter"></i>
                 <p>售后中</p>
             </div> 
            <div class="inBlock" @click="toggleState('state_cancel')" >
                <!-- <span class="red-point"><em>{{state_cancel ? state_cancel : 0}}</em></span> -->
                  <span class="red-point" v-if="Number(state_cancel)<= 99"><em>{{ state_cancel ?  state_cancel : 0}}</em></span>
                    <span class="red-point" v-if="Number(state_cancel)>99" ><em style="width:30px;border-radius:10px">{{ state_cancel}}<i class="addMore font10">+</i></em></span>
                

                 <i class="iconSizes icon-confirm"></i>
                 <p>已放弃</p>
             </div> 
            <div class="inBlock"  @click="toggleState('state_success')" >
                <!-- <span class="red-point"><em>{{state_success ? state_success : 0}}</em></span> -->
                  <span class="red-point" v-if="Number(state_success)<= 99"><em>{{ state_success ?  state_success : 0}}</em></span>
                    <span class="red-point" v-if="Number(state_success)>99" ><em style="width:30px;border-radius:10px">{{ state_success}}<i class="addMore font10">+</i></em></span>
                
                

                 <i class="iconSizes icon-saleAfter"></i>
                 <p>已完成</p>
             </div>
         </div> 
       </div>
           <!-- </router-link> -->
     </div>
    
      <div class="container-con" id="transition" >
          <router-link  class="con"  :to="{ name: 'user.count'}">
                 <div class="con-left">
                  <i class="iconSize icon-mine_icon"></i>
                  <span>我的账户</span>
              </div>
              <div class="con-rigth">
                  <i class="iconMore icon-more"></i>
              </div>
          </router-link>

            <router-link  class="con" id="transition" :to="{ name: 'home.compensation'}">
                 <div class="con-left">
                  <i class="iconSize icon-mine_icon_Gold"></i>
                  <span>金币补差</span>
              </div>
              <div class="con-rigth">
                  <i class="iconMore icon-more"></i>
              </div>
          </router-link>

           <router-link  class="con" id="transition" :to="{ name: 'home.service'}">
                 <div class="con-left">
                  <i class="iconSize icon-mine_icon_Customer"></i>
                  <span>平台客服</span>
              </div>
              <div class="con-rigth">
                  <i class="iconMore icon-more"></i>
              </div>
          </router-link>

          <router-link  class="con" :to="{ name: 'user.set'}">
                 <div class="con-left">
                  <i class="iconSize icon-mine_icon_Settings"></i>
                  <span>设置</span>
              </div>
              <div class="con-rigth">
                  <i class="iconMore icon-more"></i>
              </div>
          </router-link>

      </div>
  </div>
      </div>
    <!-- </scroller> -->

    <app-footer ref="footer"></app-footer>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
