<template>
  <div class="register-page">
    <!-- <app-header title="注册"></app-header> -->
    <scroller>
      <div class="wrapper">
        <div class="controller">
          <div class="form-group" ref="form">

            <div class="item">
              <i class="iconSize icon-phone-num"></i>
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
                placeholder="请输入11位手机号码">
            </div>

 

            <div class="item">
              <i class="iconSize icon-psw"></i>
              <span>登录密码</span>
              <input vd-required
                vd-validate
                v-model.trim="formData.password"
                  :type="seen ? 'text' : 'password'"
                vd-notify='{
                  "text": "登录密码不能为空",
                  "patt": "登录密码格式不正确"
                }'
                placeholder="输入密码">
               <i class="iconMore  openEright "  :class=" seen ?  'icon-openE' : 'icon-closeE'"   @click="changeSeen(seen)"></i>
            </div>

            <div class="item">
              <i class="iconSize icon-psw"></i>
              <span>确认密码</span>
              <input vd-required
                vd-validate
                v-model.trim="formData.password2"
                  :type="seen2 ? 'text' : 'password'"
                vd-notify='{
                  "text": "确认密码不能为空",
                  "patt": "确认密码格式不正确"
                }'
                placeholder="再次确认密码">
               <i class="iconMore  openEright "  :class=" seen2 ?  'icon-openE' : 'icon-closeE'"   @click="changeSeen2(seen2)"></i>
            </div>

            <div class="item">
                  <i class="iconSize icon-phone-code"></i>
                  <span>识别码</span>
                 <input type="text" placeholder="请输入识别码" class="yanzhengma_input"  v-model="picLyanzhengma" >
                 <input type="button" id="code" @click="createCode"  class="verification1 verCode"   v-model="checkCode"/> <br>
                 <!-- <span class="tishixiaoxi disappear">请输入识别码。</span> -->

            </div> 
           <div class="item">
              <i class="iconSize icon-phone-ycode"></i>
              <span>验证码</span>
              <input vd-required
                v-model.trim="formData.ycode"
                type="text"
                vd-notify='{
                  "text": "请输入验证码",
                }'
                placeholder="请输入验证码">
                <div class="code"  >
                  <!-- <button type="button" class="phone-code" >获取验证码</button> -->
                  <phoneCode title="获取验证码" :phone="formData.username" :type="1" ></phoneCode>
                </div>
            </div>

          
            <div class="item" v-if="isInviteShow">
              <i class="iconSize icon-invite"></i>
              <span>邀请人</span>
              <input vd-required
                type="text"
                v-model.trim="formData.invite_code"
                vd-notify='{
                  "text": "邀请码不能为空",
                }'
                placeholder="请输入邀请人">
            </div>

            <div class="button-item">
              <button  class="mainBtn" :class="{ mainBgtColor: active }"   @click="Sumbit">立即注册</button>
            </div>
            <div class="backLogin mainFontColor font16" @click="handleBack ">
              返回登录
              <!-- <Checkbox v-model="single">
                <span>阅读并同意</span>
                <a class="link" href="javascript:" @click.stop="see">《卡盟金服服务协议》</a>
              </Checkbox> -->
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