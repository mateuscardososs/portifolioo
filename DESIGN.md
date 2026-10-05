---
name: "Mateus Cardoso Portfolio"
description: "Portfolio pessoal escuro, tecnico e direto para oportunidades backend/full stack junior."
colors:
  bg: "#0b0f14"
  surface: "#10161d"
  surface-soft: "#141b23"
  section-muted: "#0d1319"
  text: "#e8edf2"
  muted: "#9ba7b4"
  subtle: "#6f7b88"
  line: "#22303b"
  accent: "#35d0b5"
  accent-ink: "#07100e"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 5.8rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(1.8rem, 3.4vw, 2.75rem)"
    fontWeight: 750
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  sm: "6px"
  md: "8px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "18px"
  2xl: "24px"
  3xl: "32px"
  section: "88px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "44px"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "44px"
    typography: "{typography.label}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "6px 10px"
    typography: "{typography.label}"
---

# Design System: Mateus Cardoso Portfolio

## 1. Overview

**Creative North Star: "Console de Credibilidade"**

O sistema visual deve parecer uma interface tecnica confiavel, nao uma fantasia hacker. A base escura cria foco e maturidade; o teal funciona como sinal de acao, evidencia e progresso. A pagina precisa ajudar recrutadores e tech leads a escanear rapidamente competencia, experiencia pratica, projetos e caminhos de contato.

A composicao e direta: blocos largos, grids simples, cartoes compactos e copy tecnica. A marca pode ser moderna e escura, mas nunca deve sacrificar legibilidade, clareza ou acesso aos links principais. O tom visual correto e tecnico, maduro e util.

**Key Characteristics:**
- Fundo escuro controlado com superficies discretas.
- Teal usado como acento raro para acao, prova e orientacao.
- Tipografia Inter em peso forte, sem troca decorativa de familias.
- Cartoes de raio curto, bordas finas e elevacao apenas em interacao.
- Motion progressivo, leve e sempre compativel com reducao de movimento.

## 2. Colors

A paleta e um sistema escuro de credibilidade tecnica: neutros frios carregam a leitura; teal marca os pontos que merecem atencao.

### Primary
- **Teal de Evidencia** (`accent`): usado em CTAs, links importantes, icones, marcadores, labels de projeto e estados hover. Deve aparecer pouco para continuar significando acao e prova.
- **Ink do Acento** (`accent-ink`): usado somente sobre `accent`, garantindo contraste e evitando botao neon ilegivel.

### Neutral
- **Preto Operacional** (`bg`): fundo principal. Mantem o portfolio serio e reduz ruido visual.
- **Superficie Tecnica** (`surface`): base de cartoes, menu mobile e paineis.
- **Superficie Elevada** (`surface-soft`): apoio para hover, chips e pequenas areas de agrupamento.
- **Faixa Silenciosa** (`section-muted`): alternancia de secoes sem criar uma segunda marca.
- **Texto Principal** (`text`): titulos, nomes, links fortes e conteudo essencial.
- **Texto Secundario** (`muted`): paragrafos e descricoes, sempre com contraste suficiente no fundo escuro.
- **Texto Terciario** (`subtle`): metadados curtos, nunca para conteudo longo.
- **Linha Estrutural** (`line`): bordas, divisores e contornos.

### Named Rules

**The Teal Earns Attention Rule.** O teal deve marcar decisao, evidencia tecnica ou estado de foco. Se tudo esta teal, nada esta importante.

**The Dark Is Quiet Rule.** O fundo escuro deve servir a leitura e a credibilidade. Nao transformar o portfolio em visual hacker/cyberpunk poluido.

## 3. Typography

**Display Font:** Inter with system fallbacks  
**Body Font:** Inter with system fallbacks  
**Label/Mono Font:** Inter with system fallbacks

**Character:** A tipografia e uma familia unica com contraste de peso, escala e espaçamento. Isso sustenta o tom direto: tecnico sem teatralidade, maduro sem parecer curriculo frio.

### Hierarchy
- **Display** (800, `clamp(2.6rem, 7vw, 5.8rem)`, `0.96`): hero principal. Deve ser raro e ocupar a primeira impressao.
- **Headline** (750, `clamp(1.8rem, 3.4vw, 2.75rem)`, `1.08`): titulos de secao e chamadas de bloco.
- **Title** (700, `1.06rem` a `1.25rem`, `1.3`): cards, projetos e experiencia.
- **Body** (400, `1rem`, `1.6`): descricoes tecnicas e narrativa profissional. Manter linhas confortaveis; blocos longos devem ficar abaixo de 75ch.
- **Label** (700-800, `0.74rem` a `0.9rem`, `0.08em` a `0.12em`, uppercase): metadados, eyebrow, datas, categoria de projeto e labels curtos.

### Named Rules

**The One Family Rule.** Nao adicionar serifas, monospace ou display fonts por decoracao. A identidade atual vem de escala, peso e hierarquia, nao de troca de fonte.

**The No Shouting Rule.** Display grande e permitido no hero; dentro de cards, sidebars e secoes densas, titulos devem continuar compactos e legiveis.

## 4. Elevation

O sistema usa uma mistura de camadas tonais, bordas finas e sombra sob demanda. Superficies ficam planas em repouso; o hover pode levantar o elemento para indicar interacao, mas nunca deve virar sombra decorativa pesada em todos os cartoes.

### Shadow Vocabulary
- **Panel Shadow** (`0 18px 50px rgba(0, 0, 0, 0.26)`): paineis de resumo e menus elevados.
- **Card Hover Shadow** (`0 18px 45px rgba(0, 0, 0, 0.3), 0 0 34px rgba(53, 208, 181, 0.08)`): cartoes interativos quando recebem hover.
- **Featured Project Shadow** (`0 24px 70px rgba(0, 0, 0, 0.36), 0 0 46px rgba(53, 208, 181, 0.12)`): somente para o projeto principal ou uma superficie realmente destacada.

### Named Rules

**The Lift Only on Intent Rule.** Sombra forte so aparece como resposta de interacao ou destaque real. Cartao estatico com borda e sombra grande ao mesmo tempo vira template generico.

**The Quiet Evidence Rule.** Cards informativos, timeline e chips tecnicos ficam estaveis. Movimento e glow ficam reservados para botoes, links de contato e projetos com acao clara.

## 5. Components

### Buttons
- **Shape:** retangulo tecnico com canto curto (`8px`) e altura minima clara (`44px`).
- **Primary:** fundo `accent`, texto `accent-ink`, peso 700 e brilho sutil no hover.
- **Hover / Focus:** hover sobe `-3px`; foco usa outline teal de `2px` com offset de `4px`.
- **Secondary:** transparente, borda `line`, texto `text`; no hover recebe borda teal e fundo `accent-soft`.

### Chips
- **Style:** pills compactas com fundo quase transparente, borda fina e texto `muted`.
- **State:** sem hover proprio; chips sao evidencia escaneavel, nao acionavel.

### Cards / Containers
- **Corner Style:** canto curto e preciso (`8px`).
- **Background:** `surface` em repouso; `surface-soft` ou `accent-soft` apenas para estado ou agrupamento.
- **Shadow Strategy:** planos em repouso; lift e glow suave apenas em cards com acao clara ou links.
- **Border:** `1px solid line` como estrutura principal.
- **Internal Padding:** `18px` para cards compactos, `24px` para projetos, `30px` para destaque principal.

### Competency Lists
- **Style:** listas textuais compactas com marcador teal pequeno.
- **Purpose:** explicar competencia por tipo de problema, sem transformar a stack em inventario visual de logos.
- **State:** estavel; sem hover, sem glow e sem movimento individual.

### Navigation
- **Style:** header sticky escuro com blur funcional, brand pequeno e links `muted`.
- **Default / Hover:** links devem clarear para `text`; nao usar underline decorativo pesado.
- **Mobile:** menu vira painel absoluto com fundo `surface`, borda `line`, raio `8px` e sombra de painel.

### Signature Component: Featured Project Card

O card principal de projeto usa borda com gradiente teal discreto e ocupa a largura inteira. Ele e o lugar certo para mais densidade tecnica: problema, solucao, highlights e tags. Nao replicar o mesmo tratamento em todos os cards; o destaque precisa continuar raro.

## 6. Do's and Don'ts

### Do:
- **Do** manter o portfolio como marca pessoal tecnica: confiante, maduro e direto.
- **Do** usar `#35d0b5` para CTAs, foco, icones e pequenos sinais de prioridade.
- **Do** preservar contraste forte em texto: `text` para informacao essencial, `muted` para descricao, `subtle` apenas para metadados curtos.
- **Do** usar raio curto (`8px`) em cartoes, botoes e paineis; pills ficam reservadas para tags e badges.
- **Do** manter motion leve, com `prefers-reduced-motion` e sem esconder conteudo essencial antes da animacao.
- **Do** reservar hover, lift e glow para elementos clicaveis ou cards com acao evidente.

### Don't:
- **Don't** deixar parecer template generico de portfolio.
- **Don't** transformar a pagina em curriculo corporativo sem personalidade.
- **Don't** usar visual hacker/cyberpunk poluido, neon excessivo, grid decorativo ou codigo falso como textura.
- **Don't** criar uma vitrine visual desconectada dos projetos; cada destaque precisa provar experiencia real.
- **Don't** usar landing page cheia de promessas vagas, copy inflada ou iconografia repetitiva sem significado.
- **Don't** adicionar gradiente em texto, bordas laterais grossas, cards com raio acima de `16px`, ou sombra grande decorativa em todo elemento.
- **Don't** aplicar hover em chips, timeline ou paineis informativos sem clique.
