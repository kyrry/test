<template>
  <div class="wRegister-page">
    <!-- <app-header title="注册"></app-header> -->
    <scroller>
      <div class="wrapper">
        <div class="controller">
          <div class="wRegister" id="transitionName">
            <div class="nickname">
                  <img src="~assets/images/user/userPic.jpg">
                
                  <!-- ~assets/images/default-avatar.png -->
                       <!-- <img v-else src="~assets/images/default-avatar.png"> -->
              <p>爱吃粥的小鱼干</p>
            </div>
              <div class="submit">
                  <P class="title">还没有多多试用的账号？</P>
                  <button type="submit" class=" mainBtn toReg" >快速注册</button>
                  <P>已有多多试用的账号？</P>
                  <button type="submit" class="mainBtn  tologin" @click="toRelevance" >立即关联</button>
              </div>
          
        </div>
        </div>
      </div>
    </scroller>
    <!-- <ServiceAgreement v-model="isShow"></ServiceAgreement> -->
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>