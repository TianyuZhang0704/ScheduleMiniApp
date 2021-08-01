
function loadDataBase(input){
  for (let i = 0; i < input.length; i++){ 
    const course = input[i];
    const code = input[i].split('-')[0];

    wx.request({
      url: 'https://timetable.iit.artsci.utoronto.ca/api/20219/courses',
      data: { 
        code: code
      },
      header: { 'content-type': 'application/json' // 默认值 
      }, 
      success (res) {
        console.log(res);
        let key = Object.keys(res.data)[0];
        let meetings = res.data[key].meetings;
        let offerings = new Object();
        let sessions = Object.keys(meetings); 
        for (let i = 0; i < sessions.length; i++){
          offerings.session = [];
          let weekdays = meetings[sessions[i]]["schedule"];
          for (let j = 0; j < Object.keys(weekdays); j++){
            let meetingDay = Object.keys(weekdays)[i]
            offerings.
          }
        }




        wx.cloud.database().collection('courses').doc(course).set({
          data : {
            section: res.data[key].section,
            code: code,
            courseTitle: res.data[key].courseTitle,
            courseDescription: res.data[key].courseDescription,
            prerequisite: res.data[key].prerequisite,
            corequisite: res.data[key].corequisite,
            meetings: meetings,
            offerings: offerings,
            exclusion: res.data[key].exclusion
          }
        })
      },
      fail (err) { 
        console.log('fail', res);
      }
  })
  }
}

module.exports = {
  loadDataBase: loadDataBase
}