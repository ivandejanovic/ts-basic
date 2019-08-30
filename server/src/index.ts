import express from 'express';
import errorhandler from 'errorhandler';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import path from 'path';
import Router from './routes/Router';

const app: express.Application = express();

const port = 8080;

// all environments
app.set('port', process.env.PORT || port);
app.set('views', path.join(__dirname, '/../../views'));
app.set('view engine', 'pug');
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, '/../../public')));

// development only
if (app.get('env') === 'development') {
	app.use(errorhandler());
	app.locals.pretty = true;
}

const router = new Router(app);

app.listen(port, () => {
	console.log(`Node basic server listening on port ${app.get('port')} in mode ${app.get('env')}`);
});

export default app;
