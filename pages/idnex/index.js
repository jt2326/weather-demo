// pages/idnex/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //查询到的城市
    city:"",
    //天气信息
    weatherdata:[],
    //PM2.5
    pm:"",
    //用户选择的城市
    usercity:"北京",
    //获取天气信息的状况，用于页面条件渲染，当查询不到用户输入的城市时显示“您查询的城市不存在”
    error: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //根据用户定位城市活着选择城市进行查询
  search: function(usercity) {
    //当输入框值为空（用户查询城市为空）时不进行查询操作
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
            //获取结果的error error为0获取数据正常
            error: weatherinfo.error
          })
          return
        }
        that.setData({
          //
          timenow: weatherinfo.date,
          //查询到的城市
          city: weatherinfo.results[0].currentCity,
          //对应的天气信息
          weatherdata: weatherinfo.results[0].weather_data,
          //PM2.5值
          pm: weatherinfo.results[0].pm25,
          error: 0
        })
      },
      fail: function (res) {
       },
      complete: function (res) { },
    })
  },
  //获取用户定位城市
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
        lat = res.latitude;//获取维度
        lng = res.longitude;//获取经度
        var locationParam = lat + ',' + lng;
        that.getusercity(locationParam)//根据经纬度定位城市用到了百度地图提供的api
      },
    })
  },
  //获取用户输入框的值
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