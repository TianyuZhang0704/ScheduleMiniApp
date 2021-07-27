from bs4 import BeautifulSoup
import requests
import time
import csv


# find all course code in course finder
file = open('courseName.csv', 'w')
writer = csv.writer(file)

# write header rows
writer.writerow(['Course Code','Course Name'])

def make_soup(url):
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'lxml')
    return soup


for num in range(0, 167):
    courses = make_soup(
        f'https://artsci.calendar.utoronto.ca/search-courses?course_keyword=&field_section_value=All&field_prerequisite'
        f'_value=&field_breadth_requirements_value=All&field_distribution_requirements_value=All&page={num}')\
        .find_all('div', class_='views-row')
    for course in courses:
        course_section = course.find('p', class_='js-views-accordion-group-header')
        if course_section is not None:
            writer.writerow(course_section.text.split(' - '))
    time.sleep(60)
file.close()




# scrape info from timetable
