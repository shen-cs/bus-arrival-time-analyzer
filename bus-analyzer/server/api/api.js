import express from 'express';
import bodyParser from 'body-parser';
const apiRoutes = express.Router();
apiRoutes.use(bodyParser.json());
apiRoutes.use(bodyParser.urlencoded({ extended: true }))

apiRoutes.put('/update/:num', (req, res) => {
	console.log('data of bus', req.params.num);
	const stopList = req.body.stopList
	for(var i = 0; i < stopList.length; i++) {
		console.log(stopList[i])
	}
	res.json({ success: true });
})
export default apiRoutes;