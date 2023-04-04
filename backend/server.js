const express = require('express')
const client = require('./config/connection.js')
var cors = require('cors')

const app = express()
app.use(cors())

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post("/api/users", (req, res) => {
    const user = req.body;
    let insertQuery = `insert into users ( name, email, password, address, user_type) values('${user.name}', '${user.email}', '${user.pwd}', '${user.address}', '${user.type}')`
    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send("Insertion was successful")
        }
        else {
            console.log(err.message);
        }
    })
})

app.get("/api/users", (req, res) => {
    client.query("select * from users", (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end;
})

app.post('/api/checkUser', (req, res) => {
    const email = req.body.email;
    client.query('SELECT email FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        res.status(500).send('Server error');
      } else if (results.rows.length > 0) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    });
    client.end;
  });

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    client.query(`select * from users where email = '${email}'`, (err, result) => {
        if (!err) {
            if (result.rows[0].password === password) {
                const user = result.rows[0]
                res.send(user)
            }
            else {
                res.json({ pcheck: true })
            }
        }
        else {
            res.send(err)
        }

    })
    client.end;
})

app.get('/api/products', (req, res) => {
    client.query('select * from products ', (err, result) => {
        if (!err) {
            res.status(200).json(result.rows)
        }
    })
    client.end;
})

app.get('/api/products/:productId', (req, res) => {
    const { productId } = req.params;
    client.query(`select * from products where product_id = ${productId}`, (err, result) => {
        if (!err) {
            res.send(result.rows[0])
        }
    })
    client.end;
})


app.get('/api/users/:userId/cart', (req, res) => {
    const { userId } = req.params
    client.query(`SELECT p.*, c.quantity FROM products p 
    JOIN cart c ON p.product_id = c.product_id 
    WHERE c.user_id = ${userId}`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end;
})

app.post('/api/users/:userId/cart/:productId', (req, res) => {
    const { userId, productId } = req.params
    const { num } = req.body
    let quantity
    client.query(`select quantity from cart where product_id = ${productId} and user_id = ${userId}`,
        (err, result) => {
            if (!err) {
                // console.log(result.rows);
                if (result.rows[0] == null) {
                    client.query(`insert into cart(product_id, quantity, user_id) values(${productId}, 1, ${userId})`, (err, result) => {
                        if (!err) {
                            res.send("Insertion was successful")
                        }
                    })
                }
                else {
                    quantity = result.rows[0].quantity
                    // console.log(quantity);
                    client.query(`update cart set quantity = ${quantity} + ${num} where user_id = ${userId} and product_id = ${productId}`, (err, result) => {
                        if (!err) {
                            res.send('Quantity updated')
                        }
                        else {
                            console.log(err);
                        }
                    })
                }
            }
        })

    client.end;
})

app.delete('/api/users/:userId/cart/:productId', (req, res) => {
    const { userId, productId } = req.params
    client.query(`delete from cart where user_id = ${userId} and product_id = ${productId}`, (err, result) => {
        if (!err) {
            res.send("Deletion was successful")
        }
    })
    client.end;
})


app.listen(5000, () => {
    console.log("Server listening on 5000..");
})