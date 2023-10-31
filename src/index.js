import express from 'express';
import morgan from 'morgan';
import { engine as handlebars } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import route from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//Thay đổi path name
app.use(express.static(path.join(__dirname, 'public')));

//Parse body request
app.use(
    express.urlencoded({
        extended: true,
    })
);

//Parse Frameworks JS(fetch, axios,...)
app.use(express.json());

//HTTP Logger
// app.use(morgan("combined"));

//Template engines
app.engine('hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Route app
route(app);

app.listen(3000);
