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

assert_contains index.html 'family=Archivo'
assert_contains index.html 'family=Azeret+Mono'
assert_contains index.html 'family=Source+Sans+3'
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
