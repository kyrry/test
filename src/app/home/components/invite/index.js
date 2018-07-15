import './index.scss';
import _          from 'lodash';
import Footer         from '~common/components/footer';
import localStorage   from '~common/services/localStorage.cookie';
import axios 		      from 'axios';
import ClipboardJS from 'clipboard';


export default {
  name: 'home-page',
  data () {
    return {

      keyword       : '',
      page          : 1,
      total         : 0,
      per_page      : 0,
      current_page  : 0,
      last_page     : 0,
      member_avatar :'',
      welfareList   :[],
      shareLInk   :'',
     
    };
  },
  components: {
    'app-footer': Footer,
  },
  computed: {
  },
  mounted () {

    // console.log(this.$store.get.state.Login.userWithdrawInfo);

    this.ken();

    let clipboard = new ClipboardJS('#inviteCode');
    clipboard.on('success', () => {
    // setTimeout(() => {
    this.$toast('链接复制成功');
    // }, 500);
    });

 
    this.inviteList();
  },
  watch: {
  },
  methods: {
    //获取token
    ken () {
      if (this.token) {
        localStorage.set('KMToken', {
          token : this.token,
          weChat: 0,
        });
      }
      if (this.deviceType) {
        localStorage.set('KMDeviceType', this.deviceType);
      }
      let token = localStorage.get('KMToken');
      let type  = localStorage.get('KMDeviceType');
      

      //用户名
      let userInfor  = localStorage.get('userInfor');
      this.member_name =  _.get(userInfor, 'data.member_name');



      this.KMToken = _.get(token, 'data.token');
      this.KMType = _.get(type, 'data');
      this.shareLInk = ' http://pdd.duoduoshiyong.com/#/register?invite='+ this.member_name;

      // this.shareLInk = ' http://pdd.duoduoshiyong.com/register?invite='+ this.member_name;
      // console.log('---------'+ this.shareLInk );
       // http://pdd.duoduoshiyong.com/registerregister?invite="13430319375"
    },
    erShare() {
      this.$router.push({
        name: 'home.erInvite'
      });
    },

    //邀请列表
    inviteList () {
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
      instance.post( 'api/index.php/member_index/my_inviter', {
        key:self.KMToken,
      }).then(function(res){
        if(200===res.data.code){
          console.log(666);
          self.welfareList = res.data.datas;
          console.log( self.welfareList);

        }
        else {
              // self.$toast( '请求失败');
            }
      })
    

    },

    refresh (done) {
      let self = this;
      setTimeout(() => {
        self.page = 1;
        // this.list();
        done();
      }, 1500);
    },

    infinite (done) {
      if (this.last_page <= this.current_page) {
        setTimeout(() => {
          done(true);
        }, 1500);
        return;
      }

      setTimeout(() => {
        this.page ++;
        // this.list();
        done();
      }, 1500);
    },
  },
};
