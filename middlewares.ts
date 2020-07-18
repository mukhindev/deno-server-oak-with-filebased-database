export const onlyJSON = async ({ response, request }: any, next: any) => {
  const body = await request.body();
  if (body.type !== "json") {
    response.status = 400;
    response.body = {
      ok: false,
      message: "Only JSON allowed in request body",
      target: `middlewares.ts -> onlyJSON()`,
    };
    return;
  }
  await next();
};
