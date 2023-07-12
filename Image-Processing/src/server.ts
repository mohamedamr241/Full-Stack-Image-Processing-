import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './Routes/api';
import path from 'path';

const app = express();
const port = 8000;
const host = 'localhost';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// start cors
app.use(cors());

route.use(express.static('views'));
app.use('/main', route);

app.listen(port, listening);
function listening() {
  console.log(`server running on localhost: ${port}`);
  console.log(`Server is running on http://${host}:${port}/main`);
}
export default app;
