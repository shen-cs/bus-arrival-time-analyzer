# encoding: utf-8
from datetime import datetime, timedelta
import time
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from Bus import *
from api import initializeServer, updateToServer 

PHANTOMJS_PATH = '/home/shen/Downloads/phantomjs-2.1.1-linux-x86_64/bin/phantomjs'
BUS_CODE = 11812
DIRECTION = 1
URL = 'http://www.e-bus.gov.taipei/newmap/Tw/Map?rid={}&sec={}'.format(BUS_CODE, DIRECTION)
ID_PREFIX = "#etai_"
BUS_NUM = '15-'+ ('come' if (DIRECTION == 0) else 'go')
BASE_URL = 'http://localhost:8000/api/'
SERVER_POST_URL = BASE_URL + 'post/' + BUS_NUM
SERVER_PUT_URL = BASE_URL + 'update/' + BUS_NUM


driver = webdriver.PhantomJS(executable_path=PHANTOMJS_PATH, service_args=['--ignore-ssl-errors=true'])
# url = raw_input("Please enter the url...\n")
url = URL


stopList = []

def loadPage(url):
  print 'refreshing...'
  global driver, soup, tag
  driver.get(url)
  pageSource = driver.page_source
  soup = BeautifulSoup(pageSource, "lxml")

def initialize():
  print 'Initializing...'
  global stopList, soup
  loadPage(url)
  i = 0
  while True:
     stopId = ID_PREFIX + str(i)
     result = soup.select(stopId)
     if result == []:
       break
     stopName = result[0].parent.parent.select('.b span')[0].get_text()
     stopList.append(Stop(stopId, stopName, None))
     i += 1
  initializeServer(SERVER_POST_URL, stopList)
  time.sleep(3)


def isDifferentBus(stop, busName):
   lastBusName = stop.arrivals[-1].busName
   return lastBusName != busName

def update(stop, busDivList):
   if len(busDivList) != 0:
      busName = busDivList[0].get_text()
      if stop.lastArrivedTime != None:
           interval = datetime.now() - stop.lastArrivedTime
           if isDifferentBus(stop, busName):
             print stop.stopName + ' has arrived.'
             stop.lastArrivedTime = datetime.now()
             stop.pushArrival(Arrival(datetime.now(), interval, busName))
      else:
           print stop.stopName + ' has arrived.'
           stop.lastArrivedTime = datetime.now()
           stop.pushArrival(Arrival(datetime.now(), timedelta(0), busName))

def cleanup():
  for stop in stopList:
    stop.cleanArrival()

def log():
  print 'Uploading to {}...'.format(SERVER_PUT_URL)
  updateToServer(SERVER_PUT_URL, stopList)
  cleanup()
  print 'Finished. Sleeping...'

def run():
    global stopList
    while True:
       try:
           loadPage(url)
           for stop in stopList:
                stopId = stop.id
                result = soup.select(stopId)
                if result == []:
                	break
                stopName = result[0].parent.parent.select('.b span')[0].get_text()
                busDivList = result[0].select('div') # empty list if no bus arrives
                update(stop, busDivList)
           log()
           # updateToServer(SERVER_URL, stopList)
           time.sleep(12)

       except ValueError:
           print "\nSome Error occurs. Please try again.\n"
       except KeyboardInterrupt:
           print '\nexiting...\n'

if __name__ == '__main__':
  initialize()
  run()
