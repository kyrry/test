import './index.scss';

import _          from 'lodash';
import VueCropper from 'vue-cropperjs';


export default {
  name: 'cropper',
  props: {
    message: String ,
    data: String ,
    notCompress: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading : false,
      isNone: false ,
      imgSrc  : '',
      imgType : 'image/jpeg',
    };
  },
  watch: {
    cropImg (val) {
      this.newImgUrl = val;
    }
  },
  computed: {
    isShow () {
      if (true === _.get(this.$store.get.state, 'Cropper.content.isShow')) {
        this.setImage();
      }
      return _.get(this.$store.get.state, 'Cropper.content.isShow') || false;
    },
    save () {
      return _.get(this.$store.get.state, 'Cropper.content.save') || 0;
    },
  },
  mounted () {

  },

  components: {
    VueCropper
  },

  watch: {
  },
  methods: {
    confirm() {
      console.log(4444);
      this.$emit('toggleNotify');
    },
    determine () {
      this.$emit('togglecancel');
    },
    cancel () {
      // this.isNone =true;
      this.iscancelApplay = false;
    }
  }
};
