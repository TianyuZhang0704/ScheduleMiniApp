// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const _=  db.command;
  let topPosts;
  const info = new Object();
  topPosts = await db.collection('posts')
  .where(_.and([
    {courseCode: event.code.split('-')[0]},
    {isTop: true}]))
  .orderBy("commentNum", "desc")
  .get()

  let restData = await db.collection('posts')
  .where(_.and([
    {courseCode: event.code.split('-')[0]},
    {isTop: false}]))
  .orderBy("commentNum", "desc")
  .get()

  if(Array.isArray(topPosts.data)){
    info.data = [].concat(topPosts.data, restData.data);
  } else{
    let tmp = [];
    tmp.push(topPosts.data);
    info.data = [].concat(tmp, restData.data)
  }
  let i;
  for (i = 0; i < info.data.length; i++){
    info.data[i].tags = info.data[i].tags.split(',');
  }
  return info;
} 
