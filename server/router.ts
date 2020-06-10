import { Router } from "https://deno.land/x/oak/mod.ts";
import { getProducts, updateProduct } from "./controllers.ts";
import { onlyJSON } from "./middlewares.ts";

const router = new Router();

router.get("/api/products", getProducts);
router.put("/api/products/:id", onlyJSON, updateProduct);

export { router };
