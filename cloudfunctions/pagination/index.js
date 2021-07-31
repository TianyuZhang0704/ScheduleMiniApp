// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cloud1-3gah0cd161270d1d"
})

// 云函数入口函数
exports.main = async (event, context) => {
  const skipPost = (event.pageNum - 1) * event.pageSize;
  const postNum = event.pageSize;
  // initalization
  const matchingCourses = cloud.database().collection("courseCodeName")
  .where({
    _id: cloud.database().RegExp({
      regexp: event.code + '.*',
      options: 'i'})
  })
  // .where({
  //   postNum: cloud.database().command.gte(0)
  // })
  .orderBy("postNum", "desc")
  .skip(skipPost)
  .limit(postNum)
  .get()
 return matchingCourses;
}