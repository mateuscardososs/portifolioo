import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const previewUrl = (process.env.PREVIEW_URL || "http://127.0.0.1:4173").replace(/\/$/, "");
const response = await fetch(previewUrl);
if (!response.ok) {
    throw new Error(`Preview indisponível em ${previewUrl}: HTTP ${response.status}`);
}

const temporaryDirectory = mkdtempSync(join(tmpdir(), "portfolio-layout-"));

try {
    for (const width of [375, 768, 1280]) {
        const screenshot = join(temporaryDirectory, `layout-${width}.png`);
        const harFile = join(temporaryDirectory, `layout-${width}.har`);
        const result = spawnSync("npx", [
            "--yes",
            "playwright",
            "screenshot",
            "--channel=chrome",
            `--viewport-size=${width},900`,
            "--full-page",
            "--wait-for-timeout=250",
            "--save-har",
            harFile,
            `${previewUrl}/?capture=1`,
            screenshot,
        ], { encoding: "utf8" });

        if (result.status !== 0) {
            throw new Error(result.stderr || `Playwright encerrou com status ${result.status}`);
        }

        const png = readFileSync(screenshot);
        const screenshotWidth = png.readUInt32BE(16);
        if (screenshotWidth !== width) {
            throw new Error(`Overflow horizontal em ${width}px: captura gerada com ${screenshotWidth}px`);
        }

        const har = JSON.parse(readFileSync(harFile, "utf8"));
        const externalRequests = har.log.entries
            .map((entry) => entry.request.url)
            .filter((url) => new URL(url).origin !== previewUrl);
        if (externalRequests.length) {
            throw new Error(`Requisições externas em ${width}px:\n${externalRequests.join("\n")}`);
        }

        process.stdout.write(`PASS ${width}px: sem overflow e sem requisições externas\n`);
    }
} finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
}
