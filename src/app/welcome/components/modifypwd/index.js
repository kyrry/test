import './index.scss';

import _          from 'lodash';
import Header     from '~common/components/header';
import phoneCode  from '~common/components/phone_code';
import axios 		      from 'axios';
import localStorage   from '~common/services/localStorage.cookie';


export default {
  name: 'findpwd',
  data () {
    return {
      seen:'',
      seen2:'',
      seen3:'',
      state: {
        agree: true,
      },
      formData: {
        psw:'',
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
    this.ken();
    console.log(this.KMToken);
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

  methods: {
    //获取token
    ken () {
      if (this.token) {
        localStorage.set('KMToken', {
          token : this.token,
        });
      }

      let token = localStorage.get('KMToken');
      this.KMToken = _.get(token, 'data.token');

    },
    changeSeen(seen){
      this.seen = !this.seen;
    },
    changeSeen2(seen2){
      this.seen2 = !this.seen2;
    },
    changeSeen3(seen3){
      this.seen3 = !this.seen3;
    },


    // 下一步
    handleSumbit () {
      let self = this;
      if(!self.formData.psw){
        self.$toast( '请填写原密码');
      }
      else if(!self.formData.password){
        self.$toast( '请填写新密码');
      }
     else if(!self.formData.password_confirm){
        self.$toast( '请确认密码');
      }else{
        
      let instance = axios.create({
        transformRequest: [function (data) {
          let arr = []
          for (let it in data) {
            arr.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
          }
          return arr.join('&')
        }]
      })
      instance.post( 'api/index.php/member_index/changePassword', {
        o_password:self.formData.psw,
        n_password:self.formData.password,
        key:self.KMToken
      })
      .then(function(res){
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
    
      }

   
    },
   

  }
};