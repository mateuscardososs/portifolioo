#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

assert_contains() {
    local file="$1"
    local pattern="$2"

    if ! grep -Fq -- "$pattern" "$file"; then
        printf 'FAIL: %s must contain %s\n' "$file" "$pattern" >&2
        exit 1
    fi
}

assert_not_contains() {
    local file="$1"
    local pattern="$2"

    if grep -Fq -- "$pattern" "$file"; then
        printf 'FAIL: %s must not contain %s\n' "$file" "$pattern" >&2
        exit 1
    fi
}

for pattern in '.env' '.env.*' '!.env.example' 'node_modules/' '*.db' '*.sqlite' '*.sqlite3' '*.log' 'logs/' 'tmp/' 'temp/'; do
    assert_contains .gitignore "$pattern"
done

assert_not_contains index.html 'Enterprise Management API'
assert_not_contains index.html 'enterprise-management-api'
assert_not_contains index.html 'TranscribeIA'
assert_not_contains index.html 'github.com/mateuscardososs/TranscribeIA'
assert_not_contains index.html 'Proposta Comercial'
assert_not_contains index.html 'github.com/mateuscardososs/Proposta.comercial'

assert_contains index.html 'Controle de Acesso'
assert_contains index.html 'github.com/mateuscardososs/Controle-de-acesso'
assert_contains index.html 'Qlik Monitoring Service'
assert_contains index.html 'github.com/mateuscardososs/qlik-monitoring-service'

assert_contains index.html 'mailto:mateus7.cardoso@hotmail.com'
assert_contains index.html '<strong>mateus7.cardoso@hotmail.com</strong>'
assert_contains index.html 'https://www.linkedin.com/in/mateus-cardosos'
assert_contains index.html '<strong>/in/mateus-cardosos</strong>'
assert_not_contains index.html 'mateus7.cardosos@hotmail.com'
assert_not_contains index.html 'mateus-cardoso-294a86238'

assert_contains README.md 'mateus7.cardoso@hotmail.com'
assert_contains README.md 'https://www.linkedin.com/in/mateus-cardosos'

whatsapp_line="$(grep -n 'wa.me/' index.html | cut -d: -f1)"
whatsapp_count="$(grep -c 'wa.me/' index.html)"
contact_line="$(grep -n 'id="contato"' index.html | cut -d: -f1)"

if [[ "$whatsapp_count" -ne 1 || -z "$whatsapp_line" || -z "$contact_line" || "$whatsapp_line" -le "$contact_line" ]]; then
    printf 'FAIL: WhatsApp must remain only in the contact section\n' >&2
    exit 1
fi

if git ls-files | grep -Eiq '(^|/)(node_modules|tmp|temp|logs?)(/|$)|(^|/)\.env($|\.)|\.(db|sqlite|sqlite3|log)$'; then
    printf 'FAIL: sensitive or generated runtime files are tracked\n' >&2
    exit 1
fi

printf 'PASS: Stage 1 structural checks\n'
