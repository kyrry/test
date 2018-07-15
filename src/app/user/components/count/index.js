import './index.scss';
import axios 		      from 'axios';
import localStorage   from '~common/services/localStorage.cookie';

export default {
  name: 'userProfile',
  data () {
    return {
      available_predeposit    :  '',
      freeze_predeposit    :  '',
      inviter_money        :  '',
      bankCardList        :  [],
    };
  },
  components: {

  },

  mounted () {
    this.ken();
    this.getCardList();
    this.getMoney();
  },

  methods: {
    //钱包
    getMoney () {
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
      instance.post( 'api/index.php/member_index/my_money&key='+self.KMToken, {

      }).then(function(res){
        if(200===res.data.code){
          console.log(res.data.datas);
          self.available_predeposit= res.data.datas.available_predeposit;
          self.freeze_predeposit = res.data.datas.freeze_predeposit;
          self.inviter_money = res.data.datas.inviter_money;
    
  
        }
        else {
              self.$toast( '请求失败');
            }
      })
    
    },

      //去兑换
      toExChange() {
        let self = this;
        console.log(self.bankCardList);
        if(self.bankCardList.length==0){
          this.$router.push({
            name: 'user.addCard'
          });
        }else{
          self.$router.push({
            name: 'user.withdraw'
          });
        }
     
      },

      getCardList () {
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
        instance.post( 'api/index.php/member_index/get_bank_list', {
          key:self.KMToken,
  
        }).then(function(res){
          if(200===res.data.code){
            self.bankCardList = res.data.datas;

            // self.$toast( '添加成功');
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
      if (this.deviceType) {
        localStorage.set('KMDeviceType', this.deviceType);
      }
      let token = localStorage.get('KMToken');
      let type  = localStorage.get('KMDeviceType');

      this.KMToken = _.get(token, 'data.token');
      this.KMType = _.get(type, 'data');
    },
  }
};
