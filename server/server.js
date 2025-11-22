import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import analyzeRouter from './routes/analyze.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/analyze', analyzeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Mock server listening on http://localhost:${port}`);
});
