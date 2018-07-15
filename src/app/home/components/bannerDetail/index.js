import './index.scss';
import axios 		      from 'axios';
import {formatDate}   from '~common/filters/fmt_date.js';
export default {
  name: 'banner-page',
  data () {
    return {
     contentList: [],
     article_id: '',
    };
  },
  components: {
  },
  computed: {
  },
  filters: {
    handleDate (time) {
      return formatDate(new Date(time * 1000), 'yyyy-MM-dd');
    },
  },
  mounted () {
    
    if(this.$route.query.article_id){
      this.article_id = this.$route.query.article_id;
      console.log(this.$route.query.article_id)
      this.getContentList();
    }
   
  },

  methods: {
       // 获取内容列表
       getContentList () {
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
        instance.post( 'api/index.php/index/getgg_info&article_id='+ self.article_id, {
        }).then(function(res){
          if(200===res.data.code){
          // console.log(res.data.datas);
            self.contentList = res.data.datas;
          }
          else {
                // self.$toast( '请求失败');
              }
        })
      
  
      },
   },
};
