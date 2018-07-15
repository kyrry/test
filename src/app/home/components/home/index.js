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
      numIn        : '',
      numOrder     : '',
      numEnd       : '',
      goodType       : '',
      member_name : '',
      member_nickname : '',
      member_id : '',
      member_avatar : '',
      member_state : '',
      bannerList  : [],
    };
  },
  components: {
    'app-footer': Footer,
  },
  computed: {
    token () {
      return this.$route.query.KMToken;
    },
    deviceType () {
      return this.$route.query.KMType;
    },
  },
  filters: {
    url(headUrl){
      return headUrl.substr(0,7).toLowerCase() == "http://" ? headUrl : "http://" + headUrl
    }
  },
  mounted () {
    if(this.$route.query.state ){
      this.state = this.$route.query.state;
    }
    this.ken();
    this.getBannerList();
    if(this.status==1){
      this.list();
    }else{
      this.performShow = true;
    }
    this.num();
    this.detailList();
 
    let self = this;
    if(self.state ==1 ){
      self.$store.get.dispatch({
      type  : 'handleChangeDialog',
      active: true,
      title : '完善资料',
      msg   :  '完善拼多多资料并认证，可立即参与平台活动',
      lists : [
        {
          msg: '暂不完善'
        },
        {
          msg: '立即完善',
          class: 'ok',
          func () {
            self.$router.push({
              name: 'user.inforMation'
            });
          }
        },
      ]

    });



    }

    
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


    detailList () {
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
      instance.post( 'api/index.php/member_index/get_member_info', {
        key:self.KMToken,
      }).then(function(res){
        if(200===res.data.code){
        // LocalStorage.remove('userInfor');
        self.infor = res.data.datas;
        // localStorage.set('userInfor', self.infor);
        }
        else {
              // self.$toast( '请求失败');
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
      if (this.type) {
        localStorage.set('KMDeviceType', this.data);
      }
      if (this.type) {
        localStorage.set('KMDeviceType', this.data);
      }
      let token = localStorage.get('KMToken');
      let type  = localStorage.get('KMDeviceType');
      let userInfor  = localStorage.get('userInfor');

      this.KMToken = _.get(token, 'data.token');
      this.KMType = _.get(type, 'data');


      // 用户ID
      this.member_id =  _.get(userInfor, 'data.member_id');
      
      //用户名
      this.member_name =  _.get(userInfor, 'data.member_name');

      //昵称
      this.member_nickname =  _.get(userInfor, 'data.member_nickname');

      //member_avatar
      this.member_avatar =  _.get(userInfor, 'data.member_avatar');

      // member_state	int	会员的开启状态 1为未认证 0为关闭 2认证中 3 已认证
      this.member_state =  _.get(userInfor, 'data.member_state');

      this.push_id =  _.get(userInfor, 'data.push_id');


    },
    // 顶部切换
    switchover (status) {
      if (status !== this.status) {
        this.status = status;
        this.type = 'in';
        if(status==1){
          this.list();
        }else{
          this.formTemp.list  = '';
          this.performShow = true;
        }
        // console.log( this.type );
        
      }
    },

    toggleNotifyFn () {
      this.isNoticeShow = false;
    },

    //立即抢购
    robClick (id) {
      console.log(this.member_state);
      // console.log(this.member_stat);
      let self =  this;

      if(self.member_state==1|| self.state ==1 ){
      // if(self.member_state==777 ){ 
        // -----------测试
        
        self.$store.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
        title : '完善资料',
        msg   :  '完善拼多多资料并认证，可立即参与平台活动',
        lists : [
          {
            msg: '暂不完善'
          },
          {
            msg: '立即完善',
            class: 'ok',
            func () {
              self.$router.push({
                name: 'user.inforMation'
              });
            }
          },
        ]
 
      });

      }
      else if(self.member_state==2) {
        // if(self.member_state==777 ){ -----------测试
        self.$router.push({
          name: 'user.personalInformation'
        });
      }
      else if(self.member_state==3||self.infor){
        self.$router.push({
          name: 'home.toApplay',
          query: {
            id: id
          },
        });
      }
      else if(!self.member_state){
        this.$router.push({
          name: 'welcome.Login',
        });
      }
      else {
        self.$router.push({
          name: 'home.toApplay',
          query: {
            id: id
          },
        });
  
      }




    },

    //获取banner图列表
    getBannerList () {
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
      instance.post( 'api/index.php/index/getgg', {
      }).then(function(res){
        if(200===res.data.code){
          self.bannerList = res.data.datas.article_list;
          self.$nextTick(() => {
            /* eslint-disable */
            let swiper = new Swiper(self.$refs.mySwiper, {
              pagination: '.swiper-pagination',
              paginationClickable: true,
              bulletActiveClass: 'bullet-active',
            });
          });
          // if(self.bannerList){
          //   let swiper = new Swiper(self.$refs.mySwiper, {
          //     notNextTick: true,
          //     autoplay: 3000,
          //     speed: 800,
          //     grabCursor: true,
          //     pagination: '.swiper-pagination',
          //     paginationClickable: true,
          //     mousewheelControl: false,
          //     observeParents: true,
          //     loop: true,
          //     autoplayDisableOnInteraction: false,
          // });
          // }
          // console.log(res);
         

        }
        else {
              // self.$toast( '请求失败');
        }
      })
    

    },

    //跳转banner内容页
    bannerContent (id) {
      this.$router.push({
        name: 'home.bannerDetail',
        query: {
          article_id: id
        },
      });
    },

    //获取列表数量
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
          self.numIn = res.data.datas.in;
          self.numOrder = res.data.datas.order;
          self.numEnd = res.data.datas.end;

        }
      })
      
    },

    // 获取goods列表
    list () {
      let self = this;
      let oldStatus = self.type;
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
        // key:self.KMToken,
        status:self.status
      }).then(function(res){
        if (self.type !== oldStatus) {
          return;
        }
        if(200===res.data.code){
          self.goodType = res.data.datas.type;
          self.formTemp.list = res.data.datas.goods_list;
  
          if (self.formTemp.list.length === 0) {
            self.performShow = true;
          }
          else {
            self.performShow = false;
          }

   
        }
        else {
              // self.$toast( '请求失败');
            }
      })
    

    },


    switchState (type) {
      if (type !== this.type) {
        this.type = type;
        if(this.status==1){
          this.list();
        }else{
          this.formTemp.list  = '';
          this.performShow = true;
        }
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




