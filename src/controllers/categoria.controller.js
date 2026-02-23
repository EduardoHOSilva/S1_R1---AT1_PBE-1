const {categoriaModel} = require('../models/categoria.model.js');

const categoriaController = {
    selecionarCategoria: async (req, res) => {
        try {
            const resultado = await categoriaModel.selecionarCategorias();
            if (resultado.length === 0) {
                return res.status(200).json({message: 'A tabela selecionada não contem dados'});
            }
            res.status (200).json({message: 'Resultado dos dados listados', data: resultado});

        }catch (error) {

            console.error(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
        }
    },

    cadastrarCategoria: async (req, res) => {
        try{
            const {idCategoria, descricaoCategoria, dataCad} = req.body;

            if(!String(descricaoCategoria) || descricaoCategoria.length < 3 || dataCad < 0) {

                return res.status(400).json({message: 'Forneça um identificador (ID) valido'});
            }
            const resultado = await categoriaModel.cadastrarCategorias(idCategoria, descricaoCategoria, dataCad);

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
    atualizarCategoria: async (req, res) => {
        try{
            const idCategoria = Number(req.params.idCategoria);
            let {descricaoCategoria, dataCad} = req.body;
            descricaoCategoria = descricaoCategoria.trim();

            if(!idCategoria || !descricaoCategoria || !dataCad || typeof idCategoria !== 'number' || !isNaN(descricaoCategoria) || isNaN(dataCad) || descricaoCategoria.trim().length <3) {

             return res.status(400).json({message: 'Verifique os dados enviados e tente novamente'});

            }

            const produtoAtual = await categoriaModel.selecionarCategorias(idCategoria);
            if(produtoAtual.length === 0) {
                throw new Error('Registro não localizado');
            } 
            const novaDescricao = descricaoCategoria ?? produtoAtual[0].descricaoCategoria;
            const novaData = dataCad ?? produtoAtual[0].dataCad;

            const resultado = await categoriaModel.alterarCategorias(idCategoria, novaDescricao, novaData);

            if(resultado.changedRows === 0) {
                throw new Error('Ocorreu um erro ao incluir o registro');
            } 

            res.status(200).json({ message: 'Registro atualizado com sucesso', data: resultado});
             
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor!', errorMessage: error.message});
        }
    },

    excluirCategoria: async (req, res) => {
        try{
            const id = Number(req.params.idCategoria);
            
            if(!id || !Number.isInteger(id)) {

             return res.status(400).json({message: 'Forneça um ID válido.'});

            }

            const categoriaSelecionada = await categoriaModel.selecionarCategorias(id);
            console.log(categoriaSelecionada);

            if(categoriaSelecionada.length === 0) {
                throw new Error('Registro não localizado');
            }else{

                const resultado = await categoriaModel.deleteCategorias(id);
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


export default categoriaController;