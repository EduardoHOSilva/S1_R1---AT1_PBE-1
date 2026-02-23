const pool = require('../config/db.js');

const produtoModel = {

selecionarProdutos: async() => {
        const sql = 'SELECT * FROM Produtos;';
        const [rows] = await pool.query(sql);
        return rows;
    },

cadastrarProdutos: async (pidProduto, pidCategoria, pnomeProduto, pvalorProduto, pvinculoImagem, pdataCad) => {
        const sql = 'INSERT INTO Produtos (idProduto, idCategoria, nomeProduto, valorProduto, vínculoImagem, dataCad) VALUES (?,?,?,?,?,?)';
        const values = [pidProduto, pidCategoria, pnomeProduto, pvalorProduto, pvinculoImagem, pdataCad];
        const [rows] = await pool.query(sql, values);
        console.log (rows);
        return rows;
    },

    alterarProdutos: async (pidProduto, pidCategoria, pnomeProduto, pvalorProduto, pvinculoImagem, pdataCad) => {
        const sql = 'UPDATE Produtos SET nomeProduto=?, valorProduto=?, vinculoImagem=?, dataCad=? WHERE idProduto=?';
        const values = [pnomeProduto, pvalorProduto, pvinculoImagem, pdataCad];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    deleteProdutos: async (pidProduto) => {
        const sql = 'DELETE FROM Produtos WHERE idProduto=?';
        const values = [pidProduto];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
}
module.exports = {produtoModel};