import database from "../database.ts";

export const getSamples = async ({ response }: any) => {
  response.body = await database.get("samples");
};

export const updateSample = async ({ response, request, params }: any) => {
  const body = await request.body();
  response.body = await database.update("samples", {
    id: params.id,
    body: body.value,
  });
};

database.build("samples")
