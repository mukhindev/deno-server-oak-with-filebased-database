import { success, warning, info, textSuccess, textError } from "./colors.ts";

export const logger = async ({ response, request }: any, next: any) => {
  await next();
  const rt = response.headers.get("X-Response-Time");
  let method = request.method;
  if (method === "GET") method = success(request.method);
  if (method === "POST") method = warning(request.method);
  if (method === "PUT") method = info(request.method);
  let status = response.status;
  if (status === 200) status = textSuccess(response.status);
  if (status === 400) status = textError(response.status);
  if (status === 404) status = textError(response.status);
  console.log(
    `${method} ${request.url.pathname} ${status} ${rt}`,
  );
};

export const timing = async ({ response }: any, next: any) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  response.headers.set("X-Response-Time", `${ms}ms`);
};
