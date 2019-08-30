import axios from 'axios';
import express from 'express';

export default class Router {
	constructor(app: express.Application) {
		this.registerEndpoints(app);
	}

	private registerEndpoints(app: express.Application): void {
		app.get('/', (req, res) => {
			res.render('home', {});
		});

		app.get('/ajax', async (req, res, next) => {
			try {
				const axiosResponse = await axios({
					url: 'www.google.com',
					method: 'get',
					headers: {
						'Cache-Control': 'no-cache',
						'Content-Type': 'application/json',
					},
				});
				if (axiosResponse.status === 200) res.send(axiosResponse.data);
				else res.status(400).send('error fetching data');
			} catch {
				res.status(400).send('error fetching data');
			}
		});

		// 404
		app.use((req, res) => {
			res.status(404);

			if (req.accepts('html')) {
				res.send('<h2>Page not found</h2>');
			} else if (req.accepts('json')) {
				res.json({ error: 'Not found' });
			} else {
				res.type('txt');
				res.send('Resource not found');
			}
		});
	}
}
