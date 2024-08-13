const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
app.use(bodyParser.json())
app.use(cors())

const connection = mysql.createConnection({ // cria a conexão com o banco de dados
    host: "localhost",
    user: "root",
    password: "password",
    database: "catalogo_produtos"
})

connection.connect(err => { // efetua a conexão
    if(err) {
        console.error(err.stack)
        return;
    }
    console.log('conectado ao banco de dados com o ID: ' + connection.threadId)
})

app.post('/produtos', (req, res) => { // cria novo produto
    const {nome, descricao, preco} = req.body

    if(!nome || !descricao || !preco) { // valida se todos os dados foram inseridos corretamente.
        res.status(400).send("Erro ao cadastrar produto. Dados incompletos.")
        return
    }

    const sql = 'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)'

    connection.query(sql, [nome, descricao, preco], (err, result) => {
        if(err) {
            res.status(500).send("Erro ao cadastrar produto.")
            return
        }
        res.status(201).send('Produto cadastrado com sucesso.')
    })
})


app.get('/produtos', (req, res) => { // retorna todos os produtos
    const sql = "SELECT * FROM produtos"
    connection.query(sql, (err, results) => {
        if(err){
            res.status(500).send("Não foi possível obter os produtos.")
            return;
        }
        res.status(200).json(results)
    })
})

app.get('/produtos/:id', (req, res) => { // retorna o produto de acordo com o id
    const sql = 'SELECT * FROM produtos WHERE id = ?'
    connection.query(sql, [req.params.id], (error, results) => {
        if(error) {
            res.status(500).send("Erro ao obter produto.")
            console.log('erro')
            return
        } else if(results == "") { // valida se o produto existe
            res.status(400).send("Produto não encontrado.")
            return
        }
        res.status(200).json(results)
    })
})

app.put('/produtos/:id', (req, res) => { // atualiza produto
    const {nome, descricao, preco} = req.body

    if(!nome || !descricao || !preco) { // valida se todos os dados foram inseridos corretamente.
        res.status(400).send("Erro ao cadastrar produto. Dados incompletos.")
        return
    }

    const sql = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?'

    connection.query(sql, [nome, descricao, preco, req.params.id], err => {
        if(err) {
            res.status(500).send("Erro ao atualizar produto.")
            return
        }
        res.status(200).send("Produto atualizado com sucesso.")
    })

})

app.delete('/produtos/:id', (req, res) => { // deleta um produto
    const sql = 'DELETE FROM produtos WHERE id = ?'
    connection.query(sql, [req.params.id], (err) => {
        if(err) {
            res.status(500).send("Erro ao deletar produto.")
            return
        }
        res.status(200).send("Produto deletado com sucesso.")
    })
})

app.listen(3000);