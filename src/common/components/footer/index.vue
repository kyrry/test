<template>
  <div class="footer-page">
    <div class="controller">
      <ul class="list">
          <router-link  to="/home" tag="li" class="item"  :class="{ active: 'home'== active }">
              <i class="foot-menu foot-menu-home"></i>
              <i class="foot-menu foot-menu-home-act act"></i>
              <em class="foot-menu-em">整点秒杀</em>
         </router-link>
        <router-link  to="/invite" tag="li" class="item" :class="{ active: 'invite'== active }">
          <i class="foot-menu foot-menu-msg"></i>
          <i class="foot-menu foot-menu-msg-act act"></i>
          <em class="foot-menu-em">邀请福利社</em>
         </router-link>
        <router-link to="/user/"  class="item" tag="li" :class="{ active: 'user/'== active }">
          <i class="foot-menu foot-menu-me"></i>
          <i class="foot-menu foot-menu-me-act act"></i>
          <em class="foot-menu-em">我的</em>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import './index.scss';
  export default {
    data(){
      return {
        active:'home',
      }
    },
    mounted(){
      this.active = this.$route.path.slice(1);
      console.log(this.$route.path);
    }
  }
</script>
