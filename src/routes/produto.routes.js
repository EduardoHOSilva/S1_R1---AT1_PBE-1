import {Router} from 'express';
import produtoController from "../controllers/produto.controller.js";

const produtoRoutes = Router();

produtoRoutes.post('/produtos/images', uploadImage, produtoController.upload);

export default produtoRoutes;