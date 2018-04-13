Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsCollected:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goodsDetail = wx.getStorageSync('goodsDetail');
    // var goodsCollected = [];
    // goodsCollected.push(goodCollected);
    this.setData({
      goodsDetail:goodsDetail
    })
    console.log(goodsDetail)
    // this.setData({
    //   goodCollected:goodCollected
    // })
  },

  //点击跳转查看商品详情
  onGoodsTap: function (event) {
    var goodId = event.currentTarget.dataset.goodid;
    // console.log(goodId);
    wx.navigateTo({
      url: "../../goods/goodsDetail/goodsDetail?goodsid=" + goodId
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