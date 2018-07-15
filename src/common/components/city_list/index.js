import './index.scss';
import Header from '~common/components/header';
import axios 		      from 'axios';

export default {
  name: 'cityList',
  props: {
    point: {
      type: Boolean,
      default: true,
    },
    showAllCity: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      cityLIstProvince: [],
      proId: 0,
      cityId: 0,
      parentIndex: 1,
      loading: false,
      province : '',
      city : '',
      cityShow : true,
      address:''
    };
  },

  computed: {
  },
  mounted () {
    this.cityLIst();
    console.log(this.parentIndex);
  },
  watch: {
  },
  components: {
    'app-header': Header,
  },
  methods: {

    cityLIst () {
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
      instance.post( 'api/index.php/area/area_list&area_id='+self.proId, {
    
      }).then(function(res){
        if(200===res.data.code){
          console.log(res.data.datas);
          self.cityLIstProvince = res.data.datas;
        }
        else {
              
            }
      })
    
    },



    // Tab切换
    handleParent (index) {

    
      if( this.parentIndex==2) {
        this.parentIndex==2
      }else{
        this.parentIndex  = index;
      }
      console.log('555555'+this.parentIndex );
    },

    // 城市选择
    handleSelect (id,name) {
      if(this.parentIndex==1) {
        this.province = name;
        this.proId = id;
        this.parentIndex =2;
        this.cityLIst();
        console.log('province'+name)
      }
      else if (this.parentIndex==2) {
        this.city = name;
        this.cityId = id;
        // this.cityLIst();
        console.log('city'+name);
        // this.cityShow = false;
        this.$emit('cityClose',
        {
          name:this.province + this.city,
          id:this.proId
        },
       
      );

      }
     


    },

    
  }
};