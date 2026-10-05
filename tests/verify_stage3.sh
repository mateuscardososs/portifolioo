#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

fail() { printf 'FAIL: %s\n' "$1" >&2; exit 1; }
assert_contains() { grep -Fq -- "$2" "$1" || fail "$1 must contain: $2"; }
assert_not_contains() { if grep -Fq -- "$2" "$1"; then fail "$1 must not contain: $2"; fi; }
assert_count() {
    local actual
    actual="$(grep -Foc -- "$2" "$1" || true)"
    [[ "$actual" -eq "$3" ]] || fail "$1 must contain '$2' exactly $3 time(s), found $actual"
}

assert_section_order() {
    local previous=0 section_id line
    for section_id in inicio sobre projetos stack experiencia contato; do
        line="$(grep -n "id=\"$section_id\"" index.html | cut -d: -f1 || true)"
        [[ -n "$line" ]] || fail "missing section #$section_id"
        [[ "$line" -gt "$previous" ]] || fail "section #$section_id is out of order"
        previous="$line"
    done
}

assert_count index.html '<h1' 1
assert_section_order

# Metadata and discoverability.
assert_contains index.html '<title>Mateus Cardoso | Backend Developer</title>'
assert_contains index.html 'Backend Developer com Java e Python, focado em APIs, integrações, dados e IA aplicada. Portfólio de Mateus Cardoso, em Recife.'
assert_contains index.html '<link rel="canonical" href="https://portifolioo-opal.vercel.app/">'
assert_contains index.html '<meta property="og:title" content="Mateus Cardoso | Backend Developer">'
assert_contains index.html '<meta property="og:image" content="https://portifolioo-opal.vercel.app/og-image.png">'
assert_contains index.html '<meta property="og:image:width" content="1200">'
assert_contains index.html '<meta property="og:image:height" content="630">'
assert_contains index.html '<meta property="og:image:alt" content="Mateus Cardoso — Backend Developer">'
assert_contains index.html '<link rel="icon" href="favicon.svg" type="image/svg+xml">'

# Approved positioning and content.
assert_contains index.html 'BACKEND DEVELOPER'
assert_contains index.html 'img/face2.png'
assert_contains index.html 'Backend Developer | Java &amp; Python'
assert_contains index.html 'Desenvolvo APIs, integrações e sistemas orientados a dados, com IA aplicada quando ela melhora de fato a operação.'
assert_contains index.html 'Backend que entende a operação inteira.'
assert_contains index.html 'No TRF5, entre março de 2025 e agosto de 2026'
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
assert_contains index.html '279 testes no total'
assert_contains index.html '260 executados localmente'
assert_contains index.html '19 testes de integração dependentes de Docker'
assert_contains index.html 'class="project-proof-line"'
assert_contains index.html '<details class="project-details">'
assert_contains index.html '<summary>Ver evidências técnicas</summary>'
assert_contains index.html 'Projeto desenvolvido individualmente.'
assert_contains index.html 'usado em evento de grande porte'
assert_contains index.html 'Provider real validado em controladora Intelbras via CGI com autenticação Digest.'
assert_contains index.html 'Modo fake mantido como padrão de desenvolvimento.'
assert_contains index.html 'compatibilidade depende do modelo e do firmware'
assert_contains index.html 'Também atuei em uma solução interna de monitoramento de ambientes Qlik.'
assert_contains index.html 'Desenvolvedor Backend Júnior'
assert_contains index.html 'remoto, híbrido ou presencial'
assert_contains index.html 'Ciência da Computação'
assert_contains index.html 'concluída em 2026.1'
assert_contains index.html 'Oracle Cloud Infrastructure 2025 Foundations Associate'
assert_contains index.html 'mateus7.cardoso@hotmail.com'
assert_contains index.html 'mateus7.cardoso@<wbr>hotmail.com'
assert_not_contains index.html 'aria-label="Mateus Cardoso — início"'
assert_contains index.html 'linkedin.com/in/mateus-cardosos'
assert_contains index.html 'Contato secundário'
assert_contains index.html 'Feito com HTML, CSS e JavaScript'
assert_not_contains index.html 'DISPONÍVEL'
assert_not_contains index.html 'Disponível para'
assert_not_contains index.html 'id="competencias"'
assert_not_contains index.html 'Qlik Monitoring Service'
assert_not_contains index.html 'qlik-monitoring-service'
assert_not_contains index.html '[CONFIRMAR'
assert_not_contains index.html 'São João de Caruaru'

# Evidence must point only to reviewed public repository targets.
assert_contains index.html 'https://github.com/mateuscardososs/Controle-de-acesso/blob/main/pom.xml'
assert_contains index.html 'https://github.com/mateuscardososs/Controle-de-acesso/blob/main/src/test/java/br/com/sport/accesscontrol/common/CpfValidatorTests.java'
assert_contains index.html 'https://github.com/mateuscardososs/Controle-de-acesso/blob/main/src/test/java/br/com/sport/accesscontrol/integration/intelbras/provider/IntelbrasProviderModeTests.java'
assert_contains index.html 'https://github.com/mateuscardososs/Controle-de-acesso/tree/main/src/main/resources/db/migration'
assert_contains index.html 'https://github.com/mateuscardososs/Controle-de-acesso/blob/main/Dockerfile'
assert_not_contains index.html 'blob/main/docker-compose.yml'
assert_not_contains index.html 'blob/main/docker-compose.prod.yml'
assert_not_contains index.html 'blob/main/README.md'
assert_not_contains index.html 'blob/main/.env'
assert_not_contains index.html 'application-prod'
assert_not_contains index.html '?password='
assert_not_contains index.html '?token='

# Editorial tokens and forbidden former direction.
for token in \
    '--background: #030303' \
    '--surface: #050505' \
    '--text: #EEEDEA' \
    '--muted: #8D8981' \
    '--muted-deep: #7E7B74' \
    '--border: #171717' \
    '--accent: #D2AE63'; do
    assert_contains styles.css "$token"
done
assert_not_contains styles.css '#7C6CFF'
assert_not_contains styles.css '#4FD1C5'
assert_not_contains styles.css 'gradient('
assert_not_contains styles.css 'box-shadow:'
assert_contains styles.css '[data-reveal]'
assert_contains styles.css '.capture-mode [data-reveal]'
assert_contains styles.css 'html.capture-mode'
assert_contains styles.css '@media (prefers-reduced-motion: reduce)'
assert_contains styles.css ':focus-visible'
assert_contains styles.css '.hero-profile'
assert_contains styles.css '.hero-portrait'
assert_contains styles.css '.about-focus'
assert_contains styles.css '.projects-list'
assert_contains styles.css '.project-proof'
assert_contains styles.css '.project-proof-line'
assert_contains styles.css '.project-details'
assert_contains styles.css '.evidence-links'
assert_not_contains styles.css '.facts-table'
assert_not_contains styles.css '.principles-grid'
assert_not_contains styles.css '.case-detail'

# Local typography and licenses.
assert_not_contains index.html 'fonts.googleapis.com'
assert_not_contains index.html 'fonts.gstatic.com'
assert_contains index.html 'href="assets/fonts/fonts.css"'
assert_contains index.html 'href="assets/fonts/archivo-latin-wght-normal.woff2"'
assert_contains index.html 'href="assets/fonts/source-sans-3-latin-wght-normal.woff2"'
assert_count index.html 'rel="preload" as="font"' 2
for font_file in \
    assets/fonts/archivo-latin-wght-normal.woff2 \
    assets/fonts/source-sans-3-latin-wght-normal.woff2 \
    assets/fonts/ibm-plex-mono-latin-400-normal.woff2 \
    assets/fonts/ibm-plex-mono-latin-500-normal.woff2; do
    [[ -s "$font_file" ]] || fail "$font_file must exist and not be empty"
done
assert_contains assets/fonts/fonts.css 'font-family: "Archivo"'
assert_contains assets/fonts/fonts.css 'font-family: "Source Sans 3"'
assert_contains assets/fonts/fonts.css 'font-family: "IBM Plex Mono"'
assert_count assets/fonts/fonts.css 'font-display: swap' 4
assert_count assets/fonts/fonts.css 'size-adjust:' 3
assert_count assets/fonts/fonts.css 'ascent-override:' 3
assert_count assets/fonts/fonts.css 'unicode-range: U+0000-00FF' 4
for license_file in assets/fonts/licenses/Archivo-OFL.txt assets/fonts/licenses/Source-Sans-3-OFL.txt assets/fonts/licenses/IBM-Plex-Mono-OFL.txt; do
    assert_contains "$license_file" 'SIL OPEN FONT LICENSE Version 1.1'
done

# Behavior and accessibility.
assert_contains index.html 'class="skip-link"'
assert_contains index.html 'id="copy-email"'
assert_contains index.html 'id="recife-time"'
assert_contains script.js 'navigator.clipboard.writeText'
assert_contains script.js 'IntersectionObserver'
assert_contains script.js 'aria-current'
assert_contains script.js 'prefers-reduced-motion'
assert_contains script.js 'America/Recife'
assert_contains script.js 'Intl.DateTimeFormat'
assert_contains script.js 'document.fonts.ready'
assert_contains script.js 'history.replaceState'
assert_contains script.js 'window.scrollTo'
assert_contains script.js 'left: 0'
assert_not_contains script.js 'initHeroGlow'
node --check script.js

# Social card.
[[ -f og-image.png ]] || fail 'og-image.png must exist'
read -r og_width og_height < <(node -e '
    const image = require("fs").readFileSync("og-image.png");
    process.stdout.write(`${image.readUInt32BE(16)} ${image.readUInt32BE(20)}\n`);
')
[[ "$og_width" -eq 1200 && "$og_height" -eq 630 ]] || fail "og-image.png must be 1200x630"
og_bytes="$(node -e 'process.stdout.write(String(require("fs").statSync("og-image.png").size))')"
[[ "$og_bytes" -lt 307200 ]] || fail "og-image.png must be smaller than 300 KiB, found $og_bytes bytes"
assert_count tools/og-image.html 'Mateus Cardoso' 1
assert_count tools/og-image.html 'Backend Developer' 1
assert_contains tools/og-image.html 'Java · Python · APIs · Integrações · Dados · IA aplicada'
assert_contains tools/og-image.html '../assets/fonts/fonts.css'
assert_not_contains tools/og-image.html 'gradient('
assert_not_contains tools/og-image.html 'http://'
assert_not_contains tools/og-image.html 'https://'

# Deterministic visual evidence.
assert_contains scripts/capture-screenshots.mjs 'playwright'
assert_contains scripts/capture-screenshots.mjs '?capture=1#'
for section_name in hero sobre projetos stack experiencia contato; do
    assert_contains scripts/capture-screenshots.mjs "[\"$section_name\""
    for viewport in desktop mobile; do
        screenshot="screenshots/${viewport}-${section_name}.png"
        [[ -s "$screenshot" ]] || fail "$screenshot must exist and not be empty"
        read -r shot_width shot_height < <(SCREENSHOT="$screenshot" node -e '
            const image = require("fs").readFileSync(process.env.SCREENSHOT);
            process.stdout.write(`${image.readUInt32BE(16)} ${image.readUInt32BE(20)}\n`);
        ')
        if [[ "$viewport" == desktop ]]; then
            [[ "$shot_width" -eq 1440 && "$shot_height" -eq 1000 ]] || fail "$screenshot must be 1440x1000"
        else
            [[ "$shot_width" -eq 390 && "$shot_height" -eq 844 ]] || fail "$screenshot must be 390x844"
        fi
    done
done

assert_not_contains index.html 'cdn.jsdelivr.net'
assert_not_contains index.html 'unpkg.com'
printf 'PASS: Stage 3 editorial content and design contracts\n'
