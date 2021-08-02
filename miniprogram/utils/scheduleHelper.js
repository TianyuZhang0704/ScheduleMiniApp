
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
         let meetings = res.data[course].meetings;
         let offerings = []
         let class_;
         for (class_ in meetings){
           let ref = {};
           let day;
           let sche = meetings[class_].schedule;
           for (day in sche){
              let meetingDay = sche[day].meetingDay;
              let startTime = sche[day].meetingStartTime.split(':')[0];
              let endTime = sche[day].meetingEndTime.split(':')[0];
              ref[meetingDay] = [parseInt(startTime, 10), parseInt(endTime, 10)]
              // console.log(sche[day].meetingDay, parseInt(startTime, 10), parseInt(endTime, 10));
           }
           offerings.push(ref);
         }

        wx.cloud.database().collection('courses').doc(course).set({
          data : {
            section: res.data[course].section,
            code: code,
            courseTitle: res.data[course].courseTitle,
            courseDescription: res.data[course].courseDescription,
            prerequisite: res.data[course].prerequisite,
            corequisite: res.data[course].corequisite,
            meetings: meetings,
            offerings: offerings,
            exclusion: res.data[course].exclusion
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