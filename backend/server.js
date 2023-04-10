const express = require('express')
const client = require('./config/connection.js')
var cors = require('cors')
const fs = require('fs')
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express()
app.use(cors())

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// app.post('/api/addproduct', (req, res) => {
//     const { image_data, product } = req.body
//     const images = []
//     for (let i = 0; i < image_data.length; i++) {
//         const file = image_data[i];
//         const imageBuffer = fs.readFileSync(file);
//         images.push(imageBuffer)
//     }
//     client.query(`insert into products(name, description, price, image_data) values('${product.name}', '${product.description}', '${product.price}', ${images})`, (err, result) => {
//         if (!err) {
//             // await client.query("COMMIT");
//             res.status(200).send("Product submitted successfully");
//         }
//     })

// })

// app.post('/api/addproduct', (req, res) => {
//     const { image_data, product } = req.body
//     const images = []
//     for (let i = 0; i < image_data.length; i++) {
//         // const file = image_data[i];
//         const imageBuffer = fs.readFileSync(image_data[i]);
//         images.push(imageBuffer)
//     }
//     client.query(`insert into products(name, description, price, image_data) values('${product.name}', '${product.description}', '${product.price}', ${images})`, (err, result) => {
//         if (!err) {
//             // await client.query("COMMIT");
//             res.status(200).send("Product submitted successfully");
//         }
//     })

// })

app.post("/api/addproduct", upload.array("images[]"), (req, res) => {
    const files = req.files;
    const data = JSON.parse(req.body.product)
    // console.log(files)
    const image_data = []
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageBuffer = fs.readFileSync(file.path);
        image_data.push(imageBuffer)
    }
    console.log(image_data);
    client.query(`insert into products(name, description, price, image_data) values ($1, $2, $3, $4)`, [data.name, data.description, data.price, image_data], (err, result) => {
        if (!err) {
            res.status(200).send("Product submitted successfully");
        }
        // console.log(err);
    })
    client.end;
});

app.put('/updateproduct/:product_id', upload.array("images[]"), (req, res) => {
    const {product_id} = req.params
    const files = req.files;
    const data = JSON.parse(req.body.product)
    console.log(data)

    let images = []
    console.log(images);
    console.log(data.image_data.length);
    for(let i = 0; i< data.image_data.length; i++){

        const dataUrl = data.image_data[i][0]
        // Extract the base64-encoded data
        const base64Data = dataUrl.split(",")[1];

        if(base64Data != undefined){
            // Decode the base64-encoded data into a binary array
            // console.log(base64Data);
        const binaryData = atob(base64Data);

        // Create a Uint8Array from the binary array
        const buffer = Buffer.from(binaryData, 'binary');
        images.push(buffer)
        }
        

    }
    // console.log(images)

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageBuffer = fs.readFileSync(file.path);
        images.push(imageBuffer)
    }
    console.log(images);
    const query = 'UPDATE products SET name = $1, description = $2, price = $3, image_data = $4 WHERE product_id = $5'
client.query(query, [data.name, data.description, data.price, images, product_id],(err, result) => {
  if (!err) {
    console.log('Product updated successfully');
    res.status(200).send('Product updated successfully');
  } else {
    console.log(err);
  }

    })
    client.end;
})

app.delete('/delete/:type/:id', (req, res) => { 
    const {type, id} = req.params
    let type_id = ''
    // console.log(type);
    // console.log(id);
    if(type == 'products'){
        type_id = 'product_id'
    }
    else{
        type_id = 'user_id'
    }
    client.query(`delete from ${type} where ${type_id} = ${id}`,(err, result) => {
        if(!err){
            res.send("Deletion was successful")
        }
        else{
            console.log(err);
        }
    })
    client.end;
})

app.post("/api/users", (req, res) => {
    const user = req.body;
    let insertQuery = `insert into users ( name, email, password , user_type) values('${user.name}', '${user.email}', '${user.pwd}', '${user.type}')`
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

app.post('/api/checkout', (req, res) => {
    const {formData, orderItems} = req.body
    console.log(formData, orderItems);
    try{
    client.query('insert into orders(user_id, total_amount, order_date, address, payment_method) values($1, $2, $3, $4, $5) RETURNING order_id',[formData.user_id, formData.total_amount, formData.order_date, formData.address, formData.payment], (err, result) =>{
        if(!err){
            const order_id = result.rows[0].order_id
            console.log(order_id);
            for(let i=0; i < orderItems.length; i++){
                console.log(orderItems[i].product_id);
                client.query(`insert into order_details(product_id, quantity, order_id) values($1, $2, $3)`,[orderItems[i].product_id, orderItems[i].quantity, order_id],(err, result) => {
                    if(err){
                        console.log(err);
                        // res.send({orderUnSuccessful: true})
                    }
                })
            }
            res.send({orderSuccessful: true})    
        }
    }
)}
    catch (err) {
        console.error(err);
        res.status(500).send("Error while submitting the order");
      } 
    
})

app.delete('/:user_id/emptyCart', (req, res) => {
    const {user_id} = req.params
    console.log(user_id);
    client.query(`delete from cart where user_id = ${user_id}`, (err, result) => {
        if(!err){
            res.send({emptyCart : true})
        }
        else{
            console.log(err);
        }
    })
})

app.get('/api/orders', (req, res) => {
    client.query('select o.*, u.email from orders o join users u on o.user_id = u.user_id', (err, result) => {
        if(!err){
            res.send(result.rows)
        }
    })
})

app.get('/api/:userId/myorders', (req, res) => {
    const {userId} = req.params
    client.query(`select p.product_id, p.name, od.quantity, p.price, o.order_date from order_details od 
    join orders o on od.order_id = o.order_id
    join products p on od.product_id = p.product_id 
    where o.user_id = ${userId}`, (err, result) => {
        if(!err){
            res.send(result.rows)
        }
    })
})

app.listen(5000, () => {
    console.log("Server listening on 5000..");
})