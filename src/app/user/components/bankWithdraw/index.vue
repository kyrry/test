<template>
  <div class="user-bankWithdraw-page">
    <!-- <app-header title="实名验证"></app-header> -->
    <scroller>
      <div class="wrapper">
        <div class="controller">
          <form class="form-group" ref="form">
            <div class="input-group">


              <div class="item mainBorderBottom" @click="bankDetail">
               <!-- <i class="iconTipSize icon-tip"></i> -->
                <span>{{cardName}}</span>
                <div class="right">
                  <!-- <input vd-required
                    v-model="formData.card_name"
                    type="text"
                    placeholder="查看银行卡信息"> -->
                    <span>查看银行卡信息</span>
                </div>
                 <i class="iconMore icon-more"></i>
              </div>

              <div class="item  itemNum ">
               <!-- <i class="iconTipSize icon-tip"></i> -->
                <span style="display:block; width:100% ;border-bottom:1px solid #ededeed;">￥<input type="tel " class="inputItem" placeholder="" v-model="put_money"></span>
               
              </div>
  




      
            </div>
          </form>
            <p class="mainFontColor font12 padWrap">注：您本月免费提现次数还剩余10次，详情请看下方通知</p>
            <div class="certify-btn">
                <button class="mainBtn" @click="handleSubmit">
                  提现
              </button>
            </div>
            <div class="note">
            <h3 class="mainFontColor font18">多多试用提现须知：</h3>
            <p class="font13">1. 满<span class="mainFontColor">10金币</span>可申请提现。</p>
            <p  class="font13">2. 每月<span class="mainFontColor">10次免费</span>申请提现（每月1号重新获取10次机会）。</p>
            <p  class="font13">3. 当月提现10次之后再次超额提现，将需扣除提现金额的5%作为手续费，超额申请提现，单笔至少收取1金币。</p>
            <p  class="font13">4. 银行卡建议采用比较常见的银行</p>
            <p  class="font13"><span class="mainFontColor">注：</span>请合理试用免费提现次数，避免超额申请提现。</p>
          </div>

    
     

        </div>
      </div>
    </scroller>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>