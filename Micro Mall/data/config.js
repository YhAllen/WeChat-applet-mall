/*


未完成。。。


备注
count: 返回结果数量
apiList: api列表
topic1：专题1
topic2：专题2
topic3：专题3
goodsDetail：商品详情
orders：全部订单
unpaid: 待付款
undelivered: 待发货
delivered: 已发货
bannerList: 首页轮播图列表列表
*/

var url = 'http://t.yushu.im/v2/movie/top250';

module.exports = {
  apiList:{
    topic1: 'http://t.yushu.im/v2/movie/in_theaters',
    topic2: 'http://t.yushu.im/v2/movie/coming_soon',
    topic3: 'http://t.yushu.im/v2/movie/top250',
    goodsDetail: 'http://t.yushu.im/v2/movie/subject/',
    orders: 'http://t.yushu.im/v2/movie/top250?start=0&count=5',
    unpaid: 'http://t.yushu.im/v2/movie/top250?start=0&count=1',
    undelivered: 'http://t.yushu.im/v2/movie/top250?start=0&count=1',
    delivered: 'http://t.yushu.im/v2/movie/top250?start=0&count=1'
  },
  bannerList:[
    { type: 'goods', id: '26683290', imgUrl: url + '/subjects[0]/images/medium' },
    { type: 'goods', id: '25793398', imgUrl: url + '/subjects[1]/images/medium' },
    { type: 'goods', id: '26630781', imgUrl: url + '/subjects[2]/images/medium' },
    { type: 'goods', id: '26415200', imgUrl: url + '/subjects[3]/images/medium' },
    { type: 'goods', id: '3025375', imgUrl: url + '/subjects[4]/images/medium' }
  ]
}