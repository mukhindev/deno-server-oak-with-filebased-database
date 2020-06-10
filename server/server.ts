import { Application } from "https://deno.land/x/oak/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import { success } from "./colors.ts";
import { logger, timing } from "./logger.ts";
import { router } from "./router.ts";

const app = new Application();
const SERVER_PORT: number = Number(Deno.env.get("SERVER_PORT")) || 8000;

// Logger & Timing
app.use(logger);
app.use(timing);

app.addEventListener("listen", () => {
  console.log(success(`Server started on port ${SERVER_PORT}!`));
});

app.use(router.routes());
app.listen({ port: SERVER_PORT });
