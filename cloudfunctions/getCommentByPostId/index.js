// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const postId = event.postId;
  const db = cloud.database();
  const postsObj = await db.collection('posts').doc(postId).get();
  postsObj.data.tags = postsObj.data.tags.split('-');
  postsObj.data.commentObjs = [];
  let i;
  for (i = 0; i < postsObj.data.commentId.length; i++){
    let comId = postsObj.data.commentId[i];
    let commentInfo = await db.collection('comments').doc(comId).get();
    postsObj.data.commentObjs.push(commentInfo.data);
  }
  return postsObj;
}