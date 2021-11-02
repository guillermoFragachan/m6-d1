import { Router } from "express";

import productHandlres from "./productHandlres.js";

const productsRouter = Router();

productsRouter.get("/", productHandlres.getAll);

productsRouter.post("/", productHandlres.createProduct);

productsRouter
.route("/reviews")
.get(productHandlres.getAllReviews)

productsRouter
  .route("/:id")
  .get(productHandlres.getById)
  .put(productHandlres.updateProduct)
  .delete(productHandlres.deleteProduct);

  productsRouter
    .route("/:id/review")
    .post(productHandlres.createReview)
    .get(productHandlres.getReviews)
    .delete(productHandlres.deleteReviews)



export default productsRouter;