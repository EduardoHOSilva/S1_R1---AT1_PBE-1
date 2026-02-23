const pool = require('../config/db.js');

const categoriaModel = {

selecionarCategorias: async() => {
        const sql = 'SELECT * FROM Categoria;';
        const [rows] = await pool.query(sql);
        return rows;
    },

cadastrarCategorias: async (pidCategoria, pdescricaoCategoria, pdataCad) => {
        const sql = 'INSERT INTO Categoria (idCategoria, descricaoCategoria, dataCad) VALUES (?,?,?)';
        const values = [pidCategoria, pdescricaoCategoria, pdataCad];
        const [rows] = await pool.query(sql, values);
        console.log (rows);
        return rows;
    },

    alterarCategorias: async (pidCategoria, pdescricaoCategoria, pdataCad) => {
        const sql = 'UPDATE Categoria SET descricao=?, valor=? WHERE idCategoria=?';
        const values = [pidCategoria, pdescricaoCategoria, pdataCad];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    deleteCategorias: async (pidCategoria) => {
        const sql = 'DELETE FROM Categoria WHERE idCategoria=?';
        const values = [pidCategoria];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
}
module.exports = {categoriaModel};