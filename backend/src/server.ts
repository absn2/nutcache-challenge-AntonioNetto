import { errors } from 'celebrate';
import express from 'express';
import routes from './routes/routes';
import cors from 'cors'

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(errors());
app.use(cors());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
