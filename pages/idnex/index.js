// pages/idnex/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timenow:"",
    city:"",
    weatherdata:[],
    pm:"",
    usercity:"北京",
    error: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  search: function(usercity) {
    console.log('1')
    //当输入框值为空时不进行查询操作
    if (!usercity){
      return
    }
    var that = this
    wx.request({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + usercity+'&output=json&ak=f4U7zUpeb33Bj5NWmuY8NWhKphV35LfH',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        var weatherinfo = res.data
        if(weatherinfo.error == -3){
          that.setData({
            error: weatherinfo.error
          })
          return
        }
        that.setData({
          timenow: weatherinfo.date,
          city: weatherinfo.results[0].currentCity,
          weatherdata: weatherinfo.results[0].weather_data,
          pm: weatherinfo.results[0].pm25,
          error: 0
        })
      },
      fail: function (res) {
       },
      complete: function (res) { },
    })
  },
  getusercity: function (locationParam) {
    var that = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=f4U7zUpeb33Bj5NWmuY8NWhKphV35LfH&location=' + locationParam + '1&output=json&pois=1',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log(res.data.result.addressComponent.city)
        that.setData({
          usercity : res.data.result.addressComponent.city
        })
        that.search(that.data.usercity)
      },
      fail: function (res) {
      },
      complete: function (res) { },
    })
  },
  onLoad: function (options) {
    var lat,lng;
    var that = this
    wx.getLocation({
      success: function(res) {
        lat = res.latitude;
        lng = res.longitude;
        var locationParam = lat + ',' + lng;
        that.getusercity(locationParam)
      },
    })
  },
  cityname: function(e) {
    this.setData({
      usercity: e.detail.value
    })
    this.search(this.data.usercity)
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