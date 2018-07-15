import './index.scss';

import _          from 'lodash';
import Header     from '~common/components/header';
import localStorage   from '~common/services/localStorage.cookie';
import {formatDate}   from '~common/filters/fmt_date.js';
import axios 		      from 'axios';
export default {
  name: 'userCard',
  data () {
    return {
      active  :0,
      arr: [
        '全部',
        '待提交（30）',
        '待拍摄',
        '待选图（20）',
        '待评价（0）',
        '待确认',
        '售后中',
        '已放弃',
        '已完成',
    ],
      status        : 1000,
      formTemp      : {
        list        : [],
      },
      keyword       : '',
      recordList    : '',
      timer         : '',
      page          : 1,
      total         : 0,
      per_page      : 0,
      current_page  : 0,
      last_page     : 0,
      isNoticeShow  : false,
      active  :0,
      performShow   : false,
    };
  },
  components: {
    'app-header': Header,
  },
  computed: {
    userInfo () {
      return _.get(this.$store.get.state, 'App.userInfo');
    },
  },
  mounted () {
    this.ken();
    this.getRecordList();
  },
  filters: {
    handleDate (time) {
      return formatDate(new Date(time * 1000), 'yyyy-MM-dd');
    },
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
    ken () {
      if (this.token) {
        localStorage.set('KMToken', {
          token : this.token,
        });
      }
      let token = localStorage.get('KMToken');
      this.KMToken = _.get(token, 'data.token');

    },
    getRecordList () {
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
      instance.post( 'api/index.php/member_index/gold_log', {
        key:self.KMToken,

      }).then(function(res){
        if(200===res.data.code){
          self.recordList = res.data.datas;
          if (self.recordList.length === 0) {
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

    switchover (active) {
      // console.log(active);
      if (active !== this.active) {
        this.active = active;
        // this.list();
      }
    },
    toggle (index) {
      this.active = index;
      this.type = this.arr[index];
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
    //获取数量
   getCount () {
      let self = this;
      // Models.User
      // .countList({
      // })
      // .then((res) => {
      //   // console.log(res);
      //   this.quantityJ = res.data.z.sum;
      //   this.quantityJ0 =  res.data.j.list[1000] ;
      //   this.quantityJ1 =  res.data.j.list[1001] ;
      //   this.quantityJ2 =  res.data.j.list[1002] ;
      //   this.quantityJ3 =  res.data.j.list[1003] ;
      //   this.quantityZ = res.data.j.sum;
      //   this.quantityZ0 =  res.data.z.list[1000] ;
      //   this.quantityZ1 =  res.data.z.list[1001] ;
      //   this.quantityZ2 =  res.data.z.list[1002] ;
      //   this.quantityZ3 =  res.data.z.list[1003] ;
      // });
    },
    /*
     * 获取办卡列表
     */
    list () {
      let self = this;
      let oldStatus = self.status;
      Models.User
      .cardList({
        params: {
          keyword: self.keyword,
          page   : self.page,
          type   : self.status,
          direct : this.active,
        },
      })
      .then((res) => {
        if (self.status !== oldStatus) {
          return;
        }
        if (1 === res.code) {
          let data = res.data;
          // console.log(data);

          if (1 < self.page) {
            self.formTemp.list = _.concat(self.formTemp.list, data.data);
          }
          else {
            self.formTemp.list = data.data;
          }

          self.total         = data.total;
          self.per_page      = data.per_page;
          self.current_page  = data.current_page;
          self.last_page     = data.last_page;
        }
        if (self.formTemp.list.length === 0) {
          this.performShow = true;
        }
        else {
          this.performShow = false;
        }
      });
    },

    /*
     * 切换办卡状态
     */
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
