/**
 * author:xuanhao
 */
var vm = new Vue({
  el:"#app",
  data:{
    totalMoney:0,
    productList:[],
    checkallFlag:false,
    delFlag:false,
    currProduct: ''
  },
  //过滤器
  filters: {
      formatMoney: function(value) {
        return "¥ "+value.toFixed(2);
      },
  },
  //实例创建完成,进行步骤
  mounted: function() {
      this.$nextTick(function() {
        //保证this.$el已经插入文档
        this.cartView();
      })
  },
  methods: {
      cartView:function() {
        var _this = this;
        this.$http.get('data/cartData.json', {'id':123}).then(function(res) {
            _this.productList = res.data.result.list;
            //_this.totalMoney = res.data.result.totalMoney;
        });
      }
  },
});
//全局过滤器
Vue.filter('money', function(value, type) {
    return "¥ " + value.toFixed(2) + type;
});
