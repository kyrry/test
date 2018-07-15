import './index.scss';
import localStorage   from '~common/services/localStorage.cookie';
import axios 		      from 'axios';

export default {
  name: 'userProfile',
  data () {
    return {
      infor: '',
    };
  },
  components: {
    
  },

  mounted () {
    this.ken();
    this.detailList();
  },

  methods: {
    detailList () {
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
        // LocalStorage.remove('userInfor');
        self.infor = res.data.datas;
        // localStorage.set('userInfor', self.infor);
        }
        else {
              self.$toast( '请求失败');
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
  }
};
