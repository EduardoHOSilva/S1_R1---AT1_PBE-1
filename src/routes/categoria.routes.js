import express from 'express';
const router = express.Router();
import categoriaController from "../controllers/categoria.controller.js";

router.get('/categorias', categoriaController.selecionarCategoria);
router.post('/categorias', categoriaController.cadastrarCategoria);
router.put('/categorias/id:categorias', categoriaController.atualizarCategoria);
router.delete('/categorias', categoriaController.excluirCategoria);

export default categoriaRoutes;