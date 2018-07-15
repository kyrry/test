<template>
  <div class="app" :class="{ fixed: isFixed }">
    <router-view></router-view>
    <app-loading v-if="isShow"></app-loading>
    <app-dialog></app-dialog>
    <!-- 完善个人信息 -->
    <!-- 用户等级 -->
    <!-- 推荐人 -->
    <!-- <Invite></Invite> -->
    <!-- 浏览分享链接提示 -->
    <Visitor></Visitor>
    <!-- 板块通知 -->
    <SystemNotify></SystemNotify>
  </div>
</template>

<script>

import 'babel-polyfill';
import _              from 'lodash';
import Vue            from 'vue';
import wx             from 'weixin-js-sdk';
import Loading        from '~common/components/loading';
import Dialog         from '~common/components/dialog';
import Models         from '~common/models';
import LocalStorage   from '~common/services/localStorage.cookie';
import Visitor        from '~common/components/visitor';
import SystemNotify   from '~common/components/system_notify';

export default {
  name: 'app',
  data () {
    return {
      shareData: {
        imgUrl  : `${window.location.protocol}//m.kamengjinfu.com/assets/images/km-logo.3bfec051.jpg`,
        link    : window.location.href,
        title   : `金融+保险  拓客推广服务,身边最赚钱平台/${document.title}`,
        desc    : '未来我们追求不止是金钱，而是志同道合的合伙人 --- 卡盟V金服 --- 人人都是金融家',
      },
      userInfo  : {},
      userData  : {},

      // jsApiList : [],

      /**
        * 以下路由页面
        * 允许微信里面分享
        **/
      weChatShareRoute: [
        'home.Home',
        'home.Zx',
        'home.Calculator',
        'home.AppDownLoad',
        'home.Simulate1',
        'home.WeChatCardInsuranceSign',
        'home.WechatLoanOffice',
        'home.WechatCreditCardSign',
        'home.WeChatCoop',
        'home.WeChatCard',

      ],

      conn: null,
      ws: null,

    }
  },
  computed: {
    unitType () {},
    isShow () {
      return this.$store.get.state.Loading.isShow;
    },
    isFixed () {
      return this.$store.get.state.App.appFixed;
    },
    styleObj () {
      return this.$store.get.state.App.styleObj;
    },

    currentRoute () {
      return _.get(this.$store.get.state, 'App.currentRoute') || {};
    },

    histData () {
      return _.get(this.$store.get.state, 'App.histData');
    },

    audio () {
      return _.get(this.$store.get.state, 'App.audio');
    },

    shareBid () {
      return _.get(this.$store.get.state, 'App.shareBankId');
    }
  },
  mounted () {
  },
  watch: {
    '$route' (to, old) {
      if (!_.isEmpty(to.name) && to !== old) {
        this.shareChanged(to);
      }
    },

    histData (val, old) {
      if (val !== old) {
        this.weChatShareConf();
      }
    },

    audio (val, old) {
      if (this.audio && val !== old) {
        if (false === this.device.is('WeChat')) {
          this.audio.play();
        }
      }
    },

    shareBid () {
      this.shareChanged(this.$route);
    }
  },

  components: {
    'appLoading': Loading,
    'appDialog' : Dialog,
    // Invite,
    Visitor,
    SystemNotify,
  },
  beforeRouteLeave (to, from, next) {
    if (!_.isEmpty(this.conn) && 'chat.Home' !== this.$route.name) {
      this.conn.close();
    }
    next();
  },
  methods: {

    shareChanged (to) {
      let self = this;
      self.fetchData();

      let route = _.filter(to.matched, { name: to.name });
      if ((true === _.get(route[route.length - 1], 'meta.authorization')
        || true === _.get(route[route.length - 1], 'parent.meta.authorization')
        || true === self.device.is('WeChat') || window.js_obj)
        && to.name !== 'home.finishInvite') {
      }

      self.$nextTick(() => {
        setTimeout(() => {

          let query = this.$parseQueryString(window.location.href);
          if (!_.isEmpty(query.invite_code)) {
            LocalStorage.set('invite_code', query.invite_code);
          }

          self.weChatShareConf();

        }, 500);
      });
    },

    // 微信分享文案
    weChatShareInfo (userInfo) {
      let self = this;
      let query = this.$parseQueryString(window.location.href);
      let connect = _.isEmpty(query) ? '?' : '&';


      // if (query.from && query.isappinstalled) {
      //   let url = self.$delUrlParams(window.location.href, 'from');
      //   url = self.$delUrlParams(url, 'isappinstalled');
      //   window.location.replace(url);
      // }

      self.shareData.link   = `${window.location.href}${connect}invite_code=${userInfo.invite_code}`;
      self.shareData.title  = `金融+保险  拓客推广服务,身边最赚钱平台~${document.title}`;
      self.shareData.desc  = '未来我们追求不止是金钱，而是志同道合的合伙人 --- 卡盟V金服 --- 人人都是金融家';

      if ('user.InviteTotal' === this.currentRoute) {
        self.shareData.title = `${userInfo.user_nickname}  邀请您一起加入卡盟v金服平台`;
        self.shareData.desc  = '未来我们追求不止是金钱，而是志同道合的合伙人 --- 卡盟V金服 --- 人人都是金融家';
        self.shareData.link = `${window.location.origin}/creditcard/share/join?invite_code=${userInfo.invite_code}`;
      }
      else if (
        'home.CreditCard' === this.currentRoute ||
        'home.CreditCardList' === this.currentRoute ||
        'home.CreditCardDetail' === this.currentRoute ||
        'home.CardShare' === this.currentRoute ||
        'home.CreditCardApply' === this.currentRoute ||
        'home.studentCreditCard' === this.currentRoute
      ) {
        self.shareData.title = '免费申请银行信用卡.秒批.额度高';
        self.shareData.desc  = `${userInfo.user_nickname} 推荐您免费办理信用卡.合作银行通道,高额.秒批.0费用.包邮到家`;

        if ('home.CreditCard' === this.currentRoute) {
          self.shareData.title  = '银行信用卡.大额秒批通道-免费申请';
          self.shareData.imgUrl = 'https://cdn.kamengjinfu.com/assets/images/yinglian.fb551a83.jpg';
        }
        else if ('home.studentCreditCard' === this.currentRoute && !this.shareBid) {
          self.shareData.title  = '免费办理大学生校园卡.免年费.秒批';
          self.shareData.desc  = `${userInfo.user_nickname} 推荐您免费办理大学生信用卡，盲批95%下卡率，助高校学生创业之卡`;
          self.shareData.link   = `${window.location.origin}/studentCreditCard?invite_code=${userInfo.invite_code}`;
        }
        else {
          let params = self.$route.params;
          let query  = self.$route.query;

          let bid = params.bid || query.bid || this.shareBid;

          if (!_.isEmpty(bid + '')) {
            let url = '';
            if (this.shareBid) {
              url = 'bid=' + this.shareBid;
            }
            else {
              url = self.$stringUrl(params);
              if (_.isEmpty(url)) {
                url = self.$stringUrl(query);
              }
            }

            self.shareData.link   = `${window.location.origin}/card_share?invite_code=${userInfo.invite_code}&${url}`;

            if ('home.studentCreditCard' === this.currentRoute) {
              self.shareData.title  = '免费办理大学生校园卡.免年费.秒批';
              self.shareData.desc  = `${userInfo.user_nickname} 推荐您免费办理大学生信用卡，盲批95%下卡率，助高校学生创业之卡`;
            }

            let shareData = _.get(self.histData, 'shareData');
            if (!_.isEmpty(shareData)) {
              if (query.invite_code) {
                let tUrl = self.$delUrlParams(window.location.href, 'invite_code');
                tUrl = self.$parseQueryString(tUrl);
                if (!_.isEmpty(tUrl)) {
                  url = self.$stringUrl(tUrl);
                }
              }

              self.shareData.title  = `免费申请${shareData.name}信用卡.秒批.额度高`;
              self.shareData.desc   = `${userInfo.user_nickname} 推荐您免费办理${shareData.name}信用卡.合作银行通道,高额.秒批.0费用.包邮到家`;
              self.shareData.imgUrl = shareData.logo;
              self.shareData.link   = `${window.location.origin}/card_share?invite_code=${userInfo.invite_code}&${url}`;
            }
          }
        }
      }

      else if ('home.CgbDetail' === this.currentRoute) {
        self.shareData.title  = `免费办理大学生校园卡.免年费.秒批`;
        self.shareData.desc  = `${userInfo.user_nickname} 推荐您免费办理大学生信用卡，盲批95%下卡率，助高校学生创业之卡`;
      }

      else if ('user.Business' === this.currentRoute) {
        self.shareData.link = `${window.location.origin}/share_business_card?id=${userInfo.id}&invite_code=${userInfo.invite_code}`;
      }

      else if ('home.IncreaseDetail' === this.currentRoute) {
        self.shareData.title = document.title;

        let random = Math.random();
        if (random >= 0.5) {
          self.shareData.imgUrl = `${window.location.protocol}//m.kamengjinfu.com/assets/images/yinglian.fb551a83.jpg`
        }
        else {
          self.shareData.imgUrl = `${window.location.protocol}//m.kamengjinfu.com/assets/images/tiemiji.540a4226.jpg`
        }
      }

      else if ('user.BuyVip' === this.currentRoute || 'user.BuySuccess' === this.currentRoute) {
        let storeOrder = self.histData.agentOrder;

        if (!_.isEmpty(storeOrder)) {
          self.shareData.title = `${userInfo.user_nickname} 发来代付请求！`;
          self.shareData.desc  = `俺 在卡盟便民服务平台升级${storeOrder.title}，江湖救急，请帮我付个款吧，鄙人感激不尽！感情深不深就看这一回哦！`;
          self.shareData.link = `${window.location.origin}/user/buy_vip?order_id=${storeOrder.order_id}&pay_type=${storeOrder.pay_type}&invite_code=${userInfo.invite_code}&goods_id=${storeOrder.goods_id}`;
        }
      }

      else if ('home.LoanDeatil' === this.currentRoute || 'home.LoanShare' === this.currentRoute) {
        let loanData = self.histData.loanShareData;
        if (!_.isEmpty(loanData)) {
          self.shareData.title = `${loanData.name}-免费申请.极速放款，额度最高20万`;
          self.shareData.desc  = `${loanData.name}--极速贷款，保单贷款，精英贷款，不上征信，额度高`;
          self.shareData.imgUrl = loanData.logo;
          self.shareData.link = `${window.location.origin}/loan_share?loan_id=${loanData.loanId}&invite_code=${userInfo.invite_code}`;
        }
      }

      let data = _.get(LocalStorage.get('insurOrder'), 'data') || {};
      let taskId = data.taskId;
      let prvId = data.prvId;
      if (taskId && prvId) {
        self.shareData.title = `${userInfo.user_nickname} 发来代付请求！`;
        self.shareData.desc  = '我在卡盟金服平台购买了此保险，是时候该你仗义疏财啦，快帮我付个款吧，鄙人感激不尽！';
        self.shareData.link = `${window.location.origin}/insurance/replace_pay?invite_code=${userInfo.invite_code}&taskId=${taskId}&prvId=${prvId}`;
        self.weChatShareRoute = _.concat(self.weChatShareRoute, ['insurance.CarInsuranceLimit']);
      }

      // console.log(self.shareData);    // !!!
    },

    /*
     * 微信分享
     */
    weChatShareConf () {
      let self = this;


    },

    // 微信分享配置
    weChatConfig (userInfo, data) {
      let self = this;

      wx.config({
        debug     : false,
        appId     : data.appId,
        timestamp : data.timestamp,
        nonceStr  : data.nonceStr,
        signature : data.signature,
        jsApiList : data.jsApiList,
        // jsApiList : self.jsApiList,
      });

      self.weChatShareInfo(userInfo);

      let menuList = [
        'menuItem:exposeArticle',
        'menuItem:share:appMessage',
        'menuItem:share:timeline',
        'menuItem:share:qq',
        'menuItem:share:weiboApp',
        'menuItem:favorite',
        'menuItem:share:facebook',
        'menuItem:share:QZone',
        'menuItem:editTag',
        'menuItem:delete',
        'menuItem:originPage',
        'menuItem:copyUrl',
        'menuItem:originPage',
        'menuItem:openWithQQBrowser',
        'menuItem:openWithSafari',
        'menuItem:share:email',
        'menuItem:setFont',
        'menuItem:nightMode',
        'menuItem:dayMode',
        'menuItem:readMode'
      ];

      // 分享文案
      setTimeout(() => {
        wx.ready(() => {
          let shareData = {
            imgUrl: self.shareData.imgUrl,
            link  : self.shareData.link,
            title : self.shareData.title,
            desc  : self.shareData.desc,
            success () {
              self.shareTheIntegral();
              self.$toast('分享成功');
            },
          };

          // 播放audio
          if (this.audio) {
            this.audio.play();
          }

          if (1 < userInfo.level * 1) {
            self.weChatShareRoute = _.concat(self.weChatShareRoute, ['home.IncreaseDetail']);
          }

          let index = _.indexOf(self.weChatShareRoute, self.currentRoute);

          if (-1 === index) {
            wx.hideMenuItems({
              menuList: menuList,
            });
          }
          else {
            wx.showMenuItems({
              menuList: menuList,
            });
          }

          wx.onMenuShareTimeline(shareData);
          wx.onMenuShareAppMessage(shareData);
          wx.onMenuShareQQ(shareData);
          wx.onMenuShareWeibo(shareData);

        });
      }, 500);
    },

    /*
     * 分享得积分
     */
    shareTheIntegral () {
      let self = this;

      Models.User
      .shareTheIntegral()
      .then((res) => {
        if (1 === res.code) {
          let data = res.data;
          let text = `分享成功,获得${data.integral || 0}积分`;
          self.$toast(text);
        }
      });
    },

    fetchData () {
      let self = this;

      self.$store.get.commit('reSetText');

      self.$nextTick(() => {
        setTimeout(function () {
          self.$store.get.dispatch({
            type: 'Loading',
            isShow: false,
          });
        }, 500);
      });
    },

    // 获取用户信息
    
    


    // 发送文本消息
    sendMsgInfo (data) {
      let self = this;

      if (data) {
        let id = self.conn.getUniqueId();
        /* eslint-disable */
        let msg = new WebIM.message('txt', id);

        /* eslint-enable */
        msg.set({
          msg: '我正在浏览您分享的链接',
          to: data.im_id,
          roomType: false,
          success: function (id, serverMsgId) {
          },
          fail: (err) => {
            console.log(err);
          }
        });
        msg.body.chatType = 'singleChat';

        setTimeout(() => {
          self.conn.send(msg.body);
        }, 800);
      }
    },


    /*
     * 获取专属服务经理信息
     */
    handleInviteCode () {
      let self = this;

      let invite_code = _.get(self.$route, 'query.invite_code');

      if (!_.isEmpty(invite_code)) {
        self.shareRecord();

        Models.User
        .inviteUserInfo({
          params: {
            invite_code: invite_code,
          }
        })
        .then((res) => {
          if (1 === res.code) {
            self.userInfo
            .then((re) => {
              if (re.code !== 1) {
                return;
              }

              // 无邀请码，跳转到个人中心设置
              let showFinishParentId = sessionStorage.getItem('showFinishParentId');
              if (re.data.id && !re.data.parent_id && !showFinishParentId) {
                sessionStorage.setItem('showFinishParentId', true);
                self.$toast('请完善上级推荐码');
                self.$router.push({ name: 'user.Profile', query: { dt: self.$route.path, inviteCode: self.$route.query.invite_code } });
              }

              if (res.data.id !== re.data.id) {
                self.sendMsgInfo(res.data);
              }
            })
          }
        });
      }
    },

    // 保存浏览记录
    shareRecord () {
      this.userInfo
      .then((res) => {
        if (!_.isEmpty(res)) {
          Models.Home
          .shareRecord({
            invite_code: _.get(this.$route, 'query.invite_code'),
            user_id: res.data.id,
            share_url: window.location.href,
          })
          .then(res => res);
        }
      });
    },

    // 更新聊天未读数量
    handleUpdateMessage () {
      let data = _.get(this.$store.get.state, 'Message.content.msg') || { message: 0 };
      data.message += 1;

      let localMessageNum = LocalStorage.get('MessageNum');

      if (_.isEmpty(localMessageNum)) {
        localMessageNum.data = 0;
      }


      LocalStorage.set('MessageNum', localMessageNum.data + 1);

      this.$store.get.dispatch({
        type: 'message',
        msg: data,
      });
    },
    


  }
}
</script>
