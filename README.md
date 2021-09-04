# UofT Course Scheduler



## General Description

A WeChat Mini App for UofT students to manage their courses and discuss with their classmates online. It is designed to help students save time when they schedule their courses and get in touch with other students, which is especially useful during the pandemic.

Major functions include: 

- Searching courses offered by the university for the upcoming school year
- Providing course list to generate recommended schedule plan with minimum schedule conflict
- Providing a forum for students to ask questions, dicuss, and read official tips for all the courses offered for the upcoming school year
- Viewing the saved schedule
- Viewing school-related news
- Viewing the map which indicates the locations of the saved courses



## Directory Description

cloudfunctions       // WeChat cloud functions

miniprogram          // Componenets, pages, etc. Frontend

scrape                   // Python scrape



## Compile

Use WeChat Devtools to compile (Ordinary Compilation). 

Test appID can be used, but to use our environment, contact our group members for our appID.

Due to development time limitation, didn't test compatibility with different devices. Please view with iPhone 6/7/8.

When searching courses in schedule module, it uses UofT time table's API, so VPN is needed to access data.

Demonstration video: https://www.youtube.com/watch?v=CzDwzQZwAjo



## Notice

Do not make any modification directly on main branch. Merge other branches on main.

