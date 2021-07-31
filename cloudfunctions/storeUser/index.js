// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({

  env: cloud.DYNAMIC_CURRENT_ENV
})

// 数据库中插入user with openid
exports.main = async (event, context) => {
  // 初始化数据库
  const db = cloud.database();

  // 查询
  db.collection("users").doc("doc-id").set({
    data: {
      openId: event.userInfo.openId,
      nickName: event.nickName,
      avatarUrl: event.avatarUrl,
      saveSchedules: []
    }
  }).then(res => {
    console.log("添加成功", res)
  }).catch(res => {
    console.log("添加失败", res)
  })
}
