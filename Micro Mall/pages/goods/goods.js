Page({
  data: {
    /** 
        * 页面配置 
        */
    curIndex:0,
    search: {},
    containerShow: true,
    searchPanelShow: false,
    text:'',
    t: 'color:red'
  },
  onLoad: function (options) {
    var that = this;

    wx.getStorage({
      key: 'film_favorite',
      success: function (res) {
        that.setData({
          film_favorite: res.data
        })
      }
    })
    wx.getStorage({
      key: 'person_favorite',
      success: function (res) {
        that.setData({
          person_favorite: res.data
        })
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
          new_products: res.data.subjects,
        })
        // console.log(res.data);
      },
      fail: function (error) {
        console.log(error)
      }
    })


    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters?start=5&count=5',
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.setData({
          popular: res.data.subjects,
        })
        // console.log(res.data);
      },
      fail: function (error) {
        console.log(error)
      }
    })


    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters?start=11&count=5',
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.setData({
          sales: res.data.subjects
        })
        // console.log(res.data);
      },
      fail: function (error) {
        console.log(error)
      }
    })


    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters?start=15&count=5',
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.setData({
          price: res.data.subjects
        })
        // console.log(res.data);
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },

  //搜索
  

  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      search: {},
      text:''
    })
    console.log(this.data.text)
  },

  onBindFocus: function (event) {
    // console.log(event.detail.value)
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  onBindConfirm: function (event) {
    var that = this;
    var text = event.detail.value;
    this.setData({
      text:text
    })
    // console.log(text);
    var searchUrl = 'http://t.yushu.im/v2/movie/search?q=' + text;
    wx.request({
      url: searchUrl,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.setData({
          search: res.data.subjects
        })
        console.log(res.data);
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },


  //轮播
  onSwiperTap: function (event) {
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var postId = this.data.curIndex;
    var goodsId = event.target.dataset.swiperid;
    wx.navigateTo({
      url: 'goodsDetail/goodsDetail?postid=' + postId + '&goodsid=' + goodsId
    })
  },
//点击跳转查看商品详情
  onGoodsTap: function (event) { 
    var goodsId = event.currentTarget.dataset.goodsid;
    // console.log(goodsId);
    // var postId = this.data.curIndex;
    // console.log(postId);
    wx.navigateTo({
      url: 'goodsDetail/goodsDetail?goodsid=' + goodsId
    })
  },

//点击tab切换 
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
})  