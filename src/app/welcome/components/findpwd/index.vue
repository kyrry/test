<template>
  <div class="findpwd-page">
    <!-- <app-header title="找回密码"></app-header> -->
    <scroller>
      <div class="wrapper">
        <div class="controller">
          <form class="form-group" ref="form" @submit.prevent="handleSumbit">

            <div class="item">
              <!-- <i class="icon icon-phone"></i> -->
              <span>手机号</span>
              <input vd-required
                vd-validate
                vd-type="phone"
                v-model.trim="formData.mobile"
                type="text"
                vd-notify='{
                  "text": "请输入11位手机号码",
                  "patt": "手机号码格式不正确"
                }'
                placeholder="请输入11位手机号码">
            </div>

            <div class="item">
              <!-- <i class="icon icon-vali"></i> -->
              <span>验证码</span>
              <input vd-required
                v-model.trim="formData.verification_code"
                type="text"
                vd-notify='{
                  "text": "请输入短信验证码",
                }'
                maxlength="6"
                placeholder="请输入短信验证码">
                <div class="code">
                  <phoneCode title="获取验证码" :phone="formData.mobile" :type = "3"></phoneCode>
                </div>
            </div>

            <div class="item">
              <!-- <i class="icon icon-password"></i> -->
              <span>新密码</span>
              <input vd-required
                vd-validate
                v-model.trim="formData.password"
                 :type="seen ? 'text' : 'password'"
                vd-notify='{
                  "text": "新密码不能为空",
                  "patt": "新密码格式不正确"
                }'
                placeholder="请输入6-16位数字或字母">
               <i class="iconMore  openEright "  :class=" seen ?  'icon-openE' : 'icon-closeE'"   @click="changeSeen(seen)"></i>


            </div>

            <div class="item">
              <!-- <i class="icon icon-password"></i> -->
              <span>确认密码</span>
              <input vd-required
                vd-validate
                
                v-model.trim="formData.password_confirm"
                :type="seen2 ? 'text' : 'password'"
                vd-notify='{
                  "text": "确认密码不能为空",
                  "patt": "确认密码格式不正确"
                }'
                placeholder="请输入确认密码">
                   <i class="iconMore  openEright "  :class=" seen2 ?  'icon-openE' : 'icon-closeE'"   @click="changeSeen2(seen2)"></i>

            </div>

            <div class="button-item">
              <button type="submit" class="btn mainBgColor" >提交</button>
            </div>
          </form>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>