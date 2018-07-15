import './index.scss';

import _          from 'lodash';
import Header     from '~common/components/header';
import Models     from '~common/models';
import Footer         from '~common/components/footer';
// import NotifyPopup  from '~common/components/notify_popup';

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
      /*
       * 分页
       */
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
    'app-footer': Footer,
    // 'notify-popup': NotifyPopup
  },
  computed: {
    userInfo () {
      return _.get(this.$store.get.state, 'App.userInfo');
    },
  },
  mounted () {

    // this.list();
    // this.getCount();
    // this.isNoticeShow = true;
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
