import express from 'express';
import produtoRoutes from './routes/produto.routes.js';
import produtoRoutes from './routes/produto.routes.js';
import path from 'path'
import 'dotenv/config';

const app = express();

app.use ('/', produtoRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.SERVER_PORT}`);
});