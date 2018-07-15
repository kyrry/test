import './index.scss';
import _            from 'lodash';
import axios 		      from 'axios';
import localStorage from '~common/services/localStorage.cookie';

export default {
  name: 'login',
  data () {
    return {
      loading: false,
      active: false,
      client:'',
      seen:'',
      formData: {
        username: '',
				password: '',
      },
    };
  },
  computed: {
  },
  mounted () {

    if(this.$versions().ios) {
      this.client = 'ios';
    }else if(this.$versions().android){
      this.client = 'ios';
    }else if(this.$versions().webApp){
      this.client = 'webApp';
    }else if(this.$versions().weixin){
      this.client = 'weixin';
    }


  },

  methods: {







    // vuex的使用
    btnClick(){
      // 触发action 存值
      this.$store.get.commit('saveloginDate', {
        loginDate: '1234'
      });
      // 取值
      console.log(this.$store.get.state);
      console.log(this.$store.get.state.Login.loginDate);
    },


 

    changeSeen(){
      this.seen = !this.seen;
    },
     /*
     * 提交表单--用户登陆
     */
    handleSumbit () {
 
      let self = this;
      if(!self.formData.username) {
        self.$toast('请输入用户名');
      }  
      else if(!self.formData.password) {
        self.$toast('请输入密码');
      }
      else{
        if (true === self.loading) {
          self.$toast('正在为您提交');
          return;
        }
        self.loading = true;
      let instance = axios.create({
        transformRequest: [function (data) {
          let arr = []
          for (let it in data) {
            arr.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
          }
          return arr.join('&')
        }]
      })
      instance.post( 'api/index.php/login', {
            username: self.formData.username,
            client: self.client,
            password:self.formData.password,
      })
      .then((res) => {
        if (200 === res.data.code) {
          self.$toast('登录成功');

          localStorage.set('KMToken', {
            token : _.get(res.data.datas, 'key'),
            weChat: 0,
          });
          localStorage.set('KMDeviceType', this.client);
          // self.$store.get.dispatch({
          //   type: 'histData',
          //   data: _.get(res.datas, 'key')
          // });
          
          localStorage.set('userInfor', res.data.datas);
          // self.$store.get.dispatch({
          //   type: 'histData',
          //   data: _.get(res.datas, 'key')
          // });

          setTimeout(() => {
            let route = { name: 'home.Home' };
            let routeQuery = _.get(self.$route, 'query.dt');
            try {
              route = JSON.parse(routeQuery);
            }
            catch (err) {
              route = {
                name: 'home.Home'
              };
            }
            self.$router.push(route);
          }, 2000);

        }
        else {
          self.loading = false;
          console.log(666);
          self.$store.get.dispatch({
            type  : 'handleChangeDialog',
            active: true,
            title : '温馨提示',
            msg   :res.data.datas.error || '登录失败',
            lists : [
              {
                msg: '关闭',
              },
            ]
          });
        }
      });
    }
    },

    //微信授权
    wlogin () {
      let aa = store.dispatch('unitType');
      console.log(this.$store.state.unitType);
      console.log(aa);
      // axios.post('api/index.php/connect/weixin', {headimgurl:'', nickname:'', openid :'2122', weixin_unionid:'', client:'ios'}).then(res => {
      //   let isAutoReg = false;
      //   if (res.data.code === 1 && res.data.data) {
      //     isAutoReg = true;
      //   }
      //   addRouteDefence(isAutoReg);
      //   addInterceptors(isAutoReg);
      //   initVue();
      // }).catch(() => {
      //   addRouteDefence(false);s
      //   addInterceptors(false);
      //   initVue();
      // });
    // },
    // unitType () {
    // //
    }

  },
};
