import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const input = pathToFileURL(join(repositoryRoot, "tools", "og-image.html")).href;
const output = join(repositoryRoot, "og-image.png");

const chromeCandidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
].filter(Boolean);

const chrome = chromeCandidates.find(existsSync);

if (!chrome) {
    throw new Error("Chrome/Chromium não encontrado. Defina CHROME_PATH e execute novamente.");
}

const result = spawnSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=1000",
    "--window-size=1200,630",
    `--screenshot=${output}`,
    input,
], { encoding: "utf8" });

if (result.status !== 0) {
    throw new Error(result.stderr || `Chrome encerrou com status ${result.status}`);
}

process.stdout.write(`Imagem gerada em ${output}\n`);
