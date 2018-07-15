import './index.scss';
import localStorage   from '~common/services/localStorage.cookie';
import _          from 'lodash';
import Header     from '~common/components/header';
import axios 		      from 'axios';
import {formatDate}   from '~common/filters/fmt_date.js';
export default {
  name: 'userCard',
  data () {
    return {
      performShow: false,
      totalNum1 : '',
      state_new: 0,
      state_pay: 0,
      state_send: 0,
      state_img: 0,
      state_appraise: 0,
      state_after: 0,
      state_cancel: 0,
      state_success: 0,
      state_type : '',
      curpage : '',
      noDataShow :'',
      GiveUpPageContent :'',
      orderList :[],
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
      active  :'all',
      type  :'',
      ToGiveUpPage  :'',
      order_id  :'',
      page_total  :'',

    };
  },
  components: {
    'app-header': Header,
  },
  computed: {
  },
  filters: {
    handleDate (time) {
      return formatDate(new Date(time * 1000), 'yyyy-MM-dd');
    },
    getDays(date1 , date2){
      console.log(date1,date2);


     var t1 = date1.getTime();
     var t2 = date2.getTime();
     console.log(t1);
     console.log(t2);

     var dateTime = 1000*60*60*24; //每一天的毫秒数
     var minusDays = Math.floor(((t2-t1)/dateTime));//计算出两个日期的天数差
     var days = Math.abs(minusDays);//取绝对值
     return days;
     console.log(days);
   }
  },

  mounted () {
    if(this.$route.query.state_type){
      this.state_type = this.$route.query.state_type;
      this.active = this.$route.query.state_type;
    }
   
  
    this.ken();
    this.getOrderNum();
    // this.getOrderList();
    console.log('--------------'+this.active);

  },
  watch: {
  },
  methods: {
    saleafter() {
      this.$router.push({
        name: 'home.service',
       })
    },

    //去评论
    // toEvaluate() {
    //   this.$router.push({
    //     name: 'home.detail',
    //     query: {
    //       order_state:'40'
    //     }
    //    })
    // },
    //提交--找到宝贝并付款
    toSDetailubmit(order_id,good_id,order_state) {
      this.$router.push({
        name: 'home.detail',
        query: {
          id: order_id,
          goods_id:good_id,
          order_state :order_state
        },
       })
    },
    // photographed(order_id,good_id,order_state) {
    //   this.$router.push({
    //     name: 'home.detail',
    //     query: {
    //       id: order_id,
    //       goods_id:good_id,
    //       order_state :order_state
    //     },
    //    })
    // },

    //放弃活动 --确定
    determineGiveUp () {
      let self = this;
      if(!self.GiveUpPageContent) {
        self.$toast('请输入放弃理由');
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
        instance.post( 'api/index.php/member_index/abort_order&key=' + self.KMToken + '&order_id='+self.order_id + '&buyer_msg='+ self.GiveUpPageContent, {
        }).then(function(res){
          if(200===res.data.code){
            self.$toast('取消成功')
            self.ToGiveUpPage = false;
            self.getOrderList();
          }
          else {
            // console.log(res.data.datas.error);
            self.$toast(res.data.datas.error);
            self.ToGiveUpPage = false;
          }
        })
      }
    

    },
    cancelGiveUp() {
      this.ToGiveUpPage = false;
    },

    ToGiveUp(id) {
      // console.log(id);
      this.order_id = id;
      this.ToGiveUpPage = true;
    },
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

    //获取订单信息
    getOrderList () {
      // console.log(33333);
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
      instance.post( 'api/index.php/member_vr_order/order_list', {
        page: 1,
        curpage:self.curpage,
        state_type: self.state_type,
        key:self.KMToken,

      }).then(function(res){
        // console.log(res.data)
        if(200===res.data.code){
          if (self.status !== oldStatus) {
            return;
          }
          self.curpage ++;
          self.orderList = self.orderList.concat(res.data.datas.order_list);

          self.page_total         = res.data.page_total;
          // console.log(self.page_total);
        
          // console.log(res.data.datas.order_list);
          if ( self.orderList.length === 0) {
            self.noDataShow = true;
          }
          else {
            self.noDataShow = false;
          }
          }
        else {
              self.$toast( '请求失败');
            }
      })

    },

    toggle (d) {
      this.orderList =[];
      // console.log(d);
      this.active = d;
      if ( d==='all') {
        this.state_type = '';
      }
      else {
        this.state_type = d;
      }
      this.curpage=1;
      this.getOrderList();
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

    //获取各订单的数量
    getOrderNum () {
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
        instance.post( 'api/index.php/member_index/get_order_num', {
          key:self.KMToken,
  
        }).then(function(res){
          if(200===res.data.code){
            // console.log(res.data.datas);
            // console.log(res.data.datas.state_img);
            self.state_after = res.data.datas.state_after;
            self.state_appraise = res.data.datas.state_appraise;
            self.state_cancel = res.data.datas.state_cancel;
            self.state_img = res.data.datas.state_img;
            self.state_pay = res.data.datas.state_pay;
            self.state_success = res.data.datas.state_success;
            self.state_new = res.data.datas.state_new;
            // console.log(self.state_new);
            self.state_send = res.data.datas.state_send;
            self.totalNum1 = 
            Number(self.state_after) +
            Number(self.state_appraise) +
            Number(self.state_cancel) +
            Number(self.state_img) +
            Number(self.state_pay) +
            Number(self.state_success) +
            Number(self.state_new) +
            Number(self.state_send)

          }
          else {
                self.$toast( '请求失败');
              }
        })
      
    },
  

    
    refresh (done) {
      // this.get.dispatch({
      //   type: 'Loading',
      //   isShow: true
      // });
      // console.log(4444)
      let self = this;
      self.orderList =[];
      setTimeout(() => {
        self.curpage = 1;
        this.getOrderList();
        done();
      }, 1500);
    },

    infinite (done) {
      
      // console.log(this.page_total < this.curpage)
      if (this.page_total < this.curpage) {
        done(true);
        return;
      }



     
      // setTimeout(() => {
        // this.curpage ++;
        done(true);
        this.getOrderList();
      // }, 1500);
    },





    
    // refresh (done) {
    //   let self = this;
      
    //     self.curpage = 1;
    //     // this.getOrderList();
    //     done();
    // },

    // infinite (done) {
    //   if (this.page_total <= this.curpage) {
    //     return;
    //   }
    //   console.log(666);
    //     // this.getOrderList();
    //     done();

    // },
  },
};
