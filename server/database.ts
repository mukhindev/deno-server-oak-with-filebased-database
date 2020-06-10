import { readJson, writeJson } from "https://deno.land/std/fs/mod.ts";
import { info, success, error } from "./colors.ts";

const PATH_TO_DATABASE = "./database/";
const POSTFIX_BUNDLE_FILE = "bundle.json";
const ASSET_FILTER = /config.json|image.png/;

const listFolders = async (path: string) => {
  let folders: string[] = [];
  for await (const dirEntry of Deno.readDir(path)) {
    if (dirEntry.isDirectory) folders.push(dirEntry.name);
  }
  return folders;
};

const listFiles = async (path: string) => {
  let files: string[] = [];
  for await (const dirEntry of Deno.readDir(path)) {
    if (dirEntry.isFile) files.push(dirEntry.name);
  }
  return files;
};

const hasInDatabase = async (db: string) => {
  const items = await listFolders(PATH_TO_DATABASE);
  if (items.includes(db)) {
    return { ok: true };
  } else {
    const message = `Not found database ${db}`;
    console.log(error(message));
    return {
      ok: false,
      message,
      target: `database.ts -> hasInDatabase('${db}')`,
    };
  }
};

const build = async (db: string) => {
  console.log(info("Building data..."));
  let data: any = [];
  for await (const product of await listFolders(`${PATH_TO_DATABASE}/${db}`)) {
    const id = product;
    const config = await readJson(
      `${PATH_TO_DATABASE}/${db}/${product}/config.json`,
    );
    const listAssets = await listFiles(`${PATH_TO_DATABASE}/${db}/${product}`);
    const assets = listAssets.filter((asset) => !ASSET_FILTER.test(asset));
    data.push({ id, config, assets });
  }
  await writeJson(`${PATH_TO_DATABASE}/${db}_${POSTFIX_BUNDLE_FILE}`, data);
  console.log(success("Successful build!"));
};

const getAll = async (db: string) => {
  const test = await hasInDatabase(db);
  if (!test.ok) return test;
  return await readJson(`${PATH_TO_DATABASE}/${db}_${POSTFIX_BUNDLE_FILE}`);
};

const update = async (
  db: string,
  { id, body }: { id: string; body: object },
) => {
  const target = `database.ts -> update('${db}')`;
  if (!id) {
    return {
      ok: false,
      message: "No id in request",
      target,
    };
  }
  const updatedKeys = Object.keys(body);
  if (!updatedKeys.length) {
    return {
      ok: false,
      message: "Not found properties in object",
      target,
    };
  }
  const oldConfig = await readJson(
    `${PATH_TO_DATABASE}/${db}/${id}/config.json`,
  );
  if (!oldConfig) return;
  const newConfig = Object.assign(oldConfig, body);
  await writeJson(`${PATH_TO_DATABASE}/${db}/${id}/config.json`, newConfig);
  await build(db);
  const updatedKeysMessage = updatedKeys.toString().replace(/,/, ", ");
  return {
    ok: true,
    message: `Changed: ${id}, updated properties: ${updatedKeysMessage}`,
    target,
  };
};

export default {
  build,
  getAll,
  update,
};
