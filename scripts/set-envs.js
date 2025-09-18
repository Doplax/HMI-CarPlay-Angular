console.log("=== RUNNING ENV SCRIPT ===");

require("dotenv").config();
const {writeFileSync, mkdirSync} = require("fs");

const targetPath = './src/environments/environment.ts';
console.log("MAPBOX_KEY:", process.env.MAPBOX_KEY);
console.log("Writing to:", targetPath);

const envFileContent = `
export const environment = {
  production: false,
  mapbox_key: '${process.env.MAPBOX_KEY}',
  otra: "propiedad",
};
`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync(targetPath, envFileContent);

console.log("environment.ts content:", envFileContent);