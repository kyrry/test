<template>
  <div class="login-page">
    <scroller>
      <div class="wrapper">
				<div class="DuoDuo">
					<h1 class="title">
					  多多试用
					</h1>
				</div>
        <div class="login-box">
          <form class="form-group" ref="form" @submit.prevent="handleSumbit">
            <ul class="list">

              <li class="item">
                <div class="content">
                  <i class="icon icon-phone"></i>
                  <input type="text"
                    v-model="formData.username"
                    vd-required
                    vd-validate
                    vd-type="phone"
                    vd-notify='{
                      "text": "手机号码不能为空",
                      "patt": "手机号码格式不正确"
                    }'
                    placeholder="请输入手机号码">
                </div>
              </li>

              <li class="item">
                <div class="content">
                  <i class="icon icon-password fontWeight"></i>
                  <input 
                    :type="seen ? 'text' : 'password'"
                    v-model="formData.password"
                    vd-required
                    placeholder="请输入密码">
                  <i class="iconMore  openEright "  :class=" seen ?  'icon-openE' : 'icon-closeE'"   @click="changeSeen"></i>
                </div>
              </li>

<!--               <li class="item">
                <div class="content">
                  <i class="icon icon-vali"></i>
                  <input vd-required
										v-model.trim="formData.code"
										type="text"
										vd-notify='{
											"text": "请输入短信验证码",
										}'
										maxlength="6"
                    placeholder="请输入短信验证码">
                  <div class="code">
										<phoneCode title="获取验证码" :phone="formData.username"></phoneCode>
									</div>
                </div>
              </li> -->

            </ul>
            <div class="submit-btn">
              <button type="submit" class="btn" :class="{ 'on': active }" >立即登录</button>
            </div>
          </form>
          <div class="go-register flex">

            <router-link :to="{ name: 'welcome.Findpwd' }" class="getpass flex-item textL font16">忘记密码</router-link>
            <router-link :to="{ name: 'welcome.Register' }"  class=" flex-item textR font16" >新用户注册</router-link>
          </div>
           <!-- <div class="wetChat marginAuto" @click="wlogin">
              <p class="textC font16">
                <i class="icon  icon-wechat"></i>
                使用微信注册/登录
              </p>
          </div> -->

        </div>
        <div class="regsiter-btn" @click="btnClick">注册账号</div>
        
      </div>
    </scroller>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;

</script>
