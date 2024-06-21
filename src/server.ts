import express from 'express';
import mongoose from 'mongoose';
import clientRoutes from './routes/clientRoutes';
import setupSwagger from './utils/swagger';

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/clientdb';

app.use(express.json());
app.use('/api/v1/clients', clientRoutes);

setupSwagger(app);

mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Connection error', error);
});
