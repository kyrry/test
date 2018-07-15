<template>
  <div class="user-set-page">
    <scroller ref="myscroller">
      <div class="wrapper">
        <div class="controller">
          <form class="form-group" ref="form" @submit.prevent="handleSumbit">
            <div class="input-group">


              
              <div class="item">
                <i class="sp sp-horn"></i>
               <p> <span>公众号推送</span>（根据试用状态推送消息）</p>
                <div class="right switch">
                  <div class="switch-checked">
                    <input type="checkbox" id="open_audio" >
                    <label for="open_audio" class="green"></label>
                  </div>
                </div>
              </div>

           <router-link  class="item" id="transition" tag="div" :to="{ name: 'welcome.modifypwd'}">
              <!-- <div class="item" > -->
                <i class="sp sp-set-01"></i>
                <span>修改密码</span>
                <div class="right">
                  <span ></span>
                  <!-- <span  class="fc">请选择</span> -->
                </div>
                <i class="iconMore  icon-more"></i>
              <!-- </div> -->
           </router-link>
      
         
       



            </div>

        
          </form>
    
          <div class="mainBtn btn" @click="loginOut">
            <a href="javascript:" >退出当前账号</a>
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
