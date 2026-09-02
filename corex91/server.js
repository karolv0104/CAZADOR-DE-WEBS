const { existsSync } = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

if (!dev && !existsSync(path.join(__dirname, ".next"))) {
  execSync("npm run build", { stdio: "inherit", cwd: __dirname });
}

const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`Corex 91 listo en el puerto ${port}`);
  });
});
