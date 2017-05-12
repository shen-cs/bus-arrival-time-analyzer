"""post data to server"""
import requests
import json
from Bus import *

def convertArrival(arrival):
	return { 'time': arrival.arrivedTime.isoformat(), 'interval': arrival.interval }


def convertStop(stop):
	arrivals = []
	for i in xrange(len(stop.arrivals)): 
		arrivals.append(convertArrival(stop.arrivals[i]))
	return { 'stopName': stop.stopName, 'arrivals': arrivals[1:] }

def convertStopList(stopList):
	sList = []
	for i in xrange(len(stopList)):
		sList.append(convertStop(stopList[i]))
	return { 'stopList': sList}

def updateToServer(url, stopList):
	payload = convertStopList(stopList)
	res = requests.put(url, json=payload)
