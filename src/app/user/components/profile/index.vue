<template>
  <div class="user-profile-page">
    <scroller ref="myscroller">
      <div class="wrapper">
        <div class="controller">
          <form class="form-group" >
            <div class="input-group">

              <div class="input-list personItem">
                <!-- <i class="sp sp-business-05"></i> -->
                <span>头像</span>
                <div class="right">
                  <div class="file-avatar">
                    <div class="avatar">
                      <img v-if="infor.member_avatar" :src="infor.member_avatar">
                      <img v-else src="~assets/images/user/userPic.png">
                    </div>
                  </div>
                </div>
                <i class="iconMore icon-more"></i>
              </div>

              <div class="input-list">
                <!-- <i class="sp sp-task-name"></i> -->
                <span>昵称</span>
                <div class="right">
                  <span v-if="infor.member_truename">{{infor.member_truename}}</span>
                  <!-- <input v-model="formData.user_nickname" type="text" placeholder="请输入昵称"> -->
                </div>
                <i class="iconMore icon-more"></i>
              </div>

              <div class="input-list" v-on:click="handleCityShowChange()">
                <!-- <i class="sp sp-address"></i> -->
                <span>性别</span>
                <div class="right">
                  <!-- <span v-if="address">{{ address }}</span>
                  <span v-else class="fc">请选择</span> -->
                   <span v-if="infor.member_sex==1">男</span>
                   <span v-if="infor.member_sex==2">女</span>
                </div>
                <i class="iconMore icon-more"></i>
              </div>


              <div class="input-list" >
                <!-- <i class="sp sp-address"></i> -->
                <span>出生日期</span>
                <div class="right">
                    <span v-if="infor.member_birthday">{{infor.member_birthday}}</span>
                 
                  <!-- <span v-if="address">{{ address }}</span>
                  <span v-else class="fc">请选择</span> -->
                </div>
                <i class="iconMore icon-more"></i>
              </div>
              
             

   

         

              <div class="input-list" >
                <!-- <i class="sp sp-address"></i> -->
                <span>收货地区</span>
                <div class="right">
                  <!-- <span v-if="address">{{ address }}</span>
                  <span v-else class="fc">请选择</span> -->
                     <span v-if="infor.member_areainfo">{{infor.member_areainfo}}</span>
                </div>
                <i class="iconMore icon-more"></i>
              </div>

              <div  class="input-list">
                <!-- <i class="sp sp-password"></i> -->
                <span>收货人</span>
                <div class="right">
                     <span v-if="infor.buy_name">{{infor.buy_name}}</span>
        
                  <!-- <input vd-required
                    v-model="formData.user_pass1"
                    type="password"
                    vd-notify='{
                      "text": "收货人不能为空",
                      "patt": "收货人格式不正确"
                    }'
                    placeholder="请再次输入收货人"> -->
                </div>
                <i class="iconMore icon-more"></i>
              </div>
              <div class="input-list">
                <!-- <i class="sp sp-task-mobile"></i> -->
                <span>联系电话</span>
                <div class="right">
                   <span v-if="infor.buy_moblie">{{infor.buy_moblie}}</span>
                  <!-- <span>{{ formData.phone || '请输入联系方式' }}</span> -->
                  <!-- <input vd-required
                    vd-validate
                    v-model="formData.mobile"
                    vd-type="phone"
                    type="text"
                    vd-notify='{
                      "text": "手机号不能为空",
                      "patt": "手机号格式不正确"
                    }'
                    placeholder="请输入常用手机号码"> -->
                </div>
                <i class="iconMore icon-more"></i>
              </div>

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
