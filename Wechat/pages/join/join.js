// pages/join/join.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import api from '../../utils/api';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        phoneNum: "",
        currentLessonIdx: null,
        hiddenmodalput: true, //隐藏Modal
        LessonItems: [],
        courseQuery: ""
    },

    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },

    onJoinLesson: function (e) {
        var lessonIdx = e.currentTarget.dataset.lessonidx;
        this.setData({
            currentLessonIdx: lessonIdx,
            hiddenmodalput: false
        })
    },
    onTapLesson: function (e) {
        console.log(e.currentTarget.dataset.lessonidx);
        Dialog.confirm({
            title: '课程报名',
            message: '确认报名: ' + this.data.LessonItems[e.currentTarget.dataset.lessonidx].name,
        })
            .then(() => {
                // on confirm
                api.joinLesson(
                    wx.getStorageSync('openid'),
                    this.data.LessonItems[e.currentTarget.dataset.lessonidx].id)
                    .then(res => {
                        Toast.success('报名成功');
                    });
                // http.post("joinLesson", {
                //     "Content-Type": "application/www-form-urlencoded"
                // }, {
                //     openid: wx.getStorageSync('openid'),
                //     lessonId: that.data.LessonItems[e.currentTarget.dataset.lessonidx].id
                // }).then(res => {
                //     Toast.success('报名成功');
                // });
            })
            .catch(() => {
                // on cancel
            });

    },
    // confirmM: function () {
    //     console.log("姓名：" + this.data.name + "  电话：" + this.data.phoneNum);
    //     var that = this;
    //     http.get("joinLesson", {
    //         "Content-Type": "application/www-form-urlencoded"
    //     }, {
    //         openid: wx.getStorageSync('openid'),
    //         lessonId: this.data.LessonItems[this.data.currentLessonIdx].id
    //     }).then(res => {
    //         console.log(":res")
    //         that.setData({
    //             hiddenmodalput: true
    //         })
    //         wx.showToast({
    //             title: '已成功报名！',
    //         })
    //     })
    // },
    // cancelM: function () {
    //     this.setData({
    //         hiddenmodalput: true,
    //     })
    // },
    iName: function (e) {
        this.setData({
            name: e.detail.value
        })
    },
    iPhoneNum: function (e) {
        this.setData({
            phoneNum: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        api.getLessonAll()
            .then(res => {
                that.setData({
                    LessonItems: res.data.lessons
                })
            });
        console.log(this.data.LessonItems);
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