<template>
  <div class="relevance-page">
    <!-- <app-header title="注册"></app-header> -->
    <scroller>
      <div class="wrapper">
        <div class="controller">
          <form class="form-group" ref="form" @submit.prevent="handleSumbit">

            <div class="item">
              <!-- <i class="iconSize icon-phone-num"></i> -->
              <span>手机号</span>
              <input vd-required
                vd-validate
                vd-type="phone"
                v-model.trim="formData.username"
                type="text"
                vd-notify='{
                  "text": "请输入11位手机号码",
                  "patt": "手机号码格式不正确"
                }'
                placeholder="请输入手机号码">
            </div>

 
           <div class="item">
              <!-- <i class="iconSize icon-phone-ycode"></i> -->
              <span>验证码</span>
              <input vd-required
                v-model.trim="formData.ycode"
                type="text"
                vd-notify='{
                  "text": "请输入验证码",
                }'
                placeholder="请输入验证码">
                <div class="code">
                  <phoneCode title="获取验证码" :phone="formData.username"></phoneCode>
                </div>
            </div>

           <div class="tip">
              <!-- <i class="iconSize icon-phone-ycode"></i> -->
              <p>关联后，使用微信即可直接登录</p>

            </div>

            
            <div class="button-item">
              <button type="submit" class="mainBtn" :class="{ mainBgtColor: active }" :disabled="!active">关联并登录</button>
            </div>
            <!-- <div class="backLogin mainFontColor" @click="handleBack"> -->
              <!-- 返回登录 -->
              <!-- <Checkbox v-model="single">
                <span>阅读并同意</span>
                <a class="link" href="javascript:" @click.stop="see">《卡盟金服服务协议》</a>
              </Checkbox> -->
            <!-- </div> -->
          </form>
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