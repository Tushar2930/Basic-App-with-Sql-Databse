const express = require('express');
const cors= require('cors');
const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(express.json());

const port = 8000;

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project_1'
    }
);



app.get('/', (req, res) => {
    const sqlSelect = "SELECT * FROM `student`";
    db.query(sqlSelect, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            return res.json({
                smessage:"success",
            data:result
        });
        }
    })
}
);

app.post('/insert', (req, res) => {
    // console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const sqlInsert = "INSERT INTO `student` (`name`, `email`) VALUES (?, ?)";
    db.query(sqlInsert, [name, email], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            return res.json("Values Inserted");
        }
    })
}
);

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM `student` WHERE `id` = ?";
    db.query(sqlDelete, id, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            return res.json("Values Deleted");
        }
    })
})


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    }   
);

