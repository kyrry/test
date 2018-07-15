import './index.scss';

import _          from 'lodash';
import Header     from '~common/components/header';
import phoneCode  from '~common/components/phone_code';
import axios 		      from 'axios';



export default {
  name: 'findpwd',
  data () {
    return {
      seen:'',
      seen2:'',
      state: {
        agree: true,
      },
      formData: {
        mobile            : '',
        verification_code : '',
        password          : '',
        password_confirm  : '',
      },
      active : false,
      loading: false,
    };
  },
  components: {
    'app-header'    : Header,
    phoneCode,
  },
  computed: {
  },
  mounted () {
    console.log(this.$store.get.state.Login.userWithdrawInfo);
    // this.list();
    let self = this;
    if(this.$versions().ios) {
      self.client = 'ios'
    }else if(self.$versions().android){
      self.client = 'ios'
    }else if(self.$versions().webApp){
      self.client = 'webApp'
    }else if(self.$versions().weixin){
      self.client = 'weixin'
    }
  },
  watch: {
    formData: {
      deep: true,
      handler () {
        this.handlePassChange();
      }
    }
  },
  methods: {
    changeSeen(seen){
      this.seen = !this.seen;
    },
    changeSeen2(seen2){
      this.seen2 = !this.seen2;
    },
    // 监测2次的密码是否一致
    handlePassChange () {
      if (!_.isEmpty(this.formData.mobile) && !_.isEmpty(this.formData.verification_code) && !_.isEmpty(this.formData.password) && !_.isEmpty(this.formData.password_confirm) && this.formData.password === this.formData.password_confirm) {
        this.active = true;
      }
      else {
        this.active = false;
      }
    },

    // 下一步
    handleSumbit () {
      let self = this;
      let instance = axios.create({
        transformRequest: [function (data) {
          let arr = []
          for (let it in data) {
            arr.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
          }
          return arr.join('&')
        }]
      })
      instance.post( 'api/index.php/connect/find_password', {
          phone: self.formData.mobile,
          client: self.client,
          captcha: self.formData.verification_code,
          password:self.formData.password,
      }).then(function(res){
        console.log(res.data)
        if(200===res.data.code){
          self.$toast( '修改成功');
          setTimeout(() => {
            let route = { name: 'welcome.Login' };
            let routeQuery = _.get(self.$route, 'query.dt');
            try {
              route = JSON.parse(routeQuery);
            }
            catch (err) {
              route = {
                name: 'welcome.Login'
              };
            }
            self.$router.push(route);
          }, 2000);
   
        }
        else {
              self.$toast( res.data.datas.error||'修改失败');
            }
      })
    
   
    },
   

  }
};