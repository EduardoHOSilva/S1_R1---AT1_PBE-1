import express from 'express';
const router = express.Router();
import categoriaController from "../controllers/categoria.controller.js";

router.get('/categorias', categoriaController.selecionarCategoria);
router.post('/categorias', categoriaController.cadastrarCategoria);
router.put('/categorias/:idCategorias', categoriaController.atualizarCategoria);
router.delete('/categorias/:idCategorias', categoriaController.excluirCategoria);

export default categoriaRoutes;