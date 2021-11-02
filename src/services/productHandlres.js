import pool from "../db/connect.js"

const getAll = async (_req, res, _next) => {


    const data = await pool.query("SELECT * FROM products ORDER BY id ASC;");
    res.send(data)
  
}

const getById = async (req, res, _next) => {
  
    const data = await pool.query("SELECT * FROM products WHERE id=$1", [
      req.params.id,
    ])
    if (data.rows.length === 0) {
      res.status(400).send("User not found")
    } else {
      res.send(data.rows[0])
    }
 
}






const createProduct = async (req, res, _next) => {
  
    const { name, description, brand, price, image_url } = req.body
    const data = await pool.query(
      "INSERT INTO products(name, description, brand, price, image_url) VALUES($1,$2,$3,$4, $5) RETURNING *;",
      [name, description, brand, price, image_url ]
    )

    res.send(data.rows[0])

};



const updateProduct = async (req, res, next) => {
  
    const {name, description, brand, price, image_url } = req.body
    const data = await pool.query(
      "UPDATE products SET name=$1,last_name=$2,email=$3 WHERE id=$4 RETURNING *;",
      [name, description, brand, price, image_url, req.params.id]
    )
    res.send(data.rows[0])
 
}

const deleteProduct = async (req, res, next) => {

    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id])
    res.status(204).send();
 
    res.status(400).send(error.message)
  
};




/********************REVIEWS*****************/




const getReviews = async (req, res, _next) => {
  
  const data = await pool.query("SELECT * FROM reviews WHERE product_id=$1", [
    req.params.id,
  ])
  if (data.rows.length === 0) {
    res.status(400).send(" Not found")
  } else {
    res.send(data.rows[0])
  }
}
const createReview = async (req, res, _next) => {

  const product_id = req.params.id
  
  const { comment, rate} = req.body
  const data = await pool.query(
    "INSERT INTO reviews(comment, rate, product_id) VALUES($1,$2,$3) RETURNING *;",
    [comment, rate, product_id ]
  )

  res.send(data.rows[0])

};


const getAllReviews  = async (req, res, _next) => {
  const data = await pool.query("SELECT * FROM reviews ORDER BY id ASC;");
  res.send(data.rows)
}


const deleteReviews = async (req, res, _next) =>{
  await pool.query("DELETE FROM reviews WHERE id=$1", [req.params.id])
  res.status(204).send();

  res.status(400).send(error.message)
}
const productHandlres = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  getAllReviews,
  deleteReviews
};

export default productHandlres
