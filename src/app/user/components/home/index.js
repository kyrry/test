import './index.scss';
import axios 		      from 'axios';
import _              from 'lodash';
import Header         from '~common/components/header';
import Footer         from '~common/components/footer';
import localStorage   from '~common/services/localStorage.cookie';

export default {
  name: 'userHome',
  data () {
    return {
      state_after : 0,
      state_new : 0,
      state_appraise : 0,
      state_cancel : 0,
      state_img : 0,
      state_pay : 0,
      state_send : 0,
      state_success : 0,
      member_name : '',
      member_nickname : '',
      member_id : '',
      member_avatar : '',
      member_state : '',//认证状态
      state_type : '',
      personalInfor:'',

    };
  },
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  computed: {
    changeFilter () {
      let data = _.get(this.$store.get.state, 'App.histData');
      return data;
    },
    isWechatClient () {
      return this.device.is('WeChat');
    }
  },
  mounted () {

        // 取值 state
        console.log(this.$store.get.state);
        console.log(this.$store.get.state.Login.loginDate);
    
    



    this.ken();
    this.getOrderNum();
    this.gepersonDetail();
    this.getUserState();
    let self = this;
    if(this.member_state==2){
     setInterval(() => {
      self.getUserState();
      }, 3000);
    }
    
  },

  methods: {
  
    //订单状态
    toggleState (d) {
      let self = this;
      self.state_type = d;
      // console.log(d);
      self.$router.push({
        name: 'home.orderList',
        query: {
          state_type: self.state_type
        }
      });
    },
    // 去完善资料
    toInformation () {
      if(this.member_state==1) {
        this.$router.push({
          name: 'user.inforMation'
        });
      }
      if(this.member_state==2) {
        this.$router.push({
          name: 'user.personalInformation'
        });
      }
      if(this.member_state==3) {
        this.$router.push({
          name: 'user.profile'
        });
      }

      
    },

    //获取认证状态
    getUserState () {
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
      instance.post( 'api/index.php/member_index/get_user_state', {
        key:self.KMToken,
      }).then(function(res){
        if(200===res.data.code){
          // console.log(res.data.code);
          // console.log(res);
          // console.log(res.data.datas);
          self.member_state = res.data.datas.state;
          // self.member_state = 3;

          // 获取状态改变member_state存入locationstorage
          let userInfor  = localStorage.get('userInfor');
          userInfor.data.member_state =  self.member_state;
          localStorage.set('userInfor',userInfor.data);

  
  
        }
        else {
              // self.$toast( '请求失败');
            }
      })
    
    },
    //获取个人信息
    gepersonDetail () {
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
      instance.post( 'api/index.php/member_index/get_member_info', {
        key:self.KMToken,

      }).then(function(res){
        if(200===res.data.code){
          // console.log(res);
          // console.log(res.data.datas);
          self.personalInfor = res.data.datas;

  
        }
        else {
              // self.$toast( '请求失败');
            }
      })
    
    },

    //获取各订单的数量
    getOrderNum () {
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
      instance.post( 'api/index.php/member_index/get_order_num', {
        key:self.KMToken,

      }).then(function(res){
        if(200===res.data.code){
          // console.log(res.data.datas);
          self.state_after = res.data.datas.state_after;
          self.state_appraise = res.data.datas.state_appraise;
          self.state_cancel = res.data.datas.state_cancel;
          self.state_img = res.data.datas.state_img;
          self.state_pay = res.data.datas.state_pay;
          self.state_success = res.data.datas.state_success;
          self.state_new = res.data.datas.state_new;
          self.state_send = res.data.datas.state_send;
  
        }
        else {
              // self.$toast( '请求失败');
            }
      })
    
    },

    //获取token
    ken () {
      if (this.token) {
        localStorage.set('KMToken', {
          token : this.token,
        });
      }
      if (this.member_state) {
        localStorage.set('userInfor', {
          member_state : this.member_state,
        });
      }
      if (this.type) {
        localStorage.set('KMDeviceType', this.data);
      }
      if (this.type) {
        localStorage.set('KMDeviceType', this.data);
      }
      let token = localStorage.get('KMToken');
      let type  = localStorage.get('KMDeviceType');
      let userInfor  = localStorage.get('userInfor');

      this.KMToken = _.get(token, 'data.token');
      this.KMType = _.get(type, 'data');


      // 用户ID
      this.member_id =  _.get(userInfor, 'data.member_id');
      
      //用户名
      this.member_name =  _.get(userInfor, 'data.member_name');

      //昵称
      this.member_nickname =  _.get(userInfor, 'data.member_nickname');

      //member_avatar
      this.member_avatar =  _.get(userInfor, 'data.member_avatar');

      // member_state	int	会员的开启状态 1为未认证 0为关闭 2认证中 3 已认证
      this.member_state =  _.get(userInfor, 'data.member_state');

      this.push_id =  _.get(userInfor, 'data.push_id');





    },



  },
};
