// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let repliesObject = [];
  let result = {};
  const commentId = event.commentId;
  const db = cloud.database();
  const commentObj = await db.collection('comments').doc(commentId).get();
  result.commentObj = commentObj.data;
  const replyIdArray = commentObj.data.replyIds;
  let i;
  for (i = 0; i < replyIdArray.length; i++){
    let replyObj = await db.collection('replies').doc(replyIdArray[i]).get();
    repliesObject.push(replyObj.data);
  }
  result.replyObjects = repliesObject;
  return result;
}