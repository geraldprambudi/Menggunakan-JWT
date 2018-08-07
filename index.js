const express = require('express');
const jwt     = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
	res.json({
		message: "Welcome To The API"
	});
});

app.post('/api/posts', verifyToken, (req, res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if(err) {
			res.sendStatus(403);
		} else {
			res.json({
			message: "post created",
			authData
			});
		} 
	});	
});

app.post('/api/login', (req, res) => {
	// Mock User
	const user = {
		id: 1,
		username: 'gerald',
		email: 'geraldprambudi@gmail.com'
	}

	jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
		res.json({
			token
		})
	});
});

// Verify Token
function verifyToken(req, res, next) {
	// get auth header value
	const bearerHeader = req.headers['authorization'];

	if(typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		res.sendStatus(403);
	}
}

app.listen(5000, () => console.log("server started on port 5000"));