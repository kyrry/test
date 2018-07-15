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
      cityShow: false,
      isJust : false,
      indialogShow: true,
      currentFile: '',
      data: {
         address:'',
       },
      formData: {
        card_name: '',
        card_number: '',
        card_bank: '',
        card_bank_addr: '广东省 广州市',
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
    userInfo () {
      return _.get(this.$store.get.state, 'App.userInfo');
    }
  },
  mounted () {
    this.ken();
    // this.cityLIst();
    console.log(this.KMToken,);

  },

  methods: {
    addressSelect() {
      this.cityShow = true;
    },
    cityClose(m) {
      this.cityShow = false;
      this.data.address = m.name;
      this.addressProvinceId = m.id;
      console.log(m.id)
      console.log( m.name);
    },

    ken () {
      if (this.token) {
        localStorage.set('KMToken', {
          token : this.token,
        });
      }
      let token = localStorage.get('KMToken');
      this.KMToken = _.get(token, 'data.token');
    },

    //确认提交
    submit () {
      console.log(666);
      if(!this.formData.card_name) {
        this.$toast('请输入持卡人真实姓名')
      }
      else if(!this.formData.card_number) {
        this.$toast('请输入银行卡号')
      }
      else if(this.formData.cardNUmConfirm!=this.formData.card_number) {
        this.$toast('银行卡号两次输入不一致')
      }
      else if(!this.formData.card_bank) {
        this.$toast('请输入银行名称')
      }
      else if(!this.formData.card_bank_addr) {
        this.$toast('请选择开户行地区')
      }
      else {
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
        instance.post( 'api/index.php/member_index/add_bank_card', {
          card_name: self.formData.card_name,
          card_number:self.formData.card_number,
          card_bank:self.formData.card_bank,
          key:self.KMToken,
          card_bank_addr:self.data.address
        }).then(function(res){
          if(200===res.data.code){
            self.$toast( '添加成功');
            self.$router.push({
              name: 'user.withdraw'
            });
  
          }
          else {
                self.$toast( '请求失败');
              }
        })
      }




    
    },







  }
};