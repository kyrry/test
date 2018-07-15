import './index.scss';
import localStorage   from '~common/services/localStorage.cookie';
import axios 		      from 'axios';
import CityList         from '~common/components/city_list';
import _          from 'lodash';
export default {
  name: 'userCertify',
  data () {
    return {
      KMToken: '',
      KMType: '',
      client : '',
      loading: false,
      isJust : false,
      indialogShow: true,
      currentFile: '',
      put_money: '',
      put_card_id: '',
      cardName: '',
      formData: {
        card_name: '',
        card_number: '',
        card_bank: '',
        card_bank_addr: '',
      },
      cardList: {
      },

      isZoom: false,
      zoomImage: '',
    };
  },
  components: {
    CityList
  },
  computed: {
  },
  mounted () {
    if(this.$route.query.cardId) {
      this.put_card_id = this.$route.query.cardId;
    }
    if(this.$route.query.cardName) {
      this.cardName = this.$route.query.cardName;
    }
    this.ken();

  },

  methods: {
    bankDetail() {
      this.$router.push({
        name: 'user.withdraw'
      });
    },

    handleSubmit () {
      if(!this.put_money) {
        this.$toast('请输入提现金额');
      }else {
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
        instance.post( 'api/index.php/member_index/member_apply_put', {
          put_money:self.put_money,
          put_card_id:self.put_card_id,
          key:self.KMToken,

        }).then(function(res){
          if(200===res.data.code){
            console.log(res)
            self.$toast( '提现成功');
            self.$router.push({
              name: 'user.Home'
            });
    
          }
          else {
                self.$toast( '请求失败');
              }
        })
      }
    

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

  

  }
};