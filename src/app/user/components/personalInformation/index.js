import './index.scss';


export default {
    name: 'personal',
    data () {
        return {
        };
    },

    components: {

    },

    computed: {
    },

    mounted () {
    },



    methods: {
     goBackHome() {
        this.$router.push({
            name: 'home.Home'
          });
     }
    }
};