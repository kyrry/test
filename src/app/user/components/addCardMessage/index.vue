<template>
  <div class="user-cardInformation-page">
    <!-- <app-header title="实名验证"></app-header> -->
    <scroller>
      <div class="wrapper">
        <div class="controller">
          <form class="form-group" ref="form" @submit.prevent="handleSumbit">
            <div class="input-group">

              <div class="item">
               <i class="iconTipSize icon-tip"></i>
                <span>持卡人：</span>
                <div class="right">
                  <input vd-required
                    v-model="formData.card_name"
                    type="text"
                    placeholder="请输入持卡人真实姓名">
                </div>
              </div>
              <div class="item">
               <i class="iconTipSize icon-tip"></i>
                <span>卡号：</span>
                <div class="right">
                  <input vd-required
                    v-model="formData.card_number"
                    type="text"
            
                    placeholder="请输入银行卡号">
                </div>
                <i class="iconMore icon-more"></i>
              </div>
              <div class="item">
               <i class="iconTipSize icon-tip"></i>
                <span>再次确认：</span>
                <div class="right">
                  <input vd-required
                    v-model="formData.cardNUmConfirm"
                    type="text"
           
                    placeholder="请确认银行卡号">
                </div>
                <i class="iconMore icon-more"></i>
              </div>
              <div class="item">
               <i class="iconTipSize icon-tip"></i>
                <span>银行名称：</span>
                <div class="right">
                  <input vd-required
                    v-model="formData.card_bank"
                    type="text"
                    placeholder="请输入银行名称">
                </div>
                <i class="iconMore icon-more"></i>
              </div>
              <div class="item" @click="addressSelect">
               <i class="iconTipSize icon-tip"></i>
                <span>开户行地区：</span>
                <div class="right">
                     <p  class="textL font16 color666"  v-bind:class="{ 'color333': data.address }">{{data.address? data.address  : '请选择收货地区'}}</p>
                </div>
                <i class="iconMore icon-more"></i>
              </div>
      
            </div>
          </form>
            <div class="note">
            <h3 class="mainFontColor font16">提示：</h3>
            <p  class="font13">1. 银行卡建议采用比较常见的银行</p>
            <p  class="font13">2. 出银行卡对照进行输入</p>
            <p  class="font13">3. 银行卡名称，请根据银行卡的左上角名称进行填写，不要填写多余的字眼，避免提现失败</p>
            <p  class="font13">4. 银行卡建议采用比较常见的银行</p>
            <p  class="font13">5. 如果不清楚开户行地区，建议百度查询或打电话咨询银行客服</p>
          </div>

          <div class="certify-btn">
              <button class="mainBtn" @click="submit">
                确定
            </button>
          </div>
     

        </div>
      </div>
    </scroller>
     
      <cityList v-if="cityShow"  v-on:cityClose="cityClose"></cityList>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>