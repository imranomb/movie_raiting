const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const { error } = require("console");
const bodyParser = require("body-parser")
const app = express();

app.use(cors());
app.use(bodyParser.json())
const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root123",
    database: "movies"
})

connection.connect((error) => {
    if(error) throw error;
    console.log("Database is connected to the server!")
})

app.get("/movies", (req, res) => {
    
    const sqlQuery = "SELECT count(id) AS totalRowNumber FROM movies";
    const range = parseInt(req.query.range);
    const promise = connection.promise().query(sqlQuery)
    .then(([rows, fields]) => {
        const firstRow = rows[0];
        const totalRowNumber = firstRow.totalRowNumber;
        loadMovies(req, res, totalRowNumber);
    })
    .catch((error) => {
        res.status(500).json({message: error});
    })

    function loadMovies(req, res, totalRowNumber)
    {
        let range = parseInt(req.query.range);
        if(range+2 > totalRowNumber || range > totalRowNumber) range = totalRowNumber - 3;
        if(range < 0) range = 0;
        const sqlQuery = `SELECT * FROM movies WHERE id BETWEEN ${range} AND ${range+2}`;
        const promise = connection.promise().query(sqlQuery)
        .then(([rows, fields]) => {
            const resObject = 
            {
                filmCount: totalRowNumber,
                items: rows
            }
            res.json(resObject)
        })
        .catch((error) => {res.status(500).json({
            message: "There is an error" + error
        })})
        .finally(() => connection.end);
    }
})
app.post("/add", (req, res) => {
    // const {name, genre, raiting, cover} = req.body;
    const sqlQuery = "INSERT INTO `movies`.`movies` (`name`, `genre`, `raiting`, `cover`) VALUES (?, ?, ?, ?);"
    connection.query(sqlQuery, [req.body.name, req.body.genre, req.body.raiting, req.body.cover], (error, data) => {
        if(error) return res.json(error);
        return res.json("Movie added")
    })
})
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sqlQuery = "DELETE FROM movies WHERE id=?";
    connection.query(sqlQuery, [id], (error, data) => {
        if(error) return res.json({error});
        return res.json("Movie deleted!")
    })
})
const port = 8080;
app.listen(port, () => {
    console.log("Server is listening!")
})