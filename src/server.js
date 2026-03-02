import express from 'express';
import categoriaRoutes from './routes/categoria.routes.js';
import produtoRoutes from './routes/produto.routes.js';
import path from 'path'
import 'dotenv/config';

const app = express();

app.use ('/', categoriaRoutes);
app.use ('/', produtoRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.SERVER_PORT}`);
});