import requests
import time
from bs4 import BeautifulSoup
from selenium import webdriver

driver = webdriver.PhantomJS(executable_path='/home/shen/Downloads/phantomjs-2.1.1-linux-x86_64/bin/phantomjs', service_args=['--ignore-ssl-errors=true'])
url = raw_input("Please enter the url...\n")
BUS_NUM = 64
ID_PREFIX = "#etai_"
# tag = None
# pageSource = None
# soup = None
def loadPage(url):
	global driver, soup, tag
	driver.get(url)
	pageSource = driver.page_source
	soup = BeautifulSoup(pageSource, "lxml")
	print 'refreshing...'
	# tag = raw_input('Please enter tag(. for class, # for id)...\n')
	
while True:
   try:
       loadPage(url)
       for i in xrange(BUS_NUM):
            busId = ID_PREFIX + str(i)
            result = soup.select(busId)
            if result == []:
            	break
            stopName = result[0].parent.parent.select('.b span')[0].get_text()
            print stopName, busId, result[0].get_text()
       # for num in soup.select('{}'.format(tag)):
       #    print num.get_text()
          # print num.find_next().get_text()
       time.sleep(60)

   except ValueError:
       print "\nSome Error occurs. Please try again.\n"
       tag = raw_input('Please enter tag(. for class, # for id)...\n')
