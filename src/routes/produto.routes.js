import express from 'express';
const router = express.Router();
import produtoController from "../controllers/produto.controller.js";
import uploadImage from '../middlewares/uploadimages.js';

router.get('/produtos', produtoController.selecionarProduto);
router.post('/produtos', uploadImage, produtoController.cadastrarProduto);
router.put('/produtos', uploadImage, produtoController.atualizarProduto);
router.delete('/produtos', produtoController.excluirProduto);

export default router;