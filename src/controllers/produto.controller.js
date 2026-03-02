const {produtoModel} = require('../models/produto.model.js');

const produtoController = {
    selecionarProduto: async (req, res) => {
        try {
            const resultado = await produtoModel.selecionarProdutos();
            if (resultado.length === 0) {
                return res.status(200).json({message: 'A tabela selecionada não contem dados'});
            }
            res.status (200).json({message: 'Resultado dos dados listados', data: resultado});

        }catch (error) {

            console.error(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
        }
    },

    cadastrarProduto: async (req, res) => {
        try{
            const {nomeProduto, idCategoria} = req.body;

            const valorProduto = Number(req.body.valorProduto);

            const vinculoImagem = '/uploads/images/${req.file.filename}';

            if(!nomeProduto || !valorProduto || !idCategoria || typeof valorProduto !== 'number' || typeof nomeProduto !== 'string') {

                return res.status(400).json({message: 'Dados inválidos. Verifique nome, valor e categoria.'});
            }
            const resultado = await produtoModel.cadastrarProdutos(idCategoria, nomeProduto, valorProduto, vinculoImagem);

            if(resultado.affectedRows ===1 && resultado.insertId != 0) {

             res.status(201).json({ message: 'Registro incluido com sucesso', result: resultado});
             
            }else{
                throw new Error('Ocorreu um erro ao incluir o registro');
            }
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor!', errorMessage: error.message});
        }
    },

    atualizarProduto: async (req, res) => {
        try{
            const idProduto = Number(req.params.idProduto);
            let {nomeProduto, valorProduto} = req.body;
            
            nomeProduto = descricao.trim();

            if(!idProduto || !nomeProduto || typeof idProduto !== 'number' || !isNaN(nomeProduto) || !valorProduto || typeof valorProduto !== 'number') {

             return res.status(400).json({message: 'Verifique os dados enviados e tente novamente'});

            }

            const produtoAtual = await produtoModel.selecionarProdutos(idProduto);
            if(produtoAtual.length === 0) {
                throw new Error('Registro não localizado');
            } 
            const novoNome = nome ?? produtoAtual[0].nome;
            const novoValor = valor ?? produtoAtual[0].valor;

            const resultado = await produtoModel.alterarProduto(idProduto, novoNome, novoValor);

            if(resultado.changedRows === 0) {
                throw new Error('Ocorreu um erro ao incluir o registro');
            } 

            res.status(200).json({ message: 'Registro atualizado com sucesso', data: resultado});
             
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor!', errorMessage: error.message});
        }
    },

    excluirProduto: async (req, res) => {
        try{
            const id = Number(req.params.idProduto);
            
            if(!id || !Number.isInteger(id)) {

             return res.status(400).json({message: 'Forneça um ID válido.'});

            }

            const produtoSelecionado = await produtoModel.selecionarProdutos(id);

            if(produtoSelecionado.length === 0) {
                throw new Error('Registro não localizado');
            }else{

                const resultado = await produtoModel.deleteProdutos(id);
                if(resultado.affectedRows === 1) {
                 res.status(200).json({ message: 'Produto excluido com sucesso.', data: resultado});

                }else{

                    throw new Error('Não foi possivel excluir o produto');
                }
            }
            
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor!', errorMessage: error.message});
        }
    },
};

export default produtoController