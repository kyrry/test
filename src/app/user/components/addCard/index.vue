<template>
  <div class="user-addCard-page">
    <scroller ref="myscroller">
      <div class="wrapper">
        <div class="controller">
          <form class="form-group" ref="form" @submit.prevent="handleSumbit">
            <div class="input-group">
            <router-link  class="item" tag="div"  :to="{ name: 'user.addCardMessage'}">
                <i class=" iconSize icon-add1"></i>
                <span>添加银行卡</span>
                <div class="right">
                  <span ></span>
                </div>
                <i class="iconMore  icon-more"></i>
            </router-link>
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
