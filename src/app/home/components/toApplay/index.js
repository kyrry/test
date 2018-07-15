import './index.scss';
import _          from 'lodash';
import axios 		      from 'axios';
import localStorage   from '~common/services/localStorage.cookie';
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
      goods_id   : '',
      applayList  : '',
      order_id    : '',

    };
  },
  components: {
    // 'notify-popup': NotifyPopup
  },
  computed: {
    userInfo () {
      return _.get(this.$store.get.state, 'App.userInfo');
    },
  },
  mounted () {
    if(this.$route.query.id) {
      this.goods_id = this.$route.query.id;
    }
    this.ken();
    this.getDetailList();
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

    //回到首页其他活动
    goHome() {
      let self  = this;
      self.$router.push({
        name: 'home.Home',
      });
    },

    //去申请
    toApplay () {
      let self = this;
      let oldStatus = self.status;
      let instance = axios.create({
        transformRequest: [function (data) {
          let arr = []
          for (let it in data) {
            arr.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
          }
          return arr.join('&')
        }]
      })
      instance.post( 'api/index.php/member_vr_buy/buy_step3', {
        goods_id: self.goods_id,
        key:self.KMToken,
        quantity: self.applayList.goods_buy_num

      }).then(function(res){
        if(200===res.data.code){
          if (self.status !== oldStatus) {
            return;
          }
            self.order_id = res.data.datas.order_id;
            self.$toast( '申请成功');
            self.$router.push({
              name: 'home.detail',
              query: {
                id: self.order_id,
                goods_id: self.goods_id,
              },
            });
          }
        else {
            self.$toast(  res.data.datas.error);
        }
      })
    
    },
    // 获取token
    ken () {
      if (this.token) {
        localStorage.set('KMToken', {
          token : this.token,
          weChat: 0,
        });
      }
      let token = localStorage.get('KMToken');
      this.KMToken = _.get(token, 'data.token');
    },
    // 顶部切换
    switchover (active) {
      if (active !== this.active) {
        this.active = active;
        // this.list();
      }
    },

    toggleNotifyFn () {
      this.isNoticeShow = false;
    },
   
    //获取详信息
    getDetailList () {
      let self = this;
      let oldStatus = self.status;
      let instance = axios.create({
        transformRequest: [function (data) {
          let arr = []
          for (let it in data) {
            arr.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
          }
          return arr.join('&')
        }]
      })
      instance.post( 'api/index.php/goods/new_goods_detail', {
        goods_id: self.goods_id,
        key:self.KMToken,

      }).then(function(res){
        if(200===res.data.code){
          if (self.status !== oldStatus) {
            return;
          }
            self.applayList = res.data.datas.goods_info;
          }
        else {
            self.$toast( '请求失败');
        }
      })
    
    },

    switchState (status) {
      if (status !== this.status) {
        this.status = status;
        // this.list();
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
