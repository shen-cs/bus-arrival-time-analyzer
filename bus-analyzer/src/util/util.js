export const calcOccurrences = (arrivals) => {
	let data = [];
	for(var i = 0; i < arrivals.length; i++) {
		const interval = arrivals[i].interval;
		let record = data.find((rec) =>  rec.interval === interval);
		if(record) record.occurrences++;
		else data.push({ interval: interval, occurrences: 1});
	}
	return data;
};