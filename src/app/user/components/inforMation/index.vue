<template>
  <div class="user-certify-page">
    <!-- <scroller> -->
      <div class="wrapper">
        <div class="controller">
          <form class="form-group" ref="form" >
            <div class="input-group">

 
               <div class="item">
                  <i class="iconTipSize icon-tip"></i>
                 <a class="mint-cell mint-field">
                  <div class="mint-cell-left"></div>
                  <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                     
                      <span class="mint-cell-text ">填写昵称：</span>
                    </div>
                    <div class="mint-cell-value">
                      <div class="mint-cell-value is-link">
                        <input placeholder="请填写昵称,一经确认无法修改" type="text" class="mint-field-core text-right"   v-model="data.nickname">
                        <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
                      </div>
                    </div>
                    <!-- <i class="mint-cell-allow-right"></i> -->
                       <!-- <i class="iconMore icon-more"></i> -->
                    <mt-actionsheet :actions="sexs" v-model="sexVisible" cancel-text="取消"></mt-actionsheet>
                  </div>
                </a>
               </div>



               <div class="item">
                     <i class="iconTipSize icon-tip"></i>
                 <a class="mint-cell mint-field">
                  <div class="mint-cell-left"></div>
                  <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                      <!-- <i class="iconTipSize icon-tip"></i> -->
                      <span class="mint-cell-text ">选择性别 :</span>
                    </div>
                    <div class="mint-cell-value">
                      <div class="mint-cell-value is-link" @click="sexVisible = true">
                        <input placeholder="请选择性别" type="text" class="mint-field-core text-right" readonly="readonly" v-model="data.sexText">
                        <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
                      </div>
                    </div>
                    <!-- <i class="mint-cell-allow-right"></i> -->
                       <i class="iconMore icon-more"></i>
                    <mt-actionsheet :actions="sexs" v-model="sexVisible" cancel-text="取消"></mt-actionsheet>
                  </div>
                </a>
               </div>



                <div class="item">
                <i class="iconTipSize icon-tip"></i>
                <a class="mint-cell mint-field">
                  <div class="mint-cell-left"></div>
                  <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                    
                      <span class="mint-cell-text">出生日期 :</span>
                    </div>
                    <div class="mint-cell-value">
                      <div class="mint-cell-value is-link" @click="open('picker')">
                        <input placeholder="请选择出身日期" type="text" class="mint-field-core text-right" readonly="readonly" v-model="data.birthday">
                        <!-- <mt-button  size="large">{{data.birthday|formatDate}}</mt-button> -->
                        <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
                      </div>
                    </div>
                    <!-- <i class="mint-cell-allow-right"></i> -->
                       <i class="iconMore icon-more"></i>
                 

                    <mt-datetime-picker class="picker_show"
                                                ref="picker"
                                                type="date"
                                                  v-model="Value"
                                                :startDate = "startDate"
                                                :endDate = "endDate"
                                                 @confirm="handleConfirm"
                    ></mt-datetime-picker>
                  </div>
                </a>
                </div>



              <div class="item" @click="addressSelect">
                  <i class="iconTipSize icon-tip"></i>
                 <a class="mint-cell mint-field">
                  <div class="mint-cell-left"></div>
                  <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                      <!-- <i class="iconTipSize icon-tip"></i> -->
                      <span class="mint-cell-text ">收货地区 :</span>
                    </div>
                    <div class="mint-cell-value">
                      <div class="mint-cell-value is-link">
                        <!-- <input placeholder="请收获地区" type="text" class="mint-field-core text-right" readonly="readonly"> -->
                        <span v-bind:class="{ 'color333': data.address }">{{data.address? data.address  : '请选择收货地区'}}</span>
                        <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
                      </div>
                    </div>
                    <!-- <i class="mint-cell-allow-right"></i> -->
                       <i class="iconMore icon-more"></i>
                    <mt-actionsheet :actions="sexs" v-model="sexVisible" cancel-text="取消"></mt-actionsheet>
                  </div>
                </a>
               </div>






              <div class="item">
                <i class="iconTipSize icon-tip"></i>
                 <a class="mint-cell mint-field">
                  <div class="mint-cell-left"></div>
                  <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                      <!-- <i class="iconTipSize icon-tip"></i> -->
                      <span class="mint-cell-text ">收货人姓名：</span>
                    </div>
                    <div class="mint-cell-value">
                      <div class="mint-cell-value is-link" >
                        <input placeholder="请填写真实姓名" type="text" class="mint-field-core text-right"  v-model="data.real_name">
                        <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
                      </div>
                    </div>
                    <!-- <i class="mint-cell-allow-right"></i> -->
                       <!-- <i class="iconMore icon-more"></i> -->
                    <mt-actionsheet :actions="sexs" v-model="sexVisible" cancel-text="取消"></mt-actionsheet>
                  </div>
                </a>
               </div>
                <div class="item">
                <i class="iconTipSize icon-tip"></i>
                 <a class="mint-cell mint-field">
                  <div class="mint-cell-left"></div>
                  <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                      <!-- <i class="iconTipSize icon-tip"></i> -->
                      <span class="mint-cell-text ">收货人电话：</span>
                    </div>
                    <div class="mint-cell-value">
                      <div class="mint-cell-value is-link" >
                        <input placeholder="请填写收货人电话" type="text" class="mint-field-core text-right"   v-model="data.phone">
                        <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
                      </div>
                    </div>
                    <!-- <i class="mint-cell-allow-right"></i> -->
                       <!-- <i class="iconMore icon-more"></i> -->
                    <mt-actionsheet :actions="sexs" v-model="sexVisible" cancel-text="取消"></mt-actionsheet>
                  </div>
                </a>
               </div>
                <div class="item">
                <i class="iconTipSize icon-tip"></i>
                 <a class="mint-cell mint-field">
                  <div class="mint-cell-left"></div>
                  <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                      <!-- <i class="iconTipSize icon-tip"></i> -->
                      <span class="mint-cell-text ">微信号：</span>
                    </div>
                    <div class="mint-cell-value">
                      <div class="mint-cell-value is-link" >
                        <input placeholder="请填写微信号" type="text" class="mint-field-core text-right"  v-model="data.wetChat">
                        <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
                      </div>
                    </div>
                    <!-- <i class="mint-cell-allow-right"></i> -->
                       <!-- <i class="iconMore icon-more"></i> -->
                    <mt-actionsheet :actions="sexs" v-model="sexVisible" cancel-text="取消"></mt-actionsheet>
                  </div>
                </a>
               </div>






     
            </div>
          </form>

          <div class="certify-content">
            <div class="certify-head">
              <span>请上传收货人信息截图</span>
              <!-- <i class="sp sp-tips"></i> -->
            </div>

            <div class="certify-body">
              <div class="item imgupload borderNone">
                <div class="img">
                  <!-- <img v-if="formData.validate.just" :src="formData.validate.just" @click="zoom(formData.validate.just)"> -->
                  <!-- <img v-else src="~assets/images/user/uploading.png"> -->
                     <img v-if="imgUrl" :src="imgUrl">
                    <img v-else src="~assets/images/user/uploading.png">
                    <img v-if="example&&!imgUrl" class="exampleImg" src="~assets/images/user/example.jpg">
                    <input class="file inputImg inputImg" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update($event, 'comment')"/>

                  <!-- <img v-else src="~assets/images/identity-just.png"> -->
                </div>
                <div class="txt" @click="checkOut">查看示例图</div>
                <i class="sp sp-right"></i>

                <i v-show="isJust || formData.validate.just" class="sp sp-success"></i>
              </div>
              <div class="mainFontColor messageNOtiice">
                注：填写的收货姓名和收货电话，务必跟账号的信息与上传的截图一致，否则将会影响参与活动
              </div>

            </div>
          </div>

          <div class="certify-btn">
              <button v-if="!isVerify" class="mainBtn" @click="handleSubmit">
                提交
            </button>
          </div>
     

        </div>

      </div>
    <!-- </scroller> -->
    <cityList v-if="cityShow"  v-on:cityClose="cityClose"></cityList>
    <mdialog  :message="err" :data="data1" v-show=" isNoticeShow " @toggleNotify="toggleNotify"></mdialog>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>