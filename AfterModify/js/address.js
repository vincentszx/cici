/**
 * author:xuanhao
 */
//新建一个Vue实例
new Vue({
    el: '.container',
    data: {
      limitNum: 3,
      addressList:[],
      currIndex:0,
      shippingMethod:1,
      delFlag: false,
      currAddress:'',
      addFlag: false,
      modifyFlag: false,
      modifyId:'',
      modifyName:'',
      modifyStreetAddress:'',
      modifyTel:''
    },
    mounted: function() {
      this.$nextTick(function() {
          this.getAddressList();
      });
    },
    //实时计算
    computed: {
        filterAddress: function() {
          //分割截取3条数据
           return this.addressList.slice(0,this.limitNum);
        },
    },
    methods: {
      //获取json数据列表
      getAddressList: function() {
        this.$http.get('data/address.json').then(response=>{ //EC6
          var res = response.data;
          if(res.status == '0') {
            this.addressList = res.result;
          }
        });
      },
      // //加载更多(可用方法或者指令)
      loadMore: function() {
        if(this.limitNum == 3) {
          this.limitNum = this.addressList.length;  //加载更多
        }else {
          this.limitNum = 3;    //隐藏
        }
      },
      // 设置为默认地址
      setDefault: function(addressId) {
        //遍历
         this.addressList.forEach(function(item, index) {
              if(item.addressId == addressId) {
                  item.isDefault = true;
              }else {
                  item.isDefault = false;
              }
         });
      },
      //删除地址
      delConfirm: function(item) {
            this.delFlag = true;
            this.currAddress = item;
      },
      //正式删除
      delAddress: function() {
          var index = this.addressList.indexOf(this.currAddress);
          this.addressList.splice(index, 1);
          this.delFlag = false;
      },

      //修改窗口
      modifyMod: function(item) {
          this.modifyFlag = true;
          this.modifyId = item.addressId;
          this.modifyName = item.userName;
          this.modifyStreetAddress = item.streetName;
          this.modifyTel = item.tel;
      },
      //确认保存
      saveModify: function(addressId) {
          this.addressList.forEach((item,index)=>{
              if(item.addressId == addressId) {
                item.userName = this.modifyName;
                item.streetName = this.modifyStreetAddress;
                item.tel = this.modifyTel;
              }
          });
          this.modifyFlag = false;
      },
    },
});
