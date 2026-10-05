# Personal Hero and Project Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the abstract opening with a personal portrait-led hero, strengthen the About copy, present four verified projects with balanced hierarchy, and correct the TRF5 end date.

**Architecture:** Keep the dependency-free single-page architecture. Content stays semantic in `index.html`, visual rules stay in `styles.css`, behavior remains in `script.js`, and shell contracts in `tests/verify_stage3.sh` guard approved copy, links, privacy boundaries, responsive structure, and local assets.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Bash contract tests, Playwright CLI, Lighthouse, local WOFF2 fonts.

---

## File structure

- `index.html`: semantic hero, About narrative, four project rows, compact evidence strip, corrected experience copy.
- `styles.css`: portrait-led hero, narrative About layout, balanced ruled project list, responsive treatment.
- `img/face2.png`: user-provided portrait copied from the main checkout.
- `tests/verify_stage3.sh`: content, asset, date, link, and removed-layout contracts.
- `screenshots/*.png`: refreshed desktop and mobile evidence for all six sections.
- `screenshots/README.md`: capture inventory and dimensions.

### Task 1: Define the new content contract

**Files:**
- Modify: `tests/verify_stage3.sh:41-90`
- Test: `tests/verify_stage3.sh`

- [ ] **Step 1: Replace the old hero and single-case assertions with the approved contract**

Add exact assertions for:

```bash
assert_contains index.html 'img/face2.png'
assert_contains index.html 'Backend Developer | Java &amp; Python'
assert_contains index.html 'Desenvolvo APIs, integrações e sistemas orientados a dados, com IA aplicada quando ela melhora de fato a operação.'
assert_contains index.html 'Backend que entende a operação inteira.'
assert_contains index.html 'No TRF5, entre março de 2025 e agosto de 2026'
assert_contains index.html 'Controle de Acesso'
assert_contains index.html 'Proposta Comercial'
assert_contains index.html 'AcervoIA'
assert_contains index.html 'Time Registry Platform'
assert_contains index.html 'Em desenvolvimento'
assert_contains index.html 'Mar 2025 — Ago 2026'
assert_contains index.html 'https://github.com/mateuscardososs/Proposta.comercial'
assert_contains index.html 'https://github.com/mateuscardososs/AcervoIA'
assert_not_contains index.html 'https://github.com/mateuscardososs/Face_api'
assert_not_contains index.html 'class="facts-table"'
assert_not_contains index.html 'class="principles-grid"'
assert_not_contains index.html 'class="case-detail"'
[[ -s img/face2.png ]] || fail 'img/face2.png must exist and not be empty'
```

Retain the exact Controle de Acesso assertions for 279 total tests, 260 local tests, 19 Docker integration tests, individual authorship, real-event use, and Intelbras provider state.

- [ ] **Step 2: Run the contract and verify RED**

Run:

```bash
bash tests/verify_stage3.sh
```

Expected: `FAIL: index.html must contain: img/face2.png`.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/verify_stage3.sh
git commit -m "test(portfolio): define personal hero and project contracts"
```

### Task 2: Implement verified content and portrait asset

**Files:**
- Create: `img/face2.png`
- Modify: `index.html:51-202`
- Modify: `index.html:227-244`
- Test: `tests/verify_stage3.sh`

- [ ] **Step 1: Copy the user-provided portrait into the isolated worktree**

Run:

```bash
cp /Users/mateuscardoso/dev/portifolio/portifolioo/img/face2.png img/face2.png
```

Expected: `file img/face2.png` reports a PNG image and `test -s img/face2.png` succeeds.

- [ ] **Step 2: Replace the hero with the approved personal composition**

Use one centered `.hero-profile` containing:

```html
<figure class="hero-portrait">
  <img src="img/face2.png" width="256" height="256" alt="Retrato de Mateus Cardoso">
  <figcaption aria-hidden="true">{ }</figcaption>
</figure>
<p class="hero-meta">BACKEND DEVELOPER · RECIFE, BRASIL</p>
<h1 id="hero-title">Mateus Cardoso</h1>
<p class="hero-role">Backend Developer | Java &amp; Python</p>
<p class="hero-intro">Desenvolvo APIs, integrações e sistemas orientados a dados, com IA aplicada quando ela melhora de fato a operação.</p>
```

Keep the two actions but rename them to `Ver projetos` and `Baixar currículo`. Remove the complete `.facts-table`.

- [ ] **Step 3: Replace the About principles with the approved narrative**

Use the exact three paragraphs and the `about-focus` list from the design spec:

```html
<ul class="about-focus" aria-label="Áreas de atuação">
  <li>Java + Python</li>
  <li>APIs + dados</li>
  <li>IA local</li>
</ul>
```

The section heading must be `Backend que entende a operação inteira.` and the TRF5 sentence must say `entre março de 2025 e agosto de 2026`.

- [ ] **Step 4: Replace the long single case with four balanced project rows**

Create four `.project-row` articles in this order:

1. Controle de Acesso — `Case principal · Java` — public repository link.
2. Proposta Comercial — `Sistema operacional · Python + IA local` — public repository link.
3. AcervoIA — `Em desenvolvimento · FastAPI + busca semântica` — public repository link.
4. Time Registry Platform — `Projeto privado · Java + AWS` — no anchor and no GitHub URL.

Each row contains one concise problem/solution paragraph and one `.technology-list`. Only Controle de Acesso contains `.project-proof`, with the exact test split and a compact `.evidence-links` list pointing to the already-approved Maven, test, Flyway, provider test, and Dockerfile targets.

Remove `.case-detail`, every `.case-row`, and the old multi-screen narrative.

- [ ] **Step 5: Correct the TRF5 date and tense**

Change the period to `Mar 2025 — Ago 2026`. Change present-tense introductory verbs to past tense:

```html
<p>Atuei no desenvolvimento de soluções internas que conectavam APIs, dados e automação de processos.</p>
```

Keep the approved Qlik sentence brief and link-free, adjusted to past tense: `Também atuei em uma solução interna de monitoramento de ambientes Qlik.`

- [ ] **Step 6: Run the contract and verify GREEN**

Run:

```bash
bash tests/verify_stage1.sh
bash tests/verify_stage3.sh
```

Expected: both scripts print `PASS`.

- [ ] **Step 7: Commit content and asset**

```bash
git add img/face2.png index.html tests/verify_stage3.sh
git commit -m "feat(portfolio): add personal hero and project portfolio"
```

### Task 3: Implement the approved editorial layouts

**Files:**
- Modify: `styles.css:251-613`
- Test: `tests/verify_stage3.sh`
- Test: `scripts/verify-layout.mjs`

- [ ] **Step 1: Write CSS contract assertions before production CSS**

Add:

```bash
assert_contains styles.css '.hero-profile'
assert_contains styles.css '.hero-portrait'
assert_contains styles.css '.about-focus'
assert_contains styles.css '.projects-list'
assert_contains styles.css '.project-proof'
assert_contains styles.css '.evidence-links'
assert_not_contains styles.css '.facts-table'
assert_not_contains styles.css '.principles-grid'
assert_not_contains styles.css '.case-detail'
```

Run `bash tests/verify_stage3.sh` and expect failure on `.hero-profile`.

- [ ] **Step 2: Implement the centered hero**

Replace the 12-column hero rules with:

```css
.hero-profile {
    width: min(760px, 100%);
    margin-inline: auto;
    text-align: center;
}

.hero-portrait {
    position: relative;
    width: 144px;
    height: 144px;
    margin: 0 auto 32px;
    padding: 4px;
    border: 1px solid var(--accent);
    border-radius: 50%;
}

.hero-portrait img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
}
```

Place the `{ }` badge at the lower-right, set the name to `clamp(3.2rem, 7vw, 6.2rem)`, and center the buttons without introducing gradients or shadows.

- [ ] **Step 3: Implement narrative About and balanced project rows**

Keep `.section-grid`, remove obsolete principle/case selectors, and implement:

```css
.about-copy > p:first-child { font-size: clamp(1.2rem, 2vw, 1.5rem); color: #C8C6C1; }
.about-copy p + p { margin-top: 24px; }
.about-focus { display: flex; flex-wrap: wrap; gap: 16px 30px; margin: 42px 0 0; padding: 24px 0 0; border-top: 1px solid var(--border); list-style: none; }
.projects-list { border-top: 1px solid var(--border); }
.projects-list .project-row { border-top: 0; }
.project-proof { margin-top: 20px; padding-left: 14px; border-left: 1px solid var(--accent); }
.evidence-links { display: flex; flex-wrap: wrap; gap: 10px 20px; margin: 20px 0 0; padding: 0; list-style: none; }
```

Keep all four projects visually equal except for the extra proof/evidence content on the first row.

- [ ] **Step 4: Add mobile rules**

At `max-width: 760px`, use a 112px portrait, full-width actions, one-column About, and project rows with `38px minmax(0, 1fr) 24px`. Ensure summaries and technologies start in column 2 and evidence links stack without horizontal overflow.

- [ ] **Step 5: Verify CSS contracts and responsive layout**

Run:

```bash
bash tests/verify_stage3.sh
node scripts/verify-layout.mjs
```

Expected: contract PASS and no overflow/external requests at 375, 768, and 1280 px.

- [ ] **Step 6: Commit styles**

```bash
git add styles.css tests/verify_stage3.sh
git commit -m "feat(portfolio): style portrait hero and project index"
```

### Task 4: Refresh visual evidence and metadata checks

**Files:**
- Modify: `screenshots/desktop-hero.png`
- Modify: `screenshots/desktop-sobre.png`
- Modify: `screenshots/desktop-projetos.png`
- Modify: `screenshots/desktop-stack.png`
- Modify: `screenshots/desktop-experiencia.png`
- Modify: `screenshots/desktop-contato.png`
- Modify: `screenshots/mobile-hero.png`
- Modify: `screenshots/mobile-sobre.png`
- Modify: `screenshots/mobile-projetos.png`
- Modify: `screenshots/mobile-stack.png`
- Modify: `screenshots/mobile-experiencia.png`
- Modify: `screenshots/mobile-contato.png`

- [ ] **Step 1: Start or verify the loopback preview**

Run:

```bash
lsof -nP -iTCP:4173 -sTCP:LISTEN
curl -fsS http://127.0.0.1:4173/ | grep -F '<title>Mateus Cardoso | Backend Developer</title>'
```

Expected: the existing Python preview listens only on `127.0.0.1:4173` and serves the redesign worktree.

- [ ] **Step 2: Capture all sections**

Run:

```bash
node scripts/capture-screenshots.mjs
```

Expected: twelve screenshots, desktop 1440 × 1000 and mobile 390 × 844.

- [ ] **Step 3: Inspect every capture**

Open hero, About, projects, stack, experience, and contact at both sizes. Correct clipped portrait, weak hierarchy, overlong project rows, awkward line breaks, or horizontal overflow, then repeat Steps 2 and 3.

- [ ] **Step 4: Commit visual evidence**

```bash
git add screenshots
git commit -m "test(portfolio): refresh expanded portfolio screenshots"
```

### Task 5: Final verification

**Files:**
- Verify only

- [ ] **Step 1: Run all repository checks**

```bash
bash tests/verify_stage1.sh
bash tests/verify_stage3.sh
node --check script.js
node scripts/verify-layout.mjs
git diff --check
```

Expected: all commands pass.

- [ ] **Step 2: Run Lighthouse mobile and desktop**

```bash
npx --yes lighthouse http://127.0.0.1:4173/ --quiet --chrome-flags='--headless=new --no-sandbox' --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/portfolio-mobile.json
npx --yes lighthouse http://127.0.0.1:4173/ --quiet --preset=desktop --chrome-flags='--headless=new --no-sandbox' --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/portfolio-desktop.json
```

Expected: every category is greater than 95.

- [ ] **Step 3: Confirm clean branch and preserved preview**

```bash
git status --short
git log --oneline -8
lsof -nP -iTCP:4173 -sTCP:LISTEN
```

Expected: no status output, the branch contains small descriptive commits, and the preview remains available at `http://127.0.0.1:4173/`.
