import express from 'express';
import dotenv from 'dotenv';
import authRoutes from '../interfaces/routes/authRoutes';

dotenv.config();

const app = express();
app.use(express.json());


app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;