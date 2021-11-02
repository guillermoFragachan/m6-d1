import pool from "../db/connect.js"

const getAll = async (_req, res, _next) => {

  try {
      
    const data = await pool.query("SELECT * FROM products ORDER BY id ASC;");
    res.send(data.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

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

const updateUserById = async (req, res, next) => {
  
    const { name, last_name, email } = req.body
    const data = await pool.query(
      "UPDATE products SET name=$1,last_name=$2,email=$3 WHERE id=$4 RETURNING *;",
      [name, last_name, email, req.params.id]
    )
    res.send(data.rows[0])
 
}

const deleteUserById = async (req, res, next) => {

    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id])
    res.status(204).send();
 
    res.status(400).send(error.message)
  
};

const productHandlres = {
  getAll,
  getById,
  createProduct,
  updateUserById,
  deleteUserById,
};

export default productHandlres
