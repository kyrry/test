import './index.scss';
import localStorage   from '~common/services/localStorage.cookie';
import axios 		      from 'axios';
import _          from 'lodash';
export default {
  name: 'userProfile',
  data () {
    return {
      isNoticeShow:false,
      KMToken: '',
      KMType: '',
      cardName: '',
      cardId: '',
      bankCardList : [],
    };
  },
  components: {

  },

  mounted () {
    this.ken();
    // console.log(this.KMToken);
    this.getCardList();
  },

  methods: {
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
          self.cardId = self.bankCardList[0].card_id;
          self.cardName = self.bankCardList[0].card_bank
          // console.log();
          // console.log();
          // self.$toast( '添加成功');
        }
        else {
              self.$toast( '请求失败');
            }
      })
    
    },
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

    cardSelect(id,name) {
      console.log(id);
      this.cardId = id;
      this.cardName = name;
    },

    //提现
    toWithdraw() {
      let self = this;
      this.$router.push({
        name: 'user.bankWithdraw',
        query: {
          cardId: self.cardId,
          cardName:self.cardName
        },
      });
    }

  }
};
