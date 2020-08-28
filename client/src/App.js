import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { saveAs } from 'file-saver';

function App() {
	const [name, setname] = useState('');
	const [heading, setheading] = useState('');
	const [receiptId, setreceiptId] = useState(0);
	const [price1, setprice1] = useState(0);
	const [price2, setprice2] = useState(0);

	const handleName = (e) => setname(e.target.value);
	const handleReceiptId = (e) => setreceiptId(e.target.value);
	const handleprice1 = (e) => setprice1(e.target.value);
	const handleprice2 = (e) => setprice2(e.target.value);

	const downloadPdf = () => {
		setheading('Processing can take upto 6 seconds. Please Wait...');
		axios
			.post('http://localhost:5000/create-pdf', { name, receiptId, price1, price2 })
			.then(() => {
				axios.get('http://localhost:5000/fetch-pdf', { responseType: 'blob' }).then((res) => {
					console.log("fetch:",res);
					const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

					saveAs(pdfBlob, 'pdf_generated_from_react.pdf');
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div className="App">
			<h1>Enter Details to Recieve your Copy :</h1>
			<h4>{heading}</h4>
			<input type="text" placeholder="Name" name="name" onChange={handleName} />
			<input type="number" placeholder="Receipt Id" name="receiptId" onChange={handleReceiptId} />
			<input type="number" placeholder="Price 1" name="price1" onChange={handleprice1} />
			<input type="number" placeholder="Price 2" name="price2" onChange={handleprice2} />
			<br />
			<button onClick={downloadPdf}>Download Pdf</button>
		</div>
	);
}

export default App;
