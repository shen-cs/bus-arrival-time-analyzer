# stop class
class Stop(object):
	"""docstring for ClassName"""
	def __init__(self, id, stopName, lastArrivedTime): 
		self.id = id
		self.stopName = stopName
		self.lastArrivedTime = lastArrivedTime
		self.arrivals = []
		self.toUpdate = True # whether update to server

	def pushArrival(self, arrival):
		self.arrivals.append(arrival)
		self.toUpdate = True

	def getLastArrivedBusName(self):
		return self.arrivals[-1].busName

	def noArrival(self):
		return len(self.arrivals) == 1 and self.arrivals[0].interval != -1 # not first arrival and no new arrival

	def cleanArrival(self):
		if len(self.arrivals) > 0:
			# self.arrivals = self.arrivals[:1] # leave 0, upload 0 if no new arrival
			self.arrivals = self.arrivals[-1:]

	def __repr__(self):
		# return self.stopName # encoding problem... later fix it
		# return str(self.arrivals[1:])
		return str(self.arrivals)
# arrival class
class Arrival(object):
	def __init__(self, arrivedTime, interval, busName):
		self.arrivedTime = arrivedTime
		if type(interval) != int:
			self.interval = interval.seconds/60 
		else:
			self.interval = -1
		self.busName = busName

	def __repr__(self):
		return 'Arrived time: {}, interval: {}'.format(self.arrivedTime, self.interval)
