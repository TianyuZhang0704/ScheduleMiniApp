// generate databse 

function generateMAT137Posts(){
  const num = 4;
    const MAT137_commentIds =[["gsdagasdgasga","asdgasdgasdg","hhdshasdasd"],["gsdagasdgasga","asdgasdgasdg"],[],["gsdagasdgasga"]];
    const MAT137_contents = [
      "I am really scared about taking MAT137. I only got a 78 in high school calc because i didnt study much. i found the beginning pretty straight forward, but the optimization and vectors unit was really really hard for me. am i screwed when i have to take this course.",
      "Hello all. I am taking MAT137 in the fall and I am a little concerned because I did not like math so much in the past. Can anyone share some advices on how to do well on this course, or anything to pay special attention to, etc? Should I focus on understanding the lectures? Doing a lot of problem sets?",
      "I know a lot of first year students are going to come on here asking about whether to take Mat137 or Mat157 (because when I was in first year that’s exactly what I did ;P ) and I wanted to offer a different perspective as a student on the internet—so make of that what you will.",
      "I'll be in CS this Fall, and i'm fairly mathematically wired. I can understand concepts easily. What are the differences between the two, and what would be the better choice?"];
    const MAT137_isTop = [true, false, false, false];
    const MAT137_postTime = ["2021-03-31 16:02:06", "2021-07-01 16:07:01","2021-06-10 18:42:06","2021-05-04 19:02:36"];
    const MAT137_tags = [["Question"], ["Question"], ["Question"], ["Question"]];
    const MAT137_titles = ["How hard is MAT137 compared to high school?", "Suggestions on how to do well in MAT137", 
    "What I Wish I Knew About Mat137 and Mat157 12 months ago...","How hard is MAT137 compared to MAT135"];
    const i = 0 ;
    for (let i = 0; i < num; i++){
      wx.cloud.database().collection("posts").add({
        data: {
          _id: `CSC237Y1-${i}`,
          courseCode: "  MAT137Y1",
          authorName: "（ΦωΦ）",
          avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/ia9w3tFtngQL89icELW6C4pwPgBYrcraZiaHKl9RqnyfsKlZc9aMtoRoDaPDVToEgGdNI1QibUT6FnNyECzL4FribJw/132",
          commentId: MAT137_commentIds[i],
          commentNum: MAT137_commentIds[i].length,
          content: MAT137_contents[i],
          isTop: MAT137_isTop[i],
          postTime: MAT137_postTime[i],
          tags: MAT137_tags[i],
          title: MAT137_titles[i]
        },
        success: res => {
          console.log("添加成功", res);
        },
        fail: res => {
          console.log("添加失败", res);
        }
      })
    }
}

function generateCSC108Posts(){
  const num = 6;
  const CSC108_commentIds =[
    ["gsdagasdgasga","asdgasdgasdg","hhdshasdasd"],
    ["gsdagasdgasga","asdgasdgasdg"],
    [],
    ["gsdagasdgasga"],
    ["gsdagasdgasga","asdgasdgasdg","hhdshasdasd"],
    ["gsdagasdgasga","asdgasdgasdg"]];
  const CSC108_commentNums = [3,2,0,1,3,2];
  const CSC108_contents = [
    "Uhh Ive fallen a little behind in the prepare exercises and I wanted to know if anyone who's been successful in this course (or not) knows any efficient and effective ways to note take? I've never taken a CSC course before so the note taking is a little different for me than usual.",
    "I have no previous programming experience but I genuinely would like to learn. Is the course any more difficult for someone like me without experience?",
    "Took csc108 in Fall 2020 and it was my lowest mark in all of my courses. It was my first ever programming course and I really struggled (procrastinating on assignments were some factors why I did bad). I wanna try and do a cs minor and I was wondering if it’s worth it to retake csc108 to improve my understanding (Retaking could also boost up my cgpa - from 3.6ish to 3.7ish).",
    "I am currently in CSC108 and studying for the midterm. I was wondering how to best study for the exam? Is the textbook helpful? Is it just short answer or are there multiple choice? If so what are the mcqs like? Thanks.",
    "I didn’t see a post for this but I know a lot of people are waiting for the mark to come out!!!",
    "Hi guys, I want to take CSC108 but I’m not sure if I can use my Chromebook for the course, I have an iPad is that sufficient?"
  ];
  const CSC108_isTop = [true, false, false, false,false,false];
  const CSC108_postTime = [
    "2021-03-31 16:02:06", "2021-07-01 16:07:01",
    "2021-06-10 18:42:06","2021-05-04 19:02:36",
    "2021-07-01 20:07:01","2021-06-10 21:09:06",
    "2021-05-04 08:02:30"];
  const CSC108_tags = [["Question"], ["Question","Find Study Group"], ["Question"], ["Question"], ["Question"], ["Question"]];
  const CSC108_titles = [
    "How to take notes in CSC108?",
    "Any CSC108 Group chats? Tips to doing well?",
    "Should I retake CSC108?",
    "CSC108 Midterm Questions",
    "CSC108 is out !!!!!!!!!!!",
    "Can I use a Chromebook or iPad for csc108?"
  ];
  const i = 0 ;
  for (let i = 0; i < num; i++){
    wx.cloud.database().collection("posts").add({
      data: {
        _id: `CSC108H1-${i}`,
        courseCode: "  CSC108H1",
        authorName: "（ΦωΦ）",
        avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/ia9w3tFtngQL89icELW6C4pwPgBYrcraZiaHKl9RqnyfsKlZc9aMtoRoDaPDVToEgGdNI1QibUT6FnNyECzL4FribJw/132",
        commentId: CSC108_commentIds[i],
        commentNum: CSC108_commentNums[i],
        content: CSC108_contents[i],
        isTop: CSC108_isTop[i],
        postTime: CSC108_postTime[i],
        tags: CSC108_tags[i],
        title: CSC108_titles[i]
      },
      success: res => {
        console.log("添加成功", res);
      },
      fail: res => {
        console.log("添加失败", res);
      }
    })
  }
}


module.exports = {
  generateMAT137Posts: generateMAT137Posts,
  generateCSC108Posts: generateCSC108Posts, 
}