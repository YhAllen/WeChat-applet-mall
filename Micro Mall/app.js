//app.js
App({
  cart: {
    key: "cart",
    ref: "",
    add: function (p) {
      var re = false;
      if (p.supplyno && p.price && p.size && p.name && p.num) {
        var dic = wx.getStorageSync(this.key) || {};
        if (p.supplyno in dic) {
          dic[p.supplyno].num += p.num;
        } else {
          dic[p.supplyno] = { name: p.name, price: p.price, size: p.size, num: p.num, brand: p.brand }
        }
        wx.setStorageSync(this.key, dic);
        re = true;
      }
      return re;
    },
    exist: function (sno) {
      var re = false;
      var dic = wx.getStorageSync(this.key) || {};
      if (sno in dic) {
        re = true;
      }
      return re;
    },
    remove: function (sno) {
      var dic = wx.getStorageSync(this.key) || {};
      if (sno in dic) {
        delete dic[sno];
        wx.setStorageSync(this.key, dic);
      }
    },
    getNum: function () {
      var n = 0;
      var dic = wx.getStorageSync(this.key) || {}
      for (var i in dic) {
        n += dic[i].num;
      }
      return n;
    },
    num: function (sno, n) {
      var dic = wx.getStorageSync(this.key) || {};
      if (sno in dic) {
        if (n > 0) {
          dic[sno].num = n;
        } else {
          delete dic[sno];
        }
        wx.setStorageSync(this.key, dic);
      }
    },
    getList: function () {
      var list = [];
      var dic = wx.getStorageSync(this.key);
      for (var p in dic) {
        list.push({ supplyno: p, name: dic[p].name, price: dic[p].price, size: dic[p].size, num: dic[p].num, brand: dic[p].brand });
      }
      return list;
    },
    clear: function () {
      wx.removeStorageSync(this.key);
    }
  },



  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})