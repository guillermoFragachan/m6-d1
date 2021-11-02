import cors from 'cors'
import express from 'express'
import listEndpoints from 'express-list-endpoints'
import productsRouter from './services/products.js'



const server = express()


server.use(cors())

server.use(express.json())

server.use("/products", productsRouter);


const {PORT} = process.env;

console.table(listEndpoints(server))


server.listen(PORT, ()=>{
    console.log('Server running on:', PORT)
})