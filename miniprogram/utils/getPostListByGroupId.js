

function getPostListByGroupId (code, tag){
  if (tag === ''){
    wx.cloud.callFunction({
      name: 'getPostListByGroupIdAllPosts',
      data: {
        code: code,
      },
      success: res => {
        console.log("getPostListByGroupIdAllPosts 调用成功", res)
      },
      fail: res => {
        console.log("getPostListByGroupIdAllPosts 调用失败", res)
      }
    })
  } else {
    wx.cloud.callFunction({
      name: 'getPostListByGroupIdTaged',
      data: {
        code: code,
        tag: tag
      },
      success: res => {
        console.log("getPostListByGroupIdTag 调用成功", res)
      },
      fail: res => {
        console.log("getPostListByGroupIdTag 调用失败", res)
      }
    })
  }
} 

module.exports = {
  getPostListByGroupId: getPostListByGroupId
}