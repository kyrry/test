import './index.scss';
import 'swiper/dist/css/swiper.css';
import Footer         from '~common/components/footer';
import localStorage   from '~common/services/localStorage.cookie';
import axios 		      from 'axios';
import Swiper           from 'swiper';
import _              from 'lodash';

export default {
  name: 'home-page',
  data () {
    return {
      KMToken: '',
      KMType: '',

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
      status  :0,
      performShow   : false,
      type     : 'in',
      numIn        : '3',
      numOrder     : '45',
      numEnd       : '67',
    };
  },
  components: {
    // 'app-header': Header,
    'app-footer': Footer,
    // 'notify-popup': NotifyPopup
  },
  computed: {
    token () {
      return this.$route.query.KMToken;
    },
    deviceType () {
      return this.$route.query.KMType;
    },
  },
  mounted () {
    this.ken();
    this.list();
    let self =  this;
    this.$nextTick(() => {
      /* eslint-disable */
      let swiper = new Swiper(this.$refs.mySwiper, {
        notNextTick: true,
        autoplay: 3000,
        speed: 800,
        grabCursor : true,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        mousewheelControl : false,
        observeParents:true,
        loop: true,
        autoplayDisableOnInteraction: false,
      });
      /* eslint-enable */
    });

    
  },
  watch: {
    keyword: {
      deep: true,
      handler () {
        let self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(() => {
          // self.list();
        }, 500);
      },
    },
  },
  methods: {
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

      this.KMToken = _.get(token, 'data.token');
      this.KMType = _.get(type, 'data');
    },
    // 顶部切换
    switchover (status) {
      if (status !== this.status) {
        this.status = status;

        this.list();
      }
    },

    toggleNotifyFn () {
      this.isNoticeShow = false;
    },

    robClick () {
      let self =  this;
      // this.$store.get.dispatch({
      //   type  : 'handleChangeDialog',
      //   active: true,
      //   title : '完善资料',
      //   msg   :  '完善拼多多资料并认证，可立即参与平台活动',
      //   lists : [
      //     {
      //       msg: '暂不完善'
      //     },
      //     {
      //       msg: '立即完善',
      //       class: 'ok',
      //       func () {
      //         self.$router.push({
      //           name: 'user.inforMation'
      //         });
      //       }
      //     },
      //   ]
 
      // });


      self.$router.push({
        name: 'home.detail'
      });




    },
    num () {
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
      instance.post( 'api/index.php/goods/get_type_number', {
        key:self.KMToken,
        status:self.status
      }).then(function(res){
        if(200===res.data.code){
          // let res = {data:
          //   {'code':200,'datas':{'in':3,'order':0,'end':5}}
          // }
          self.numIn = res.data.datas.in;
          self.numOrder = res.data.datas.order;
          self.numEnd = res.data.datas.end;

        }
      })
      
    },

    list () {
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
      instance.post( 'api/index.php/goods/goods_list', {
        page: 1,
        curpage:1,
        type:self.type,
        key:self.KMToken,
        status:self.status
      }).then(function(res){
        if(200===res.data.code){
          self.formTemp.list = res.data.datas.goods_list;
          if (self.formTemp.list.length === 0) {
            self.performShow = true;
          }
          else {
            self.performShow = false;
          }

   
        }
        else {
              self.$toast( '请求失败');
            }
      })
    

    },


    switchState (type) {
      if (type !== this.type) {
        this.type = type;
        this.list();
      }
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




