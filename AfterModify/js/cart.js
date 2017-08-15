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
      },
      //改变数量
      changeMoney:function(product, way){
        if(way > 0) {
          product.productQuantity++;
        }else {
          product.productQuantity--;
          if(product.productQuantity < 1) {
            product.productQuantity = 1;
          }
        }
          //计算总金额
        this.calcTotalPrice();
      },
      calcTotalPrice: function() {
        this.totalMoney = 0;  //总金额清零
        this.productList.forEach((item,index)=>{
            if(item.checked) {
                this.totalMoney += item.productQuantity * item.productPrice;//计算总价
            }
        })

      },
      //勾选单个产品
      selectedProduct: function(item) {
        var _this = this;
        //判断是否有checked数据项,如果没有则进行全局注册
        if(typeof item.checked == 'undefined') {
            Vue.set(item, "checked", true); //全局注册
            //_this.$set(item, "checked", true);//局部注册
        }else {
           item.checked = !item.checked;
        }
          //计算总金额
        this.calcTotalPrice();
      },
      //勾选全部
      checkAll: function(flag) {
        this.checkallFlag = flag;
  			this.productList.forEach((item,index)=>{   //ES6的语法
  				if(typeof item.checked == "undefined"){
  					this.$set(item,'checked',this.checkallFlag);
  				}else{
  					item.checked = this.checkallFlag;
  				};
  			})
        //计算总金额
        this.calcTotalPrice();
      },
      //删除框
      delConfirm: function(item) {
          this.delFlag = true;
          this.curProduct = item;
      },
      //正式删除
      delProduct: function() {
          var index = this.productList.indexOf(this.curProduct);
          this.productList.splice(index, 1);
          this.delFlag = false;
      },
  },
});
//全局过滤器
Vue.filter('money', function(value, type) {
    return "¥ " + value.toFixed(2) + type;
});
