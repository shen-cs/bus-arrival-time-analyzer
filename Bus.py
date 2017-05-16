# stop class
class Stop(object):
	"""docstring for ClassName"""
	def __init__(self, id, stopName, lastArrivedTime): 
		self.id = id
		self.stopName = stopName
		self.lastArrivedTime = lastArrivedTime
		self.arrivals = []

	def pushArrival(self, arrival):
		self.arrivals.append(arrival)

	def cleanArrival(self):
		if len(self.arrivals) > 0:
			self.arrivals = self.arrivals[:1];

	def __repr__(self):
		# return self.stopName # encoding problem... later fix it
		return str(self.arrivals[1:])
# arrival class
class Arrival(object):
	def __init__(self, arrivedTime, interval, busName):
		self.arrivedTime = arrivedTime
		self.interval = interval.seconds/60
		self.busName = busName

	def __repr__(self):
		return 'Arrived time: {}, interval: {}'.format(self.arrivedTime, self.interval)
