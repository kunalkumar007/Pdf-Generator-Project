const express = require('express');
const path = require('path');
const cors = require('cors');
const pdf = require('html-pdf');
const pdfTemplate = require('./documents');

// initialize express
const app = express();
const PORT = process.env.PORT || 5000;
// utility define.
app.use(cors());
app.use(express.json());

// serve static assets
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*',(req,res)=>{
		res.sendFile(path.resolve(__dirname,'client','build','index.html'))
	})
	
}
// routes.
app.post('/create-pdf', (req, res) => {
	console.log("create:",req.body);
	pdf.create(pdfTemplate(req.body), { timeout: 60000 }).toFile('result.pdf', (err) => {
		if (err) return res.send(Promise.reject(err));
		res.send(Promise.resolve());
	});
});

app.get('/fetch-pdf', (req, res) => {
	res.sendFile(`${__dirname}/result.pdf`);
});

// listening at server.
app.listen(PORT, console.log('server Connected at PORT 5000'));
