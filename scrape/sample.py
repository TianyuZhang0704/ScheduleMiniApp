import time

from bs4 import BeautifulSoup
import requests

# with open('home.html', 'r') as html_file:
#     content = html_file.read()
#     soup = BeautifulSoup(content, 'lxml')
#     course_cards = soup.find_all('div', class_='card')
#     for course in course_cards:
#         course_name = course.h5.text
#         course_price = course.a.text.split()[-1]
#         print(f'{course_name} costs {course_price}')

print('Put some skills that you are not familiar with')
unfamiliar_skill = input('>')
print(f'Filtering out {unfamiliar_skill}')
def find_jobs():
    html_text = requests.get(
        'https://www.timesjobs.com/candidate/job-search.html?searchType=personalizedSearch&from=submit&txtKeywords=python&txtLocation=').text
    soup = BeautifulSoup(html_text, 'lxml')
    jobs = soup.find_all('li', class_='clearfix job-bx wht-shd-bx')
    for job in jobs:
        publish_date = job.find('span', class_='sim-posted').text.strip()

        if 'few' in publish_date:
            more_info = job.header.h2.a['href']
            company_name = job.find('h3').text.strip()
            skills = job.find('span', class_='srp-skills').text.replace(' ', '').strip()
            if unfamiliar_skill not in skills:
                print(f'Company Name: {company_name}')
                print(f'Required Skills: {skills}')
                print(f'More info: {more_info}')
                print('')


if __name__ == '__main__':
    while True:
        find_jobs()
        time_wait = 10
        print(f'Waiting {time_wait} minutes ...')
        time.sleep(time_wait * 60)
