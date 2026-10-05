import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const screenshotDirectory = join(repositoryRoot, "screenshots");
const previewUrl = (process.env.PREVIEW_URL || "http://127.0.0.1:4173").replace(/\/$/, "");
const response = await fetch(previewUrl);
if (!response.ok) {
    throw new Error(`Preview indisponível em ${previewUrl}: HTTP ${response.status}`);
}

mkdirSync(screenshotDirectory, { recursive: true });

const sections = [
    ["hero", "inicio"],
    ["experiencia", "experiencia"],
    ["case", "case-controle"],
    ["competencias", "competencias"],
    ["contato", "contato"],
];
const viewports = [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
];

for (const [viewport, width, height] of viewports) {
    for (const [name, anchor] of sections) {
        const output = join(screenshotDirectory, `${viewport}-${name}.png`);
        const result = spawnSync("npx", [
            "--yes",
            "playwright",
            "screenshot",
            "--channel=chrome",
            `--viewport-size=${width},${height}`,
            "--wait-for-timeout=500",
            `${previewUrl}/?capture=1#${anchor}`,
            output,
        ], { encoding: "utf8" });

        if (result.status !== 0) {
            throw new Error(result.stderr || `Playwright encerrou com status ${result.status}`);
        }

        process.stdout.write(`${viewport}/${name}: ${width}x${height}\n`);
    }
}
