
import './index.scss';
import axios 		      from 'axios';
import _ 						from 'lodash';
import LocalStorage from '~common/services/localStorage.cookie';

export default {
  name: 'phoneCode',
  props: ['title', 'phone','type'],
	data () {
		return {
			name: this.title,
			active: false,
		};
	},
	computed: {},
  mounted () {
	//   console.log(this.phone);
		if (!_.isEmpty(this.getTimeCount())) {
			this.timer();
		}
		else {
			this.active = false;
		}
  },
  methods: {
		getTimeCount () {
			let time = LocalStorage.get('timeCount');
			if (!_.isEmpty(time)) {
				return time.data;
			}

			return {};
		},
		timer () {
			let self 	= this;
			let t 		= setInterval(function () {
				if (_.isEmpty(self.getTimeCount())) {
					self.name 	= self.title;
					self.active = false;
					clearInterval(t);
					return;
				}

				let expired = parseInt(new Date().getTime() / 1000);
				let num 		= self.getTimeCount().expired - expired;

				if (0 >= num) {
					self.name 	= self.title;
					self.active = false;
					clearInterval(t);
					return;
				}

				self.active = true;
				self.name = `(${num}s)重新获取`;

			}, 1000);
		},
    getPhoneCode () {
			let self = this;
			if (self.phone) {
				self.handleSubmit();
			}
			else {
				self.$toast('请填写手机号码');
			}

		},

		// handleSubmit
		handleSubmit () {
			let self = this;
			let local = LocalStorage.get('timeCount');

      if (_.isEmpty(local)) {
        local.data = _.assign({}, local.data, { num: 0 });
      }

      let data = local.data.num;

    //   if (5 <= data) {
				// self.$toast('短信发送已达最大限，请30分钟后再试');
				// return;
    //   }

      let duration = 0;
			if (3 <= data) {
				duration = 3000;
				// self.$toast(`30分钟内只允许发送5条，你目前已发送${data}条`, { duration: 6000 });
			}

			setTimeout(() => {
				self.$store.get.dispatch({
					type: 'Loading',
					isShow: true,
					Text: '正在请求...'
				});
				axios({
					method: 'Get',
					url: '/api/index.php/connect/get_sms_captcha?type='+ self.type +'&phone=' + self.phone
					})
				.then((res) => {
					console.log(res);
					if (200 === res.code) {
						// LocalStorage.set('timeCount', 60, 60);
						let expired = parseInt(new Date().getTime() / 1000);
						LocalStorage.set('timeCount', { expired: expired + 60, num: local.data.num + 1 }, 60 * 30);

						self.$toast('短信验证码已发送');
						self.timer();
					}
					else {
						self.$toast(res.datas.error || '发送失败');
					}

					self.$store.get.dispatch({
						type: 'Loading',
						isShow: false
					});
				});
			}, duration);

		},
  }
};