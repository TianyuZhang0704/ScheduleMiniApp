let num = 2

let childReplies = [
  [{
    authorName: "（ΦωΦ）",
    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/ia9w3tFtngQL89icELW6C4pwPgBYrcraZiaHKl9RqnyfsKlZc9aMtoRoDaPDVToEgGdNI1QibUT6FnNyECzL4FribJw/132",
    childReply: [],
    content: "I don't know why, but I think this course is extremely hard to me. Maybe because I am new to programming",
    level: 2,
    parentName: "NonD Infinite Struggle Automata",
    replyTime:  "2021-08-08 22:12:00",
  }],
  [{
    authorName: "（ΦωΦ）",
    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/ia9w3tFtngQL89icELW6C4pwPgBYrcraZiaHKl9RqnyfsKlZc9aMtoRoDaPDVToEgGdNI1QibUT6FnNyECzL4FribJw/132",
    childReply: [],
    content: "I totally agree with YOU!!!!!",
    level: 2,
    parentName: "NonD Infinite Struggle Automata",
    replyTime:  "2021-08-18 22:20:00",
  }],
  [{
    authorName: "（ΦωΦ）",
    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/ia9w3tFtngQL89icELW6C4pwPgBYrcraZiaHKl9RqnyfsKlZc9aMtoRoDaPDVToEgGdNI1QibUT6FnNyECzL4FribJw/132",
    childReply: [],
    content: "Yeh, but I think the course is not too bad",
    level: 2,
    parentName: "NonD Infinite Struggle Automata",
    replyTime:  "2021-08-18 20:00:00",
  }],
  [{
    authorName: "（ΦωΦ）",
    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/ia9w3tFtngQL89icELW6C4pwPgBYrcraZiaHKl9RqnyfsKlZc9aMtoRoDaPDVToEgGdNI1QibUT6FnNyECzL4FribJw/132",
    childReply: [],
    content: "I did really bad laster tem and I am retaking this course.",
    level: 2,
    parentName: "NonD Infinite Struggle Automata",
    replyTime:  "2021-08-18 21:00:00",
  }]
];
let contents = [
  "Yeh, but I think the course is not too bad",
  "I totally agree with YOU!!!!!",
  "I don't know why, but I think this course is extremely hard to me. Maybe because I am new to programming",
  "Good luck"
]

function addCSC108Reply(){
  for (num = 0; num < 4; num++){
   wx.cloud.database().collection('replies').doc(`CSC108H1-reply-${num + 2}`).set({
     data: {
      authorName: "NonD Infinite Struggle Automata",
      avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKbKQ0icJfZtHMppNNPyPqJibhiaNXXWFD8DsOfGObfGFoGydNlkoWKjC76AxXzvM3puiczJDXAq7dEHg/132",
      childReply: childReplies[num],
      content: contents[num],
      level: 1,
      replyNum: childReplies[num].length,
      replyTime: `2021-08-08 ${num + 16}:00:00`
     }
   })
   .then (res => {
     console.log(`CSC108H1-reply-${num} added successfully`, res)
   })
  }
}

module.exports = {
  addCSC108Reply: addCSC108Reply
}