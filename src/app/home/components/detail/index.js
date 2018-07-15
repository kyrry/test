import './index.scss';
import _          from 'lodash';
import axios 		      from 'axios';
import localStorage   from '~common/services/localStorage.cookie';
import Footer         from '~common/components/footer';
import ClipboardJS    from 'clipboard';
export default {
  name: 'home-page',
  data () {
    return {
      status        : 1000,
      page          : 1,
      total         : 0,
      per_page      : 0,
      current_page  : 0,
      last_page     : 0,
      isNoticeShow  : false,
      active  :0,
      performShow   : false,
      loading   : false,
      order_id      : '',
      imgUrl        : '',
      payEnd        : '',
      comment       : '',
      commentContent   : '',
      collection    : '',
      commentPIcs    : '',
      moneyInput    : '',
      payOrder      : '',
      return_money   : '',
      goods_pdd_name   : '',
      goods_appraise_info   : '',
      keyWord   : '',
      orderList  :  [],
      goods_info  : [],
      commentAllImg : [],
      commentAllImgStr:'',
      ImgStr:'',
      appraiseInfoImg:'',
      GiveUpPageContent:'',
      port_condition_img:'',
      is_img:'',//是否晒图
      goods_appraise:'',//是否评价
      ercodePic:'',
      shopName:'',//店铺名称用于验证店铺
      addImgBtn : true,
      ToGiveUpPage : false,
      updatePicState : false, //图片已更新状态，正在审核
      shopnameArrodd : [], //店铺偶数组
      shopnameArreven : [],//店铺奇数组
      shopNameStr:[],
      shopnameArr1:[],
      listData:[],//核对店铺的输入
      disabledStatus:false,
      copyBtn: null,
      port_link: '', //邀请链接

    };
  },
  components: {
    Footer
  },
  computed: {
    userInfo () {
      return _.get(this.$store.get.state, 'App.userInfo');
    },
  },

  filters: {
    url(headUrl){
      return headUrl.substr(0,7).toLowerCase() == "http://" ? headUrl : "http://" + headUrl
    }
  },
  mounted () {
    let clipboard = new ClipboardJS('.inviteCode');
    clipboard.on('success', () => {
      setTimeout(() => {
        this.$toast('链接复制成功');
      }, 1000);
    });
    // this.copyBtn = new this.clipboard(this.$refs.copy);

   //order_id
    if(this.$route.query.id) {
      //这里的goog_id 是orderId
      this.order_id = this.$route.query.id;
    }
    //商品id  
    if(this.$route.query.goods_id) {
      this.g_id = this.$route.query.goods_id;
    }

    //订单状态
    if(this.$route.query.order_state) {
      this.orderList.order_state = this.$route.query.order_state;
    }
    if(this.orderList.order_state==30||this.orderList.order_state==45){
      this.updatePicState = true;
    }

    this.ken();
    this.getMessage();
    this.getDetailList();
    // this.updateImgStatus();
  },
  watch: {
  },
  methods: {
    // copyLink() {
    //   /*这是点击按钮触发的点击事件，关于clipboard的使用就不再赘述了，上面介绍时已经讲述过，并且使用方法在官方文档上有*/
    //     let _this = this;
    //     let clipboard = _this.copyBtn;
    //     clipboard.on('success', function() {
    //         _this.$message({ /*这是使用了element-UI的信息弹框*/
    //             message: '复制成功！',
    //             type: 'success'
    //         });
    //     });
    //     clipboard.on('error', function() {
    //         _this.$message({
    //             message: '复制失败，请手动选择复制！',
    //             type: 'error'
    //         });
    //     });
    //   },
 

    //图片上传
   update(e,d){
     let headUrl='';
     let self = this;
     self.loading = false;
      if (false === self.loading) {
        self.$store.get.dispatch({
          type: 'Loading',
          Text: '上传中...',
          isShow: true
        });
      }

      let file = e.target.files[0];

       if(!file){
        self.$store.get.dispatch({
          type: 'Loading',
          Text: '已上传',
          isShow: false
        });
        return;
        } 
       else {
        let param = new FormData(); 
        param.append('img',file,file.name);
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }; 
        self.axios.post('api/index.php/upload/index',param,config)
        .then(response=>{
          // this.$toast('正在上传')
          headUrl= response.datas.img_url;
          if(d==='imgUrl') {
           
            self.imgUrl = headUrl.substr(0,7).toLowerCase() == "http://" ? headUrl : "http://" + headUrl;
            // console.log( self.imgUrl);
          }
          else if(d==='keyWord') {
            self.keyWord = headUrl.substr(0,7).toLowerCase() == "http://" ? headUrl : "http://" + headUrl;
          }
          if(d==='collection') {
            self.collection =  headUrl.substr(0,7).toLowerCase() == "http://" ? headUrl : "http://" + headUrl;
          }
          else if(d==='payEnd') {
            headUrl= response.datas.img_url;
            self.payEnd =  headUrl.substr(0,7).toLowerCase() == "http://" ? headUrl : "http://" + headUrl;
          }
          else if(d==='comment') {
            self.comment =  headUrl.substr(0,7).toLowerCase() == "http://" ? headUrl : "http://" + headUrl;
          }
          else if(d==='commentPIcs') {
     
            self.commentPIcs =  headUrl.substr(0,7).toLowerCase() == "http://" ? headUrl : "http://" + headUrl;
         
            if( self.commentAllImg.length<8) {
              self.commentAllImg.push(self.commentPIcs);
              // console.log(self.commentAllImg.length)
              self.addImgBtn = true;
            }
            else if( self.commentAllImg.length===8) {
            self.commentAllImg.push(self.commentPIcs);
             self.$toast('已达到上限');
             self.addImgBtn = false;
            }else {
              self.addImgBtn = false;
            }
            self.commentAllImgStr = self.commentAllImgStr +self.commentPIcs +',' 
            self.ImgStr =  self.commentAllImgStr.slice(0,self.commentAllImgStr.length-1);
  
          }
          self.loading = true;
          // console.log(self.loading);
          if (true === self.loading) {
            self.$store.get.dispatch({
              type: 'Loading',
              Text: '已上传',
              isShow: false
            });
          }
  
        })    

      }


    
      
   },
   openPicker () {
     this.$refs.picker.open();
   },
    // 获取token
    ken () {
      if (this.token) {
        localStorage.set('KMToken', {
          token : this.token,
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
        //商品id
        goods_id: self.g_id,
        key:self.KMToken,

      }).then(function(res){
        // console.log(res.data.datas.goods_info);
        if(200===res.data.code){
          if (self.status !== oldStatus) {
            return;
          }
            self.goods_appraise_info = res.data.datas.goods_info.goods_appraise_info;
            self.return_money = res.data.datas.goods_info.return_money;
            self.goods_pdd_name = res.data.datas.goods_info.goods_pdd_name;

            //是否需要评价
            self.goods_appraise = res.data.datas.goods_info.goods_appraise;
            // 测试评价
            // self.goods_appraise = 0 ;
            // console.log('评价----'+self.return_money);
          }
        else {
            self.$toast( '请求失败');
        }
      })
    
    },

    //下单后的信息
    getMessage () {
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
      instance.post( 'api/index.php/member_vr_order/new_order_info&order_id='+self.order_id+'&key='+self.KMToken, {

      }).then(function(res){
        if(200===res.data.code){
          if (self.status !== oldStatus) {
            return;
          }
          self.orderList = res.data.datas.order_info;
          self.is_img = res.data.datas.order_info.is_img;
          //----测试
          // self.is_img =0;
          // console.log('self.is_img======'+self.is_img);

          self.appraiseInfoImg = res.data.datas.order_info.appraise_info_img;
          self.goods_info = res.data.datas.goods_info[0];
          self.port_condition_img =  self.goods_info.port_condition_img.substr(0,7).toLowerCase() == "http://" ? self.goods_info.port_condition_img : "http://" + self.goods_info.port_condition_img;
          self.ercodePic =  self.goods_info.port_qr_code.substr(0,7).toLowerCase() == "http://" ? self.goods_info.port_qr_code : "http://" + self.goods_info.port_qr_code;
          self.port_link =  self.goods_info.port_link;
          
          
          
          // console.log(self.goods_info.relevance_name);
          self.shopName = self.goods_info.relevance_name;
          if(self.shopName) {
            self.shopnameArr1 = self.shopName.split('');
            // console.log(self.shopnameArr1)
            // console.log(self.shopnameArr1+'=====总的');
            for(let n = 0; n < self.shopnameArr1.length; n++) {
                if(n % 2 != 0) {
                  self.shopnameArrodd.push(self.shopnameArr1[n])
                }
                if(n % 2 == 0) {
                  self.shopnameArreven.push(self.shopnameArr1[n]);
                }
  
            }
          }
      
            // console.log(self.shopnameArreven+'======奇数');//循环用奇用-------
            // console.log(self.shopnameArrodd+'======偶数');//偶验证用----
            // console.log(self.shopnameArrodd.length);//偶验证用----
            // console.log(self.shopnameArrodd);
            // console.log(self.shopnameArreven.length);
           // console.log('--------'+self.shopName);

          }
        else {
              // self.$toast( '请求失败');
            }
      })
    

    },

    // 更新支付状态
    updatePayStatus () {
      console.log(this.shopNameStr);
      if(this.shopNameStr.toString()== this.shopnameArr1.toString()){
        console.log(666);
      }else{
        console.log(222);
      }
      let self = this;

      if(!self.moneyInput) {
        self.$toast( '请填写实付价格');
      }
      else if(!self.payOrder) {
        self.$toast( '请填写订单编号');
      }
      else if(!self.payEnd) {
        self.$toast( '请上传付款成功的截图');
      }
      else if(!self.keyWord) {
        self.$toast( '请上传搜索关键词截图');
      }
      else if(!self.collection) {
        self.$toast( '上传收藏宝贝的截图');
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
        instance.post( 'api/index.php/member_vr_order/update_pay_status', {
          key:self.KMToken,
          order_id:self.order_id,
          pay_price:self.moneyInput,
          pay_order:self.payOrder,
          pay_img:self.payEnd,
          keyword_img:self.keyWord,
          collect_img:self.collection,
        }).then(function(res){
          if(200===res.data.code){
               self.$toast( '提交成功');
               self.$router.push({
                name: 'home.orderList',
                query: {
                  state_type:'state_pay'
                }

               })
          }
          else{
            self.$toast( res.data.datas.error);
          }
  
        })
      }
    

    },

    // 更新评论状态
    updateAppraiseAStatus () {
      // console.log(this.orderList.order_state);
      let self = this;
      let data= {};
      if(self.orderList.order_state==30||self.orderList.order_state==45){
        // console.log(444);
        self.$toast('评论正在审核，请审核过后再提交');
        self.updatePicState = true;
        return;
      }

        
      //是否晒图  1 晒图  0 不晒图
     if(self.is_img==0) {
       
      //是否评价  1 评价  0 不评价
      if (self.goods_appraise==1){
        if(!self.commentContent) {
            self.$toast( '请填写评论内容');
        }
        else if(!self.comment ) {
          self.$toast( '请上传评价截图');
        }
        else{
            data = {
              key:self.KMToken,
              order_id:self.order_id,
              appraise_info: self.commentContent ,
              appraise_img: self.comment ,

            }
            sendajax(data);
         }
      }

      else if(self.goods_appraise==0){
         if(!self.comment ) {
          self.$toast( '请上传评价截图');
        }else{
          data = {
            key:self.KMToken,
            order_id:self.order_id,
            appraise_img: self.comment ,
          }
          sendajax(data);
        }
       

      }
     }
 
      if(self.is_img==1) {
      
        if(!self.commentContent) {
          self.$toast( '请填写评论内容');
       }
       else if(!self.comment ) {
        self.$toast( '请上传评价截图');
      }
       else{
          data = {
            key:self.KMToken,
            order_id:self.order_id,
            appraise_info: self.commentContent ,
            appraise_img: self.comment ,

          }
          sendajax(data);
       }
       
      }

      // else{
              
        function sendajax(data){
          let instance = axios.create({
            transformRequest: [function (data) {
              let arr = []
              for (let it in data) {
                arr.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
              }
              return arr.join('&')
            }]
          })
          instance.post( 'api/index.php/member_vr_order/update_appraise_status', data).then(function(res){
            if(200===res.data.code){
                self.$toast( '提交成功');
                self.$router.push({
                  name: 'home.orderList',
                  query: {
                    state_type:'state_appraise'
                  }

                })
              }

          })
        }
      // }
    

    },

    // 更新图片
    updateImgStatus () {
      let self = this;
      if(self.orderList.order_state==30||self.orderList.order_state==45){
        self.$toast('图片正在审核，请审核过后再上传');
        self.updatePicState = true;
        return;
      }
      else if(!self.ImgStr) {
        self.$toast( '请上传图片');
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
        instance.post( 'api/index.php/member_vr_order/update_img_status', {
          key:self.KMToken,
          order_id:self.order_id,
          appraise_info_img: self.ImgStr ,
         
        }).then(function(res){
          if(200===res.data.code){
               self.$toast( '提交成功');
               self.$router.push({
                name: 'home.orderList',
                query: {
                  state_type:'state_send'
                }

               })
               
            }
  
        })
      }

    

    },

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
            self.$toast('已放弃活动')
            self.ToGiveUpPage = false;
            self.$router.push({
              name: 'home.Home',
            });

          }
          else {
            // console.log(res.data.datas.error);
            self.$toast(res.data.datas.error);
            self.ToGiveUpPage = false;
          }
        })
      }
    

    },
    // 放弃活动--取消
    cancelGiveUp() {
      this.ToGiveUpPage = false;
    },
    //删除图片
    delectImg(index) {
      this.commentAllImg;
      this.commentAllImg.splice( index, 1);
      let str ='';
      this.commentAllImg.forEach(function(i,d){
        str =str + i +','
      });
      this.ImgStr =  str.slice(0,str.length-1);
      
      if( this.commentAllImg.length<9) {
        this.addImgBtn = true;
      }

    },

    switchState (status) {
      if (status !== this.status) {
        this.status = status;
        // this.list();
      }
    },
    //核对店铺
    checkShop (event) {
      let _this = this
      // console.log(_this.list);
      // console.log(_this.dd);
      // console.log(_this.listData)
      if(_this.listData.length==0){
        _this.$toast('请输入核对内容');
      }
      else{
        let arr1 = [];
        let arr2 = [];

        for(let n = 0; n < _this.shopnameArr1.length; n++) {
            if(n % 2 != 0) {
              arr1.push(_this.shopnameArr1[n]);
              arr2.push(_this.listData[n]);
            }
        }
       // console.log(arr1);
       // console.log(arr2);
       if(arr1.sort().toString() == arr2.sort().toString()){
          _this.$toast('核对成功');
          _this.disabledStatus = true;
          
       }
       else{
           _this.$toast('核对失败');
           _this.disabledStatus = false;
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

    ToGiveUp() {
      this.ToGiveUpPage = true;
    }
  },
};
