import { Router } from "express";

import productHandlres from "./productHandlres.js";

const productsRouter = Router();

productsRouter.get("/", productHandlres.getAll);

productsRouter.post("/", productHandlres.createProduct);

productsRouter
  .route("/:id")
  .get(productHandlres.getById)
  .put(productHandlres.updateUserById)
  .delete(productHandlres.deleteUserById);

export default productsRouter;