<template>
  <div class="user-count-page">
    <!-- <scroller ref="myscroller"> -->
      <div class="wrapper">
        <div class="controller">
          <form class="form-group" ref="form" @submit.prevent="handleSumbit">
            <div class="container-account">
                <!-- <img src="/static/img/tou.jpg"> -->
                <div class="person">
                  <span>可提现金币</span>
                  <p class="money"><span>{{available_predeposit}}</span></p>
                </div>
                <p class="withdraw">提现中的金币：<span>{{available_predeposit}}</span></p>
                <!-- <i data-v-26bba2c4="" class="headIcon iconfont icon-youjiantou"></i> -->
            </div>

            <div class="moneyIn">
                <p class="title">提现金币介绍</p>
                <p class="detail">提现金币到账时间一般在2-3个工作日内，周六日顺延。比如周一提现，则最快在周三可到账；请在工作日内进行提现，因为周六日是银行休息日，无法进行返款操作。如果长时间未收到款项，请联系平台客服QQ：12345678</p>
            </div>
            <div class="input-group">

            <router-link  class="item" tag="div" id="transition" :to="{ name: 'home.record'}">
              <!-- <div class="item" > -->
                <i class="sp sp-set-01"></i>
                <span>金币记录</span>
                <div class="right">
                  <span ></span>
                </div>
                <i class="iconMore  icon-more"></i>
              <!-- </div> -->
            </router-link>

            <router-link  class="item" tag="div" id="transition" :to="{ name: 'welcome.invite'}">
              <!-- <div class="item" > -->
                <i class="sp sp-set-01"></i>
                <span>邀请获得的金币</span>
                <div class="right fr tmoney " >
                  <span >{{inviter_money}}</span>
                </div>
                <i class="iconMore  icon-more"></i>
              <!-- </div> -->
            </router-link>    
            </div>
          </form>
    
          <p class="exchange" @click="toExChange">提现</p>
          <!-- <div class="mainBtn btn">
            <a href="javascript:" >退出当前账号</a>
          </div> -->
        </div>
      </div>
    <!-- </scroller> -->


  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
