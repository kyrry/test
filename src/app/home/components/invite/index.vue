<template>
  <div class="invite-page">
      <img class="banner" src="~assets/images/invite_banner.jpg">
      <div class="wrapper padWrap"   >
          <div class="mainBoder top">
              <p class="bg">
                <span class="font16 mainFontColor">奖励规则</span>
              </p>
              <div class="content">
                <p class="tit">奖励：</p>
                <div class="right">
                   <p>好友完成1单[试用活动]，您可以获得<span  class=" mainFontColor" >1金币/单</span>，每单都有</p>
                </div>
              
              </div>
              
          </div>
           <div class="flex share">
             
              <p class=" flex-item mainBgColor on" id="inviteCode" :data-clipboard-text="shareLInk" >
              分享链接邀请
              </p>
     

                 <p class="flex-item" @click="erShare">二维码邀请</p>
          </div>
          <div class="num-wrap">
            <p class="font16 pLeft40"><i class="iconSize icon-inviterrank"></i>邀请奖励</p>
           <div class="flex num">
             
                 <div class="flex-item ">
                   <p>{{welfareList.money}}元</p>
                   <p class="color999">已获得奖励</p>
                 </div>
                 <div class="flex-item success">
                   <p>{{welfareList.people_num}}人</p>
                   <p class="color999">已成功邀请</p>
                 </div>
          </div>
          </div>
          <div class="invrap-wrap">
            <p class="font16 pLeft40"> <i class="iconSize icon-inviter"></i>您邀请的好友</p>
              <div class="flex num mainBoderBottom">
                    <p class="flex-item invite-item">
                    用户名
                    </p>
                    <p class="flex-item invite-item">
                      状态
                    </p>
                  
              </div>    
              <div class="flex num mainBoderBottom" v-for="(item, index) in welfareList.list" :key="index">
                    <p class="flex-item invite-item">
                     {{item.member_name}}
                    </p>
                    <p class="flex-item invite-item" v-if="item.member_state==1">已注册待完善资料 </p>
                    <p class="flex-item invite-item" v-if="item.member_state==2">已注册未领取活动 </p>
                    <p class="flex-item invite-item" v-if="item.member_state==3">已帮你申请盈利中 </p>
                  
              </div>
          </div>
          <div class="invrap-wrap rank">
            <p class="font16 pLeft40"> <i class="iconSize icon-inviter"></i> 邀请排行榜 <span class="font12">(您排名第 <em class="mainFontColor">{{welfareList.my_sort}}</em>）</span></p>
              <div class="flex num mainBoderBottom">
                    <p class="flex-item invite-item">
                    用户名
                    </p>
                    <p class="flex-item invite-item">
                      邀请人数
                    </p>
                  
              </div>    
              <div class="flex num mainBoderBottom" v-for="(i, index) in welfareList.sort" :key="index"  >
                    <p class="flex-item invite-item textL  pLeft120  pRelative ">
                      <img v-if="i.member_avatar" :src="i.member_avatar" class="marginAuto headPortrait">  
                      <img v-else src="~assets/images/user/userPic.png" class="marginAuto headPortrait">
                    {{i.member_name}}
                    </p>
                    <p class="flex-item invite-item">
                      已邀请{{i.inviter_num}}人
                    </p>
              </div>
          </div>
                <div class="flex share">
                 <p class="flex-item mainBgColor on">分享链接邀请</p>
                 <p class="flex-item"  @click="erShare">二维码邀请</p>
                </div>
          

      </div>
      <app-footer></app-footer>
</div>
</template>

<script>
import Index from "./index.js";
export default Index;
</script>
