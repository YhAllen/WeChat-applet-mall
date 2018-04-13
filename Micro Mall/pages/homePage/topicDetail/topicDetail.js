var app = getApp();//引入全局变量


Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId=options.id;
    // console.log(postId);
  var that = this;

    wx.request({
      url: 'http://t.yushu.im/v2/movie/subject/' + postId,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.setData({
          postDetail: res.data,
          postId: postId
        })
        // console.log(res);
      },
      fail: function (error) {
        console.log(error)
      }
    })



    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters?start=0&count=4',
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.setData({
          postDetailItems: res.data.subjects,
        })
        // console.log(res);
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },

  onGoodsTap: function (event) {
    var goodsId = event.currentTarget.dataset.goodsid;
    // console.log(goodsId)
    // console.log(this.data.postId);
    wx.navigateTo({
      url: '../../goods/goodsDetail/goodsDetail?goodsid=' + goodsId
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