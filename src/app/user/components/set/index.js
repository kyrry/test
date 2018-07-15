import './index.scss';

import LocalStorage     from '~common/services/localStorage.cookie';

export default {
  name: 'userProfile',
  data () {
    return {
    };
  },
  components: {

  },

  mounted () {},

  methods: {
    loginOut() {
      console.log(666);
      this.$toast('退出成功');
      LocalStorage.remove('KMToken');
      LocalStorage.remove('KMDeviceType');
      LocalStorage.remove('userInfor');
      let self = this;
      setTimeout(() => {

          self.$router.push({
            name: 'user.Home',
          });
 
      }, 2000);
    }
  }
};
