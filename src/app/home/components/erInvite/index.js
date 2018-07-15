import './index.scss';

import localStorage   from '~common/services/localStorage.cookie';
import _          from 'lodash';
import Header     from '~common/components/header';
import Footer         from '~common/components/footer';
import QRCode from 'qrcodejs2';
// import NotifyPopup  from '~common/components/notify_popup';

export default {
  name: 'home-page',
  data () {
    return {

      status        : 1000,
      formTemp      : {
        list        : [],
      },
      keyword       : '',
      timer         : '',
      page          : 1,
      total         : 0,
      per_page      : 0,
      current_page  : 0,
      last_page     : 0,
      isNoticeShow  : false,
      active  :0,
      performShow   : false,
      shareLInk     : '',
    };
  },
  components: {
    'app-header': Header,
    'app-footer': Footer,
    // 'notify-popup': NotifyPopup
  },
  computed: {
    userInfo () {
      return _.get(this.$store.get.state, 'App.userInfo');
    },
  },
  mounted () {
    this.ken();
    this.qrcode();
    // this.list();
    // this.getCount();
    // this.isNoticeShow = true;
  },
  watch: {
    keyword: {
      deep: true,
      handler () {
        let self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(() => {
          self.list();
        }, 500);
      },
    },
  },
  methods: {
    
    qrcode () {
      let self = this;
      console.log(self.shareLInk);
      let qrcode = new QRCode('qrcode', {
        width: 299,
        height: 299, // 高度
        text: self.shareLInk // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      })
      console.log(qrcode)
    },
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
      // console.log('---------'+ this.shareLInk );
       // http://pdd.duoduoshiyong.com/registerregister?invite="13430319375"
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
