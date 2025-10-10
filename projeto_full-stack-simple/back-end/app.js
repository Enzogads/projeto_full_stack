import express from 'express'
import mysql from 'mysql2/promise'
const app = express()
app.use(express.json());
const pool = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senai',
    database: 'senai'
})

app.get("/", (req,res) => {
    res.send("Olá Mundo")
});

app.get("/usuarios", async (req, res) => {
    const [results] = await pool.query(
        'SELECT * FROM usuario'
    );
    res.send(results)
})

app.get("/usuarios/:id", async (req, res) => {
    const { id } = req.params
    const [results] = await pool.query(
        'SELECT * FROM usuario WHERE id=?', id
    );
    res.send(results)
})

app.post("/registro", async (req, res)=> {
    try {
        
        const { body } = req;
        
        const [results] = await pool.query(
        'INSERT INTO usuario (nome,email,senha) VALUES (?,?,?)',
        [body.nome,
        body.email,
        body.senha
        ]
        );

        const [usuarioCriado] = await pool.query(
            "Select * from usuario WHERE id=?",
            results.insertId

        ) 

        return res.status(201).json(usuarioCriado)

    } catch (error) {
        console.log(error);
        
    }
})

app.post("/login", async (req, res)=> {
    try {
        const { body } = req;

        const [results] = await pool.query(
            "SELECT * FROM usuario WHERE usuario.email = ? AND usuario.senha = ?" , [body.email, body.senha]);

        
        
        console.log("Usuário logado")
        if (results.length > 0) return res.status(200).json(results);

        else res.status(404).json("Usuário não encontrado");
       

    } catch (error) {
        console.log(error)
    }
})

app.delete("/usuarios/:id", async (req, res)=>{

    try {
        const {id} = req.params;
        const [results] = await pool.query(
            "DELETE FROM usuario WHERE id=?",
            id
        );
        res.status(200).send("Usuário deletado!", results)
    } catch (error) {
        console.log(error)
    }

    
})

app.put("/usuarios/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const { body } = req
        const [results] = await pool.query(
            "UPDATE usuario SET `nome` = ?, `idade` = ? WHERE id = ?",
            [body.nome, body.idade, id]
        )
        res.status(200).send("Usuário atualizado", results)
    } catch (error) {
        console.log(error)
    }
})

app.post("/logs", async (req, res)=> {
    try {
        const { body } = req;
        const [results] = await pool.query(
        'INSERT INTO lgs (categoria,horas_trabalhadas,linha_de_codigo, bugs_corrigidos) VALUES (?,?,?,?)',
        [body.categoria,
        body.horas_trabalhadas,
        body.linha_de_codigo,
        body.bugs_corrigidos
        ]
        );

        const [logCriado] = await pool.query(
            "Select * from lgs WHERE id=?",
            results.insertId
        ) 

        return res.status(201).json(logCriado)

    } catch (error) {
        console.log(error);
    }
})

app.get("/logs", async (req, res) => {
    try {
        const [results] = await pool.query(
            'SELECT * FROM lgs'
        );
        res.send(results);
    } catch (error) {
        console.log(error)
    }
})

app.listen(3000, () => {
    console.log(`Servidor rodando na porta: http://localhost:3000`)
});