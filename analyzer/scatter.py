import requests
import json
import datetime
from dateutil import parser
import matplotlib.pyplot as plt
import numpy as np

# SERVER_URL = 'http://localhost:8000/api/15-1/'
SERVER_URL = 'http://163.28.17.108:8000/api/15-1/'
STOPNAME = raw_input('Enter stop name...\n')
FETCH_URL = SERVER_URL + STOPNAME
THRESHOLD = 100
START_TIME = raw_input('Entet start time...\n')
END_TIME = raw_input('Enter end time...\n')

def fetchData():
	req = requests.get(FETCH_URL)
	return json.loads(req.text)

def parseTime(time):
	d = parser.parse(time)
	return datetime.time(d.hour, d.minute)

def inTime(time):
	t = parseTime(time)
	return parseTime(START_TIME) < t and t < parseTime(END_TIME)

def calcOccurrences(arrivals):
	occurDict = {'intervals': [], 'occurrences': []} #{intervals:[interval], occurrences:[occurrences]}
	for arrival in arrivals:
		if arrival['interval'] > THRESHOLD or not inTime(arrival['time']):
			continue
		if arrival['interval'] in occurDict['intervals']:

			idx = occurDict['intervals'].index(arrival['interval'])
			occurDict['occurrences'][idx] += 1
		else:
			occurDict['intervals'].append(arrival['interval'])
			occurDict['occurrences'].append(1)
	return occurDict
if __name__ == '__main__':
	data = fetchData()
	occurDict = calcOccurrences(data[0]['arrivals'])
	plt.plot(occurDict['intervals'], occurDict['occurrences'], 'bs')
	plt.ylim(ymin=0)
	plt.show()