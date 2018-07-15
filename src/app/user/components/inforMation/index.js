import './index.scss';
import localStorage   from '~common/services/localStorage.cookie';
import cityList       from '~common/components/city_list';
import mdialog  from '~common/components/mdialog';
// import {Toast} from 'mint-ui';
import {formatDate}   from '~common/filters/fmt_date.js';

import axios 		      from 'axios';

export default {
  name: 'userCertify',
  data () {
    return {
      err:'success',
      data1:'1',
      currentdatatime:'',//当前选择的时间
      Value: new Date(),          //定义显示时间
      visible: false,
      startDate: new Date('1029-01-22'),      //设置开始时间
      endDate: new Date('2029-01-22'),   //设置结束时间
     isNoticeShow:false,
      headImg: '',
      imgUrl  : '',
      popupVisible: false,
      sexVisible: false,
      areaPicker: '',
      areaPicker: '',
      example: false,
      areaList: [],
      data: {
       nickname: '',
        sex: '',
        birthday:'',
        address:'',
        real_name:'',
        phone:'',

      },
      formData: {
        id_card: '',
        validate: {
          back: '',
          just: '',
          body: '',
        },
      },
      sexs: [],
      addressProvince: '',
      cityShow: false,
      addressProvinceId: '',
      addressCity: '',
      addressCityId: '',
      loading: false,
      isJust : false,
      isVerify: false,
      indialogShow: true,
      currentFile: '',
      formTemp: {
      },

      isZoom: false,
      zoomImage: '',
    };
  },
  components: {
    cityList,
    mdialog    

  },
  computed: {
   
  },
  mounted () {
  
    this.sexs = [{
      name: '男',
      method: this.selectMan
    }, {
      name: '女',
      method: this.selectWoman
    }]


      this.ken();
      console.log(this.KMToken)
  },
  watch: {


  },
  filters: {                    //时间转换
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
  methods: {
    open(picker) {
      this.$refs[picker].open();    //设置开始
    },
    handleConfirm() {
      // console.log(666);
      this.data.birthday =   formatDate(new Date(this.Value), 'yyyy-MM-dd');
    },
    toggleNotify () {
      this.isNoticeShow = false;
      this.$router.push({
        name: 'user.personalInformation'
      });
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

      this.KMToken = _.get(token, 'data.token');
      this.KMType = _.get(type, 'data');
    },
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
    update(e){
     this.loading = false;
     let headUrl ='';
      var self = this;
      if (false === self.loading) {
        self.$store.get.dispatch({
          type: 'Loading',
          Text: '上传中...',
          isShow: true
        });
      }

     
      let file = e.target.files[0];  
      console.log(3435345);
      if(!file){
          self.$store.get.dispatch({
            type: 'Loading',
            Text: '已上传',
            isShow: false
          });
      return;
      } else{
        console.log(555555);
        let param = new FormData(); 
        param.append('img',file,file.name);
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }; 
        self.axios.post('api/index.php/upload/index',param,config)
        .then(response=>{
          headUrl = response.datas.img_url;
          self.imgUrl = headUrl.substr(0,7).toLowerCase() == "http://" ? headUrl : "http://" + headUrl;
          self.loading = true;
          console.log(self.loading);
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


   checkOut() {
     this.example = true;
   },
 
   //提交
   handleSubmit () {
    console.log(444);
    let self = this;

    if(!self.data.nickname) {
      self.$toast( '请填写昵称');
    }
    else  if(!self.data.sexText) {
      self.$toast( '请选择性别');
    }
    else if(!self.data.address) {
      self.$toast( '请选择收货地区');
    }
    else if(!self.data.birthday) {
      self.$toast( '请选择出生日期');
    }
    else if(!self.data.real_name) {
      self.$toast( '请填写收货人姓名');
    }
    else if(!self.data.phone) {
      self.$toast( '请填写收货人电话');
    }
    else if(!self.data.wetChat) {
      self.$toast( '请填写微信号');
    }
    else if(!self.imgUrl) {
      self.$toast( '请上传收货人信息截图');
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
      instance.post( 'api/index.php/member_index/editMemberInfo', {
        member_truename: self.data.nickname,
        member_sex:this.data.sex,
        member_area_id:'city-'+self.addressProvinceId+'-city',
        member_areainfo:self.data.address,
        member_birthday:parseInt(Date.parse(self.data.birthday)),
        buy_name:self.data.real_name,
        buy_moblie:self.data.phone,
        buy_img:self.imgUrl,
        weixin_number:self.data.wetChat,
        key:self.KMToken,

      }).then(function(res){
        if(200===res.data.code){
          // self.$toast( '提交成功');
          self.isNoticeShow = true;
   
        }
        else {
              self.$toast(res.data.datas.error);
            }
      })
    }
  

  },

  selectMan: function () {
    this.data.sex = '1'
    this.data.sexText = '男'
  },
  selectWoman: function () {
    this.data.sex = '2'
    this.data.sexText = '女'
  }


  }
}