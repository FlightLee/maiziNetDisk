// miniprogram/pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
        wx.getSetting({
          success: (res) => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  this.setData({
                    avatarUrl: res.userInfo.avatarUrl,
                    userInfo: res.userInfo
                  })
                  //移除登录按钮
                }
              })
            }
          }
        })
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
       // wx.login() //重新登录
      }
    })
 
  },
  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
     
      wx.showToast({
        title: e.detail.userInfo.nickName,
        icon: 'success'
      })
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }else
    {
      let that=e;
      wx.login({
        success(res)
        {
          if(res.code)
          {
            wx.request({
              url: 'http://local:6657/login',
              data:{
                js_code: res.code,
                userInfo: e.detail.userInfo
              },
              success:(res)=>{
                if(res.code===1)
                {
                  //成功
                }
              }
            })
          }
        }
      })
    }
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