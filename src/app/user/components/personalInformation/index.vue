<template>
  <main class="personal">

      <section class="personal_wrapper">
        <div class="info_box">
          <div class="head">
             <p><img src="~assets/images/user/err.png"></p>
              <p class="status">已提交，等待审核</p>
          </div>
          <div class="list">
            <div>
              <span class="num">1</span>
              <p class="borderBottomDot">
              预估在<span>48小时</span>
              内审核完成，内审核完成，审核结果将以短信通知，若审核不通过，请查看短信上的拒绝理由，按短信提示进行修改，重新上传资料进行审核。
              </p>
            </div>
              <div>
                <span  class="num">2</span>
                <p class="borderBottomDot">请关注<span>（多多试用）微信公众号</span>，可先阅读新手教程内容，学习活动流程以及常见问题，能够有效帮助您熟悉平台。</p>
              </div>
            <div>
              <span  class="num">3</span>
               <p>请长按下方二维码图片进行识别，添加多多试用平台QQ群，加群时候请备注您在平台注册的手机号码。</p>
            </div>
            <div>
            <p class="img borderBottomDot flex"> <img src="~assets/images/user/ercode.png"></p>
           </div>
           <div>
             <span  class="num">4</span>
            <p>平台将对您填写的信息进行保密，请勿轻信非平台官方发布的信息，如有问题，联系平台<span>官方QQ：123456789101</span></p> 
            </div>
          </div>
          <button type="submit" class=" mainBtn btn"  @click="goBackHome">返回大厅</button>
        </div>
      </section>
    <!-- </scroller> -->
    <!-- <Dates v-on:onDateClick="handelDateClick" :show="isShow" :today="false"></Dates> -->
    <!-- <cropper v-on:uploadFileClose="fileClose"></cropper> -->
        <!-- <ismDialog v-show="indialogShow"></ismDialog> -->
  </main>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>
