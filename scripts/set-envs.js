require("dotenv").config();
const {writeFileSync, mkdirSync} = require("fs");

const targetPath = './src/environments/environment.ts';

const envFileContent = `
export const environment = {
  production: false,
  mapbox_key: '${process.env.MAPBOX_KEY}',
  otra: "propiedad",
};
`


mkdirSync('./src/environments', { recursive: true });// Ensure the directory exists
writeFileSync(targetPath, envFileContent);