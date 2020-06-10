import database from "./database.ts";

export const getProducts = async ({ response }: any) => {
  response.body = await database.getAll("products");
};

export const updateProduct = async ({ response, request, params }: any) => {
  const body = await request.body();
  response.body = await database.update("products", {
    id: params.id,
    body: body.value,
  });
};
