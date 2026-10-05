#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

fail() {
    printf 'FAIL: %s\n' "$1" >&2
    exit 1
}

assert_contains() {
    grep -Fq -- "$2" "$1" || fail "$1 must contain: $2"
}

assert_not_contains() {
    if grep -Fq -- "$2" "$1"; then
        fail "$1 must not contain: $2"
    fi
}

assert_count() {
    local actual
    actual="$(grep -Foc -- "$2" "$1" || true)"
    [[ "$actual" -eq "$3" ]] || fail "$1 must contain '$2' exactly $3 time(s), found $actual"
}

assert_section_order() {
    local previous=0
    local section_id line

    for section_id in inicio experiencia case-controle competencias formacao contato; do
        line="$(grep -n "id=\"$section_id\"" index.html | cut -d: -f1 || true)"
        [[ -n "$line" ]] || fail "missing section #$section_id"
        [[ "$line" -gt "$previous" ]] || fail "section #$section_id is out of order"
        previous="$line"
    done
}

assert_count index.html '<h1' 1
assert_section_order

assert_contains index.html 'class="skip-link"'
assert_contains index.html 'href="#case-controle"'
assert_contains index.html '<link rel="canonical" href="https://portifolioo-opal.vercel.app/">'
assert_contains index.html '<meta property="og:url" content="https://portifolioo-opal.vercel.app/">'
assert_contains index.html '<meta property="og:image" content="https://portifolioo-opal.vercel.app/og-image.png">'
assert_contains index.html '<meta property="og:image:type" content="image/png">'
assert_contains index.html '<meta property="og:image:width" content="1200">'
assert_contains index.html '<meta property="og:image:height" content="630">'
assert_contains index.html '<meta property="og:image:alt" content="Mateus Cardoso — Desenvolvedor Backend Java">'
[[ -f og-image.png ]] || fail 'og-image.png must exist'

read -r og_width og_height < <(node -e '
    const image = require("fs").readFileSync("og-image.png");
    process.stdout.write(`${image.readUInt32BE(16)} ${image.readUInt32BE(20)}\n`);
')
[[ "$og_width" -eq 1200 ]] || fail "og-image.png width must be 1200px, found ${og_width:-unknown}"
[[ "$og_height" -eq 630 ]] || fail "og-image.png height must be 630px, found ${og_height:-unknown}"
og_bytes="$(node -e 'process.stdout.write(String(require("fs").statSync("og-image.png").size))')"
[[ "$og_bytes" -lt 307200 ]] || fail "og-image.png must be smaller than 300 KiB, found $og_bytes bytes"

[[ -f tools/og-image.html ]] || fail 'tools/og-image.html must exist'
[[ -f scripts/generate-og-image.mjs ]] || fail 'scripts/generate-og-image.mjs must exist'
assert_count tools/og-image.html 'Mateus Cardoso' 1
assert_count tools/og-image.html 'Desenvolvedor Backend Java' 1
assert_contains tools/og-image.html '../assets/fonts/fonts.css'
assert_not_contains tools/og-image.html 'http://'
assert_not_contains tools/og-image.html 'https://'
assert_contains scripts/generate-og-image.mjs '--window-size=1200,630'
assert_contains scripts/generate-og-image.mjs 'og-image.png'

assert_contains index.html 'Desenvolvedor Backend Java'
assert_contains index.html 'mais de 250 testes automatizados'
assert_contains index.html 'Projeto desenvolvido individualmente.'
assert_contains index.html 'Também atuo em uma solução interna de monitoramento de ambientes Qlik.'
assert_contains index.html 'Fev 2023 — Fev 2025'
assert_contains index.html 'concluída em 2026.1'
assert_contains index.html 'Oracle Cloud Infrastructure 2025 Foundations Associate'
assert_contains index.html 'Provider real validado em controladora Intelbras via CGI com autenticação Digest.'
assert_contains index.html 'compatibilidade depende do modelo e do firmware'

assert_not_contains index.html 'id="sobre"'
assert_not_contains index.html 'Qlik Monitoring Service'
assert_not_contains index.html 'qlik-monitoring-service'
assert_not_contains index.html '[CONFIRMAR'
assert_not_contains index.html 'Não são apresentados percentuais'
assert_not_contains index.html 'A integração não deve ser descrita como'
assert_not_contains index.html 'Portanto, o estado correto é'
assert_not_contains index.html 'falta de autorização confirmada'
assert_not_contains index.html '33 commits'

for token in \
    '--bg: #0B0D10' \
    '--surface: #12161B' \
    '--border: #29313A' \
    '--text: #F2F5F7' \
    '--text-muted: #A8B2BD' \
    '--accent: #5BB8FF' \
    '--accent-ink: #06111A'; do
    assert_contains styles.css "$token"
done

assert_not_contains index.html 'fonts.googleapis.com'
assert_not_contains index.html 'fonts.gstatic.com'
assert_contains index.html 'href="assets/fonts/fonts.css"'
assert_contains index.html 'href="assets/fonts/archivo-latin-wght-normal.woff2"'
assert_contains index.html 'href="assets/fonts/source-sans-3-latin-wght-normal.woff2"'
assert_count index.html 'rel="preload" as="font"' 2

for font_file in \
    assets/fonts/archivo-latin-wght-normal.woff2 \
    assets/fonts/source-sans-3-latin-wght-normal.woff2 \
    assets/fonts/azeret-mono-latin-wght-normal.woff2; do
    [[ -s "$font_file" ]] || fail "$font_file must exist and not be empty"
done

assert_contains assets/fonts/fonts.css 'font-family: "Archivo"'
assert_contains assets/fonts/fonts.css 'font-weight: 700 800'
assert_contains assets/fonts/fonts.css 'font-family: "Source Sans 3"'
assert_contains assets/fonts/fonts.css 'font-weight: 400 700'
assert_contains assets/fonts/fonts.css 'font-family: "Azeret Mono"'
assert_contains assets/fonts/fonts.css 'font-weight: 500 600'
assert_count assets/fonts/fonts.css 'font-display: swap' 3
assert_count assets/fonts/fonts.css 'size-adjust:' 3
assert_count assets/fonts/fonts.css 'ascent-override:' 3
assert_count assets/fonts/fonts.css 'unicode-range: U+0000-00FF' 3

for license_file in \
    assets/fonts/licenses/Archivo-OFL.txt \
    assets/fonts/licenses/Source-Sans-3-OFL.txt \
    assets/fonts/licenses/Azeret-Mono-OFL.txt; do
    assert_contains "$license_file" 'SIL OPEN FONT LICENSE Version 1.1'
done

assert_contains styles.css '"Archivo Fallback"'
assert_contains styles.css '"Source Sans 3 Fallback"'
assert_contains styles.css '"Azeret Mono Fallback"'
assert_contains styles.css 'grid-template-columns: repeat(12, minmax(0, 1fr))'
assert_contains styles.css '@media (prefers-reduced-motion: reduce)'
assert_contains styles.css ':focus-visible'
assert_contains index.html 'id="copy-email"'
assert_contains script.js 'navigator.clipboard.writeText'
assert_contains script.js 'IntersectionObserver'
assert_contains script.js "aria-current"

assert_not_contains index.html 'cdn.jsdelivr.net'
assert_not_contains index.html 'unpkg.com'
assert_not_contains script.js 'initScrollReveal'

node --check script.js

printf 'PASS: Stage 3 content and design contracts\n'
