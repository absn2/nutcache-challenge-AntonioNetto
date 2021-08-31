import { errors } from 'celebrate';
import express from 'express';
import routes from './routes/routes';

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(errors());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
