import { Router } from "https://deno.land/x/oak/mod.ts";
import { getSamples, updateSample } from "./controllers/samples.ts";
import { onlyJSON } from "./middlewares.ts";

const router = new Router();

router.get("/api/samples", getSamples);
router.patch("/api/samples/:id", onlyJSON, updateSample);

export { router };
