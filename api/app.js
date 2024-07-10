import express from 'express';
import cors from 'cors';
import postRoute from './routes/post.route.js';
import testRoute from './routes/test.route.js';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config(); // Charger les variables d'environnement

const app = express();

// Configuration de CORS pour autoriser les requêtes depuis CLIENT_URL
const allowedOrigins = [process.env.CLIENT_URL];
app.use(cors({
  origin: function (origin, callback) {
    // Vérifie si l'origine de la requête fait partie des origines autorisées
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json()); // Permettre à l'application d'envoyer du JSON
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/test', testRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);


app.listen(8800, () => {
  console.log('Server is running!');
});
