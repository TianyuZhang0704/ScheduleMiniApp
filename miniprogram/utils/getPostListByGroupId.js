export const getPostListByGroupId = function (code, tag) {
  console.log("code: ", code)
  console.log("tag: ", tag)
  return new Promise((resolve, reject) => {
    if (tag === ''){
      console.log("check 1")
      wx.cloud.callFunction({
        name: 'getPostListByGroupIdAllPosts',
        data: {
          code: code,
        },
        success: res => {
          console.log("getPostListByGroupIdAllPosts 调用成功", res)
          resolve(res);
        },
        fail: res => {
          console.log("getPostListByGroupIdAllPosts 调用失败", res)
          reject(res);
        }
      })
    } else {
      console.log("check 2")
      wx.cloud.callFunction({
        name: 'getPostListByGroupIdTaged',
        data: {
          code: code,
          tag: tag
        },
        success: res => {
          console.log("getPostListByGroupIdTag 调用成功", res)
          resolve(res);
        },
        fail: res => {
          console.log("getPostListByGroupIdTag 调用失败", res)
          reject(res);
        }
      })
    }
  })
}

// function getPostListByGroupId (code, tag){
//   if (tag === ''){
//     wx.cloud.callFunction({
//       name: 'getPostListByGroupIdAllPosts',
//       data: {
//         code: code,
//       },
//       success: res => {
//         console.log("getPostListByGroupIdAllPosts 调用成功", res)
//       },
//       fail: res => {
//         console.log("getPostListByGroupIdAllPosts 调用失败", res)
//       }
//     })
//   } else {
//     wx.cloud.callFunction({
//       name: 'getPostListByGroupIdTaged',
//       data: {
//         code: code,
//         tag: tag
//       },
//       success: res => {
//         console.log("getPostListByGroupIdTag 调用成功", res)
//       },
//       fail: res => {
//         console.log("getPostListByGroupIdTag 调用失败", res)
//       }
//     })
//   }
// } 

// module.exports = {
//   getPostListByGroupId: getPostListByGroupId
// }