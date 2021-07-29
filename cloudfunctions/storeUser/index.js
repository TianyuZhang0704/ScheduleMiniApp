// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({

  env: cloud.DYNAMIC_CURRENT_ENV
})

// 数据库中插入user with openid
exports.main = async (event, context, openid, avatarUrl, nickName) => {
  // 引用database
  const db = cloud.database()

  // 查询openid是否存在于database
  const users = await db.collection('users')
  await db.collection('users').doc(openid).get({
    // 若此用户已经存在，则在console里打印改user的信息
    success: function (res) {
      console.log(res)
    },
    // 若不存在于数据库则存入数据库
    fail: function (err) {
      return await db.collection('location').add({
        data: {
          openId: openid,
          avatarUrl: avatarUrl,
          nickName: nickName
        }
      })
    }
  }
  )
  }



