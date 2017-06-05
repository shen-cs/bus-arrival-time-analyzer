"""post data to server"""
import requests
from Bus import *

def convertArrival(arrival):
	return { 'time': arrival.arrivedTime.isoformat(), 'interval': arrival.interval }

# isInit: if to initialize, arrivals is empty
def convertStop(stop, isInit):
	arrivals = []
	for arrival in stop.arrivals: 
		arrivals.append(convertArrival(arrival))
	return { 'stopName': stop.stopName, 'arrivals': arrivals if isInit else arrivals[-1:] }
	

def convertStopList(stopList, isInit):
	sList = []
	for stop in stopList:
		if stop.toUpdate:
			sList.append(convertStop(stop, isInit))
	return { 'stopList': sList}

def initializeServer(url, stopList):
	payload = convertStopList(stopList, True)
	res = requests.post(url, json=payload)

def updateToServer(url, stopList):
	payload = convertStopList(stopList, False)
	res = requests.put(url, json=payload)
