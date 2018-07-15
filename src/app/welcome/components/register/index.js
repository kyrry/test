import './index.scss';
import axios 		      from 'axios';
import _                  from 'lodash';
import Header             from '~common/components/header';
import phoneCode          from '~common/components/phone_code';
import Checkbox           from '~common/components/checkbox';
import localStorage from '~common/services/localStorage.cookie';


export default {
  name: 'register',
  data () {
    return {
      single: true,
      active: false,
      loading: false,
      isShow: false,
      isInviteShow: false,
      seen:'',
      seen2:'',
      picLyanzhengma:'',
      checkCode:'',
      formData: {
        ycode           : '',
        username        : '',
        code            : '',
        password        : '',
        password2       : '',
        invite_code       : '',

      },
    };
  },
  components: {
    'app-header': Header,
    phoneCode,
    Checkbox,
  },
  computed: {
  },
  created(){
    this.createCode();
},
  mounted () {


      // 触发mutations存值
      // this.$store.get.commit('saveloginDate', {
      //   loginDate: '5678'
      // });

      // 触发action 存值
      this.$store.get.dispatch({
        type : 'saveloginDate',
        loginDate: '34555'
      });
    

       // 取值 state
       console.log(this.$store.get.state);
       console.log(this.$store.get.state.Login.loginDate);
    


    let self = this;
    // console.log(666);
    // console.log(self.$route.query.invite);
    if(self.$route.query.invite) {
      self.isInviteShow = true;
      self.formData.invite_code = self.$route.query.invite;
      // console.log(self.$route.query.invite)
      // console.log( self.isInviteShow )
    }

    if(this.$versions().ios) {
      self.client = 'ios'
    }else if(self.$versions().android){
      self.client = 'ios'
    }else if(self.$versions().webApp){
      self.client = 'webApp'
    }else if(self.$versions().weixin){
      self.client = 'weixin'
    }
    //  console.log( self.client);
  },
  watch: {
  },
  methods: {
    changeSeen(seen){
      this.seen = !this.seen;
    },
    changeSeen2(seen2){
      this.seen2 = !this.seen2;
    },
    // 图片验证码
      createCode(){
          let  code = "";    
          var codeLength = 4;//验证码的长度   
          var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',   
           'S','T','U','V','W','X','Y','Z');//随机数   
          for(var i = 0; i < codeLength; i++) {//循环操作   
              var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）   
              code += random[index];//根据索引取得随机数加到code上   
          }   
              this.checkCode = code;//把code值赋给验证码   
      },
      // 失焦验证图和密码
      // checkLpicma(){
        
      //     this.picLyanzhengma.toUpperCase();//取得输入的验证码并转化为大写         
      //     if(this.picLyanzhengma == '') {
      //       self.$toast('请输入识别码');
      //         // $(".login_content1 span:eq(2)").text("请输入验证码")
      //         // $(".login_content1 span:eq(2)").removeClass("disappear");
             
      //     }else if(this.picLyanzhengma.toUpperCase() != this.checkCode ) { //若输入的验证码与产生的验证码不一致时    
      //       self.$toast('识别码不正确');
      //         // console.log( this.picLyanzhengma.toUpperCase())
      //         // console.log(code)           
      //         // $(".login_content1 span:eq(2)").text("验证码不正确")
      //         // $(".login_content1 span:eq(2)").removeClass("disappear");
      //         // this.createCode();//刷新验证码   
      //         // this.picLyanzhengma = '';
      //     }else { //输入正确时   

      //         // $(".login_content1 span:eq(2)").addClass("disappear");
      //         // $(".login_content1 span:eq(2)").text("请输入验证码")
      //         return true;
      //     } 
      // },
      //返回登陆页面
      handleBack () {
        this.$router.go(-1);
      },

    //  用户注册
     Sumbit () {
        let self = this;
        self.picLyanzhengma.toUpperCase();
        if(!self.formData.username) {
          self.$toast('请输入用户名');
        }  
      
        else if(!self.formData.password) {
          self.$toast('请输入密码');
        }  
        else if(self.formData.password2!=self.formData.password) {
          self.$toast('两次密码不一致');
        }  
        else if(!self.picLyanzhengma) {
          self.$toast('请输入识别码');
        }  
        else if(self.picLyanzhengma.toUpperCase() != self.checkCode ) {
          self.$toast('识别码不正确');
        }  
        else if(!self.formData.ycode) {
          self.$toast('请输入验证码');
        }  
        else {
          if (true === self.loading) {
            self.$toast('正在为您提交');
            return;
          }
          self.loading = true;

          let data = {};
          if(!self.formData.invite_code) {
            data = {
              username: self.formData.username,
              client: self.client,
              captcha: self.formData.ycode,
              password:self.formData.password,
              }
          }else{
            data = {
              username: self.formData.username,
              client: self.client,
              captcha: self.formData.ycode,
              password:self.formData.password,
              inviter:self.formData.invite_code,
              }
          }
        let instance = axios.create({
          transformRequest: [function (data) {
            let arr = []
            for (let it in data) {
              arr.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
            }
            return arr.join('&')
          }]
        })
        instance.post( 'api/index.php/connect/sms_register_user',data)
        .then(function(res){

          if (200 === res.data.code) {
            self.$toast( '注册成功');
            setTimeout(() => {
              self.$toast( '正在登陆...');
              self.handleSumbit();
            }, 1000);
          }
          else if(400===res.data.code){
            self.loading = false;
            self.$toast(res.data.datas.error);
          }
        })
        .catch(() => {
          self.loading = false;
        });
    
      }
     },

      /*
     * 提交表单--用户登陆
     */
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
      instance.post( 'api/index.php/login', {
            username: self.formData.username,
            client: self.client,
            password:self.formData.password,
      })
      .then((res) => {
        if (200 === res.data.code) {
         

          localStorage.set('KMToken', {
            token : _.get(res.data.datas, 'key'),
            weChat: 0,
          });
          localStorage.set('KMDeviceType', this.client);
          localStorage.set('userInfor', res.data.datas);

          setTimeout(() => {
            self.$toast('登录成功');
            let route = { name: 'home.Home' };
            let routeQuery = _.get(self.$route, 'query.dt');
            try {
              route = JSON.parse(routeQuery);
            }
            catch (err) {
              route = {
                name: 'home.Home',
                query: {
                  state:'1'
                }
              };
            }
            self.$router.push(route);
          }, 2000);

        }
        else {
          self.loading = false;
          console.log(666);
          self.$toast('登录失败');
        }
      });
    // }
    },

    },
};