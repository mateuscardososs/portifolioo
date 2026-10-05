# Editorial Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the approved portfolio as an accessible, dependency-free editorial dark site that positions Mateus Cardoso as a Backend Developer and presents Controle de Acesso as the primary technical proof.

**Architecture:** Keep the existing static delivery model with one semantic `index.html`, one token-driven `styles.css`, and small independent functions in `script.js`. Treat shell and Playwright scripts as executable contracts for content, accessibility, layout, network isolation, screenshots, and Open Graph output.

**Tech Stack:** HTML5, CSS custom properties and responsive grid, vanilla JavaScript, Bash contract tests, Node.js validation scripts, Playwright CLI, Chrome Lighthouse.

---

## File structure

- `index.html`: semantic content, metadata, navigation, approved case evidence, professional history, and contact links.
- `styles.css`: editorial tokens, responsive grid, typography, interaction states, and reduced-motion behavior.
- `script.js`: menu, active navigation, reveal, email copy, current year, and Recife time.
- `assets/fonts/fonts.css`: local font declarations and metric-compatible fallbacks.
- `assets/fonts/*.woff2`: Archivo, Source Sans 3, and IBM Plex Mono variable Latin subsets.
- `assets/fonts/licenses/*.txt`: matching OFL license texts.
- `tests/verify_stage3.sh`: content, design, metadata, font, evidence, and screenshot contracts.
- `scripts/capture-screenshots.mjs`: deterministic captures for all six sections.
- `scripts/verify-layout.mjs`: overflow and external-request checks.
- `tools/og-image.html`: deterministic 1200 × 630 social card in the editorial visual system.
- `og-image.png`: generated social preview below 300 KiB.
- `screenshots/*.png`: desktop and mobile review evidence.

### Task 1: Replace the Stage 3 contract

**Files:**
- Modify: `tests/verify_stage3.sh`

- [ ] **Step 1: Write the failing structural contract**

Replace the old section order and design assertions with exact checks for:

```bash
for section_id in inicio sobre projetos stack experiencia contato; do
    line="$(grep -n "id=\"$section_id\"" index.html | cut -d: -f1 || true)"
    [[ -n "$line" ]] || fail "missing section #$section_id"
    [[ "$line" -gt "$previous" ]] || fail "section #$section_id is out of order"
    previous="$line"
done

assert_contains index.html 'Mateus Cardoso | Backend Developer'
assert_contains index.html 'Backend Developer com Java e Python, focado em APIs, integrações, dados e IA aplicada.'
assert_contains index.html '250+ testes automatizados'
assert_contains index.html '279 testes no total'
assert_contains index.html '260 executados localmente'
assert_contains index.html '19 testes de integração dependem de Docker'
assert_contains index.html 'Também atuo em uma solução interna de monitoramento de ambientes Qlik.'
assert_contains index.html 'Desenvolvedor Backend Júnior'
assert_not_contains index.html 'DISPONÍVEL'
assert_not_contains index.html '7C6CFF'
assert_not_contains styles.css 'gradient('
assert_not_contains styles.css 'box-shadow:'
```

Add exact CSS token assertions for `#030303`, `#050505`, `#EEEDEA`, `#8D8981`, `#7E7B74`, `#171717`, and `#D2AE63`. Add font checks for Archivo, Source Sans 3, and IBM Plex Mono, their three WOFF2 files, fallbacks, preload count, and OFL files. Add checks for the safe GitHub evidence URLs and reject any URL containing `blob/main/.env`, `application-prod`, or credential query strings.

- [ ] **Step 2: Run the contract and verify RED**

Run: `bash tests/verify_stage3.sh`

Expected: failure because `#sobre`, the Backend Developer metadata, the new tokens, and the new fonts do not exist yet.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/verify_stage3.sh
git commit -m "test(portfolio): define editorial redesign contract"
```

### Task 2: Vendor the approved local typography

**Files:**
- Modify: `assets/fonts/fonts.css`
- Modify: `assets/fonts/README.md`
- Create: `assets/fonts/archivo-latin-wght-normal.woff2`
- Create: `assets/fonts/source-sans-3-latin-wght-normal.woff2`
- Create: `assets/fonts/ibm-plex-mono-latin-wght-normal.woff2`
- Create: `assets/fonts/licenses/Archivo-OFL.txt`
- Create: `assets/fonts/licenses/Source-Sans-3-OFL.txt`
- Create: `assets/fonts/licenses/IBM-Plex-Mono-OFL.txt`
- Remove: previous Sora, Manrope, and JetBrains Mono font binaries and licenses

- [ ] **Step 1: Obtain only the Latin variable WOFF2 assets and licenses**

Use pinned Fontsource packages in a temporary directory, copy the three `latin-wght-normal.woff2` assets and OFL texts, then delete the temporary directory. Do not add package manifests or runtime dependencies.

- [ ] **Step 2: Define exact font faces**

`assets/fonts/fonts.css` must contain one variable face per family:

```css
@font-face {
    font-family: "Archivo";
    src: url("archivo-latin-wght-normal.woff2") format("woff2");
    font-style: normal;
    font-weight: 500 600;
    font-display: swap;
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

Define equivalent Source Sans 3 and IBM Plex Mono faces, plus `Archivo Fallback`, `Source Sans 3 Fallback`, and `IBM Plex Mono Fallback` with `size-adjust`, `ascent-override`, `descent-override`, and `line-gap-override`.

- [ ] **Step 3: Run the font contract**

Run: `bash tests/verify_stage3.sh`

Expected: font assertions pass; the command remains RED on missing HTML/CSS requirements.

- [ ] **Step 4: Commit typography**

```bash
git add assets/fonts
git commit -m "perf(fonts): adopt local editorial typography"
```

### Task 3: Rebuild the semantic content

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Implement metadata and header**

Use title `Mateus Cardoso | Backend Developer`, description `Backend Developer com Java e Python, focado em APIs, integrações, dados e IA aplicada. Portfólio de Mateus Cardoso, em Recife.`, matching Open Graph fields, local font preloads, skip link, `MC · MATEUS CARDOSO`, and navigation for the five editorial sections. Do not render availability in the header.

- [ ] **Step 2: Implement hero and factual table**

Use the approved headline and a `<dl>` containing only BASE, FUSO, FOCO, STACK, ATUAL, and PROVA. Render FOCO on two visual lines while keeping a coherent accessible text node. Use `250+ testes automatizados no case principal` for PROVA.

- [ ] **Step 3: Implement Sobre and Projetos**

Create `#sobre` with the four verified engineering facts. Create `#projetos` with one Controle de Acesso project row and ruled case detail containing the approved Contexto, Decisão técnica, Evidência, Resultado, and Intelbras state text. Include `279 testes no total; 260 executados localmente; 19 testes de integração dependem de Docker.`

- [ ] **Step 4: Add security-reviewed evidence links**

Link only these reviewed public targets if their content scan is clean:

```text
https://github.com/mateuscardososs/Controle-de-acesso/tree/main/src/test
https://github.com/mateuscardososs/Controle-de-acesso/tree/main/src/main/resources/db/migration
https://github.com/mateuscardososs/Controle-de-acesso/blob/main/docker-compose.yml
https://github.com/mateuscardososs/Controle-de-acesso/blob/main/docker-compose.prod.yml
https://github.com/mateuscardososs/Controle-de-acesso/blob/main/README.md
```

Before including each URL, scan the corresponding local target for IPv4 addresses, URI credentials, password assignments, private hostnames, tokens, and real personal data. Omit any target that fails review.

- [ ] **Step 5: Implement Stack, Experiência, Formação, and Contato**

Use the approved four capability rows, the TRF5 and AD Balanças histories, two compact education rows, the exact Qlik sentence, and availability only in contact: `Busco vagas de Desenvolvedor Backend Júnior, em regime remoto, híbrido ou presencial.` Include canonical email, LinkedIn, GitHub, curriculum, and secondary WhatsApp.

- [ ] **Step 6: Run GREEN content checks**

Run: `bash tests/verify_stage1.sh && bash tests/verify_stage3.sh`

Expected: content and structure pass; CSS or JavaScript checks may remain RED until their tasks.

- [ ] **Step 7: Commit content**

```bash
git add index.html
git commit -m "feat(portfolio): restructure editorial content"
```

### Task 4: Build the editorial visual system

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Implement tokens and foundations**

Define the seven approved color tokens, font stacks, 1180 px container, 1 px rules, visible focus, selection colors, skip link, and global overflow protection. Use no gradients or shadows.

- [ ] **Step 2: Implement header and hero**

Create the fixed compact header, active underline, editorial hero grid, display type using `clamp()`, rectangular buttons, and ruled facts table. Preserve comfortable first-viewport spacing at 1440 px.

- [ ] **Step 3: Implement all ruled section layouts**

Build a reusable `.section-grid` for left title/right content, `.ruled-list` for project, stack, and trajectory rows, and `.case-detail` for the longer proof content. Use the amber accent only for sequence markers, companies, proof rules, active navigation, and email underline.

- [ ] **Step 4: Implement responsive and motion behavior**

At tablet and mobile breakpoints, stack grids, make labels readable, preserve 44 px controls, break the email safely, and guarantee no horizontal overflow. Add the 8 px reveal and disable it under `prefers-reduced-motion` and capture mode.

- [ ] **Step 5: Run the style contract**

Run: `bash tests/verify_stage3.sh`

Expected: all static content and style assertions pass.

- [ ] **Step 6: Commit styling**

```bash
git add styles.css
git commit -m "feat(portfolio): implement editorial dark system"
```

### Task 5: Add behavior and live Recife time

**Files:**
- Modify: `script.js`
- Modify: `tests/verify_stage3.sh`

- [ ] **Step 1: Add a failing behavior contract**

Assert that `script.js` contains `America/Recife`, `Intl.DateTimeFormat`, `aria-current`, `navigator.clipboard.writeText`, and `prefers-reduced-motion`.

- [ ] **Step 2: Run and verify RED**

Run: `bash tests/verify_stage3.sh`

Expected: failure on missing Recife clock behavior.

- [ ] **Step 3: Implement the clock and retain focused interactions**

Add `initRecifeClock()` using:

```js
const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Recife',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
});
```

Update once per second and clear the timer when the document becomes hidden. Keep menu, active nav, copy feedback, capture mode, and reduced-motion reveal. Remove the obsolete hero glow.

- [ ] **Step 4: Run GREEN behavior checks**

Run: `node --check script.js && bash tests/verify_stage3.sh`

Expected: PASS.

- [ ] **Step 5: Commit behavior**

```bash
git add script.js tests/verify_stage3.sh
git commit -m "feat(portfolio): add accessible editorial interactions"
```

### Task 6: Regenerate the Open Graph asset

**Files:**
- Modify: `tools/og-image.html`
- Modify: `og-image.png`

- [ ] **Step 1: Update the deterministic social card**

Use the editorial palette and local Archivo/Source Sans 3 fonts. Render exactly one `Mateus Cardoso` and one `Backend Developer`, plus the positioning line `Java · Python · APIs · Integrações · Dados · IA aplicada`. Use lines and amber only; no gradient.

- [ ] **Step 2: Generate and validate**

Run:

```bash
node scripts/generate-og-image.mjs
bash tests/verify_stage3.sh
```

Expected: 1200 × 630 PNG, less than 307200 bytes, correct text, and no external URLs.

- [ ] **Step 3: Commit Open Graph output**

```bash
git add tools/og-image.html og-image.png
git commit -m "feat(metadata): refresh editorial social preview"
```

### Task 7: Capture and correct visual evidence

**Files:**
- Modify: `scripts/capture-screenshots.mjs`
- Replace: `screenshots/desktop-*.png`
- Replace: `screenshots/mobile-*.png`
- Modify: `screenshots/README.md`

- [ ] **Step 1: Update screenshot targets**

Capture `hero/inicio`, `sobre/sobre`, `projetos/projetos`, `stack/stack`, `experiencia/experiencia`, and `contato/contato` at 1440 × 1000 and 390 × 844.

- [ ] **Step 2: Start loopback-only preview**

Run: `python3 -m http.server 4173 --bind 127.0.0.1`

Expected: the portfolio is available only at `http://127.0.0.1:4173/`.

- [ ] **Step 3: Verify layout and capture**

Run:

```bash
node scripts/verify-layout.mjs
node scripts/capture-screenshots.mjs
```

Expected: no overflow or external requests at 375, 768, and 1280 px; twelve screenshots created.

- [ ] **Step 4: Inspect every screenshot against the matching reference**

Compare typography, container width, line position, vertical whitespace, hierarchy, and alignment. Correct only CSS/HTML discrepancies; do not import fictitious content or the floating Lovable badge.

- [ ] **Step 5: Re-run captures after corrections**

Run: `node scripts/verify-layout.mjs && node scripts/capture-screenshots.mjs`

Expected: all layout checks pass and final screenshots reflect the corrected implementation.

- [ ] **Step 6: Commit visual evidence**

```bash
git add index.html styles.css scripts/capture-screenshots.mjs screenshots
git commit -m "test(portfolio): refresh editorial visual evidence"
```

### Task 8: Lighthouse and final verification

**Files:**
- Modify only if verification reveals a defect in an already-covered requirement

- [ ] **Step 1: Run complete static verification**

```bash
bash tests/verify_stage1.sh
bash tests/verify_stage3.sh
node --check script.js
node scripts/verify-layout.mjs
git diff --check
```

Expected: every command exits zero.

- [ ] **Step 2: Run Lighthouse mobile and desktop**

Use Chrome Lighthouse against `http://127.0.0.1:4173/` with mobile and desktop presets. Record Performance, Accessibility, Best Practices, and SEO; each must exceed 95.

- [ ] **Step 3: Verify repository state and deliver**

Run:

```bash
git status --short
git log --oneline --decorate -10
```

Expected: clean worktree with small descriptive commits. Report the preview URL, screenshot paths, deliberate differences from the references, Lighthouse scores, and remaining `[CONFIRMAR]` items. Stop for visual review without merging or pushing unless explicitly requested.
