import './index.scss';
import _          from 'lodash';
import localStorage   from '~common/services/localStorage.cookie';
import axios 		      from 'axios';
import mdialog  from '~common/components/mdialog';

export default {
  name: 'userCard',
  data () {
    return {
      active  :0,
      err  :'err',
      cancel  :'cancel',
      type        : 'check_pending',
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
      iscancelApplay  : false,
      active  :0,
      performShow   : false,
      isShow   : false,
      RealPay       : '',
      needFill       : '',
      promotionPrice       : '',
      orderNumber       : '',
      user_desc       : '',
      mendList       : '',
      order_sn       : '',
      data       : '',
    };
  },
  components: {
    mdialog
  },
  computed: {
    userInfo () {
      return _.get(this.$store.get.state, 'App.userInfo');
    },
  },
  mounted () {
    this.ken();
    this.mend();
    
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

      this.KMToken = _.get(token, 'data.token');
      this.KMType = _.get(type, 'data');
    },
    toApplay () {
      this.apllay();
    },
    toggle (index) {
      this.active = index;
      this.type = this.arr[index];
   },

   //获取单号
   getCode () {
    let self = this;
    if(!self.orderNumber){
      self.$toast( '请输入单号');
    }else{
      let instance = axios.create({
        transformRequest: [function (data) {
          let arr = []
          for (let it in data) {
            arr.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
          }
          return arr.join('&')
        }]
      })
      instance.post( 'api/index.php/member_index/get_order_info', {
        order_sn: self.orderNumber,
        key:self.KMToken,
   
      }).then(function(res){
        if(200===res.data.code){
          self.$toast( '获取成功');
          self.promotionPrice = res.data.datas.order_amount;
          
        }
        else {
              self.$toast( '获取失败');
            }
      })
    }
  

   },

   //差补列表
   mend () {
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
    instance.post( 'api/index.php/member_index/gold_enders_list', {
      type:self.type,
      key:self.KMToken,
    }).then(function(res){
      if(200===res.data.code){ 
        self.mendList = res.data.datas;
        if (self.mendList.length === 0) {
          self.performShow = true;
        }
        else {
          self.performShow = false;
        }
       }
    })
   },

   //去申请
   apllay () {
    let self = this;
    if(!self.RealPay) {
      self.$toast( '请填写实付价格');
    }
    else if(!self.user_desc) {
      self.$toast( '请填写申请差补的具体理由');
    }
    else{
      let instance = axios.create({
        transformRequest: [function (data) {
          let arr = []
          for (let it in data) {
            arr.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
          }
          return arr.join('&')
        }]
      })
      instance.post( 'api/index.php/member_index/gold_enders', {
        order_sn: self.orderNumber,
        experience_price: self.promotionPrice,
        reality_price:self.RealPay,
        difference_price:Number( self.RealPay) - Number( self.promotionPrice),
        user_desc:self.user_desc,
        key:self.KMToken,
   
      }).then(function(res){
        if(200===res.data.code){
          self.$toast( '申请成功');
          self.mend();
          self.active = 1;
          
        }
        else {
             self.isNoticeShow = true;
             self.data = res.data.datas.error;
  
            }
      })
    }
  

   },
   //取消申请
   cancelapplayOrder (id) {
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
    instance.post( 'api/index.php/member_index/end_gold_enders', {
      id:id,
      key:self.KMToken
 
    }).then(function(res){
      if(200===res.data.code){
        self.data = res.data.datas;
        console.log(self.data);
        self.iscancelApplay = true;
      }
      else {
         

      }
    })
  

   },


    // 顶部切换
    switchover (active) {
      if (active !== this.active) {
        this.active = active;
      }
    },

    //取消申请
    cancelClick (id) {
      this.cancelapplayOrder(id);
     
    },
    //取消申请回调
    togglecancel () {
      this.iscancelApplay = false;
      this.mend();
    },
    toggleNotifyFn () {
      this.isNoticeShow = false;
    },

    switchState (type) {
      if (type !== this.type) {
        this.type = type;
        this.mend();
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
