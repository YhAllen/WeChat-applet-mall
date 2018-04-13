import { Cart } from '../../cart/cart-model.js';
var cart = new Cart();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartIcon:'/images/icons/cart2.png',
    detailTitle:'商品详情',
    collectedIcon:'/images/icons/collected.png',
    collectIcon:'/images/icons/collect.png',
    countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    counts: 1,
    currentTabsIndex: 0,
    cartTotalCounts: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.postid;
    var goodsId = options.goodsid;
    this.setData({
      currentPostId:goodsId
    })    
    var that = this;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/subject/'+goodsId,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.setData({
          goodsDetail: res.data
        })
        // console.log(res);
      },
      fail: function (error) {
        console.log(error)
      }
    })

    var postsCollected = wx.getStorageSync('posts_collected')
    var that = this;
    if (postsCollected) {
      // console.log(goodsId);
      var postCollected = postsCollected[goodsId];
      this.setData({
        collected: postCollected
      })
    }
    else {
      var postsCollected = {};
      postCollected = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },


  goCart: function (event) {
    wx.switchTab({
      url: '../../cart/cart'
    })
  },


  //选择购买数目
  bindPickerChange: function (e) {
    this.setData({
      counts: this.data.countsArray[e.detail.value],
    });
  },

  /*添加到购物车*/
  onAddingToCartTap: function (e) {
    this.addToCart(e);
    wx.showToast({
      title: '加入购物车成功~',
      icon: 'success',
      duration: 800
    });
  },

  /*将商品数据添加到内存中*/
  addToCart: function (e) {
    var tempObj = {}, keys = ['id', 'title', 'images', 'rating'];
    for (var key in this.data.goodsDetail) {
      if (keys.indexOf(key) >= 0) {
        tempObj[key] = this.data.goodsDetail[key];
      }
    };

    // console.log(tempObj)
    var that = this;
    if (this.data.goodsDetail.id == e.target.id) {
      // 给goodsList数组的当前项添加count元素，值为1，用于记录添加到购物车的数量
      this.data.goodsDetail.counts = that.data.counts;

      // 获取购物车的缓存数组（没有数据，则赋予一个空数组）
      var arr = wx.getStorageSync('cart') || [];
      // 如果购物车有数据
      if (arr.length > 0) {
        // 遍历购物车数组
        for (var j in arr) {
          // 判断购物车内的item的id，和事件传递过来的id，是否相等
          if (arr[j].id == e.target.id) {
            // 相等的话，给counts+1（即再次添加入购物车，数量+1）
            arr[j].counts = arr[j].counts + that.data.counts;
            // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）
            try {
              wx.setStorageSync('cart', arr)
            } catch (e) {
              console.log(e)
            }
            // 返回（在if内使用return，跳出循环节约运算，节约性能）
            return;
          }
        }
        // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组
        arr.push(this.data.goodsDetail);
      }
      // 购物车没有数据，把item项push放入当前数据（第一次存放时）
      else {
        arr.push(this.data.goodsDetail);
      }
      // 最后，把购物车数据，存放入缓存
      try {
        wx.setStorageSync('cart', arr)
        // 返回（在if内使用return，跳出循环节约运算，节约性能）
        return;
      } catch (e) {
        console.log(e)
      }
    }
    
    cart.add(tempObj, this.data.counts);
  },


  //收藏功能
  onCollectionTap: function (event) {
    var goodDetail = {}, keys = ['id', 'title', 'images', 'rating'];
    for (var key in this.data.goodsDetail) {
      if (keys.indexOf(key) >= 0) {
        goodDetail[key] = this.data.goodsDetail[key];
      }
    };

    // console.log(goodDetail)
    var that = this;


    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);


    if (this.data.goodsDetail.id == event.target.id) {
      // 获取购物车的缓存数组（没有数据，则赋予一个空数组）
      var goodsArr = wx.getStorageSync('goodsDetail') || [];
      // 如果购物车有数据
      if (goodsArr.length > 0) {
        // 遍历购物车数组
        for (var j in goodsArr) {
          // 判断购物车内的item的id，和事件传递过来的id，是否相等
          if (goodsArr[j].id == event.target.id) {

            // 相等的话，删除该元素
            
            goodsArr.splice(j, 1);

            postCollected = !postCollected;

            


            // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）
            try {
              wx.setStorageSync('goodsDetail', goodsArr)
            } catch (e) {
              console.log(e)
            }
            // 返回（在if内使用return，跳出循环节约运算，节约性能）
            return;
          }
        }
        // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组
        goodsArr.push(this.data.goodsDetail);
      }
      // 购物车没有数据，把item项push放入当前数据（第一次存放时）
      else {
        goodsArr.push(this.data.goodsDetail);
      }
      // 最后，把购物车数据，存放入缓存
      try {
        wx.setStorageSync('goodsDetail', goodsArr)
        // 返回（在if内使用return，跳出循环节约运算，节约性能）
        return;
      } catch (e) {
        console.log(e)
      }
    }

    // cart.add(goodDetail, this.data.counts);


    // var postsCollected = wx.getStorageSync("posts_collected");
    // var postCollected = postsCollected[this.data.currentPostId];
    // postCollected = !postCollected;



    // if (!postCollected) {
    //   try {
    //     wx.removeStorageSync('goodCollected')
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };


    // postsCollected[this.data.currentPostId] = postCollected;
    // this.showToast(postsCollected, postCollected);
  },

  


  showToast: function (postsCollected, postCollected) {
    // 更新文章是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})