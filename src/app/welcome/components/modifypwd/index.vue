<template>
  <div class="Modifypwd-page">
    <!-- <app-header title="找回密码"></app-header> -->
    <scroller>
      <div class="wrapper">
        <div class="controller">
          <div class="form-group">

            <div class="item">
              <!-- <i class="icon icon-phone"></i> -->
              <span>原密码</span>
              <input vd-required
                vd-validate
              :type="seen3? 'text' : 'password'"
                v-model.trim="formData.psw"
                placeholder="请输原密码">
                  <i class="iconMore  openEright "  :class=" seen3?  'icon-openE' : 'icon-closeE'"   @click="changeSeen3(seen3)"></i>
            </div>

      

            <div class="item">
              <!-- <i class="icon icon-password"></i> -->
              <span>新密码</span>
              <input vd-required
                vd-validate
                v-model.trim="formData.password"
                 :type="seen ? 'text' : 'password'"
                placeholder="请输入新密码">
               <i class="iconMore  openEright "  :class=" seen ?  'icon-openE' : 'icon-closeE'"   @click="changeSeen(seen)"></i>


            </div>

            <div class="item">
              <!-- <i class="icon icon-password"></i> -->
              <span>确认密码</span>
              <input vd-required
                vd-validate
                
                v-model.trim="formData.password_confirm"
                :type="seen2 ? 'text' : 'password'"
                placeholder="请输入确认密码">
                   <i class="iconMore  openEright "  :class=" seen2 ?  'icon-openE' : 'icon-closeE'"   @click="changeSeen2(seen2)"></i>

            </div>

            <div class="button-item">
              <button type="submit" class="btn mainBgColor" @click="handleSumbit">提交</button>
            </div>
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