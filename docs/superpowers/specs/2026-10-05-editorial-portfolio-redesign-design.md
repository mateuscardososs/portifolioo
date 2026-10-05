# Redesign editorial do portfólio

## Objetivo

Substituir integralmente a direção visual índigo/bento e a apresentação em formato de dossiê por um portfólio editorial escuro, inspirado nos seis screenshots fornecidos em `reference/`. O site deve reproduzir o sistema visual das referências — paleta, tipografia, grid, componentes e ritmo — sem copiar nenhum conteúdo fictício.

A página tem um único trabalho: posicionar Mateus Cardoso como **Backend Developer**, com Java e Python e foco em APIs, integrações, dados e IA aplicada, usando o Controle de Acesso como prova técnica principal.

## Escopo e restrições

- Manter HTML, CSS e JavaScript puros.
- Não adicionar bibliotecas ou dependências de runtime.
- Não realizar nenhuma requisição de terceiros.
- Preservar o conteúdo factual aprovado e não publicar métricas, cargos, tecnologias ou resultados não confirmados.
- Manter Qlik somente como uma frase breve na experiência do TRF5, sem case e sem link.
- Manter WhatsApp como contato secundário.
- Não mencionar o nome do evento; usar “evento de grande porte”.
- Não usar o conteúdo fictício presente nas referências.

## Direção visual escolhida

A implementação seguirá a abordagem de **réplica editorial adaptativa**. A composição reproduzirá a estrutura e o ritmo das referências, mas permitirá que seções com evidência técnica ocupem a altura necessária para manter legibilidade e semântica.

Não haverá gradientes, sombras, glassmorphism, bento grid, cards coloridos, brilhos ou elementos decorativos sem função. A identidade será construída com tipografia, espaço negativo, alinhamento e divisórias.

### Paleta

As cores abaixo foram derivadas por amostragem dos screenshots:

| Token | Valor | Uso |
|---|---:|---|
| `--background` | `#030303` | Fundo principal |
| `--surface` | `#050505` | Header e variações quase imperceptíveis |
| `--text` | `#EEEDEA` | Títulos e conteúdo principal |
| `--muted` | `#8D8981` | Corpo e labels pequenos; contraste 5,92:1 |
| `--muted-deep` | `#7E7B74` | Texto secundário maior; contraste 4,88:1 |
| `--border` | `#171717` | Linhas e divisórias de 1 px |
| `--accent` | `#D2AE63` | Números, empresa, sublinhado e hover; contraste 9,80:1 |

Os contrastes foram calculados contra `#030303`. `--muted-deep` não será usado em texto pequeno ou fino.

### Tipografia

- **Títulos:** Archivo, pesos 500 e 600, tracking negativo discreto.
- **Corpo:** Source Sans 3, pesos 400 e 600. Entre Source Sans 3 e IBM Plex Sans, Source Sans 3 é a correspondência mais próxima da referência por sua abertura, proporção humanista e ritmo menos industrial.
- **Metadados:** IBM Plex Mono, pesos 400 e 500, caixa alta e tracking amplo.

Todas as famílias serão hospedadas localmente em WOFF2 com subset latino, `font-display: swap`, fallbacks com métricas ajustadas e licenças OFL registradas. Archivo e Source Sans 3 serão preloadadas por aparecerem no primeiro viewport.

### Grid e ritmo

- Container de aproximadamente 1180 px, centralizado.
- Header fixo de altura compacta e fundo translúcido quase opaco.
- Seções editoriais em duas colunas: identificação e título à esquerda; conteúdo à direita.
- Hero em duas colunas com proporção aproximada de 2/3 para a mensagem e 1/3 para os fatos.
- Divisórias horizontais de 1 px entre itens.
- Muito espaço vertical, sem forçar todas as seções a uma única viewport.
- Em telas menores, todas as grades passam para uma coluna e preservam a ordem de leitura.

## Arquitetura da página

### Header

- Monograma `MC` em uma caixa fina.
- Nome `MATEUS CARDOSO` em IBM Plex Mono.
- Navegação: `SOBRE`, `PROJETOS`, `STACK`, `EXPERIÊNCIA`, `CONTATO`.
- Sem status de disponibilidade no header.
- Link ativo indicado por texto mais claro e linha âmbar curta.
- Menu acessível e compacto em telas pequenas.

### Hero

- Eyebrow: `BACKEND DEVELOPER`.
- Linha de contexto: `JAVA E PYTHON · RECIFE, BRASIL`.
- Título: `Construo APIs e serviços que conectam regras de negócio, dados e operações.`
- Apoio: foco em Java e Python, com APIs, integrações, dados e IA aplicada.
- CTA primário: `VER CASE TÉCNICO`.
- CTA secundário: `CURRÍCULO`.

Tabela factual:

| Campo | Valor |
|---|---|
| BASE | Recife, Brasil |
| FUSO | GMT-3 |
| FOCO | APIs · Integrações / Dados · IA aplicada |
| STACK | Java · Python · SQL |
| ATUAL | Estágio de Desenvolvedor de Software · TRF5 |
| PROVA | 250+ testes automatizados no case principal |

Não haverá linha `STATUS` nem anúncio de disponibilidade no hero.

### 01 / Sobre — “Como construo”

Dois parágrafos curtos apresentarão somente o posicionamento aprovado: backend com Java e Python; APIs, integrações, dados e IA aplicada. Não serão atribuídas preferências ou métodos pessoais que Mateus não tenha declarado.

Quatro itens serão derivados de fatos verificáveis do Controle de Acesso:

1. Testável sem hardware: provider fake para desenvolvimento e testes automatizados.
2. Banco com histórico: migrações versionadas com Flyway.
3. Permissões explícitas: JWT e RBAC.
4. Trabalho lento fora do fluxo principal: RabbitMQ para sincronização e WebSocket para atualização da interface.

### 02 / Projetos — “Case técnico”

Haverá somente uma linha de projeto:

- **Controle de Acesso**
- Meta: `SISTEMA FULL STACK · 2026`
- Tecnologias: Java 21, Spring Boot 3, PostgreSQL, RabbitMQ, WebSocket e Next.js.
- Prova resumida: `Desenvolvido individualmente · usado em evento de grande porte · 250+ testes automatizados`.

O detalhe do case manterá os textos aprovados de Contexto, Decisão técnica, Evidência, Resultado e Estado da integração Intelbras. A contagem detalhada será apresentada exatamente assim: **279 testes no total; 260 executados localmente; 19 testes de integração dependem de Docker.**

#### Registro de evidências

Cada evidência terá um link para o arquivo ou diretório público que a comprova, incluindo:

- suíte de testes;
- migrações Flyway;
- arquivos Docker Compose;
- instruções do README.

Antes de publicar qualquer link, o alvo será inspecionado para IPs, credenciais, segredos, domínios internos, nomes ou dados reais. Um arquivo com qualquer indício sensível não será linkado. Os links serão profundos, apontando para a branch pública `main` do repositório `mateuscardososs/Controle-de-acesso`.

### 03 / Stack — “Ferramentas”

Tabela em quatro linhas, sem logos:

- Projetar APIs.
- Modelar dados.
- Integrar sistemas.
- Operar serviços.

Cada linha usará somente tecnologias já presentes no conteúdo aprovado. Qlik não aparecerá como case nem receberá link.

### 04 / Trajetória — “Onde atuei”

- TRF5 — Estágio de Desenvolvedor de Software, março de 2025 até hoje.
- AD Balanças e Engenharia — Técnico de TI, fevereiro de 2023 a fevereiro de 2025.
- UNICAP — Ciência da Computação, concluída em 2026.1.
- Oracle Cloud Infrastructure 2025 Foundations Associate.

As descrições profissionais serão as já aprovadas. A experiência no TRF5 conterá somente a menção: `Também atuo em uma solução interna de monitoramento de ambientes Qlik.`

### 05 / Contato

- E-mail `mateus7.cardoso@hotmail.com` em escala grande, com quebra segura e sublinhado âmbar.
- Botão `COPIAR E-MAIL` com feedback anunciado por `aria-live`.
- Links para GitHub, LinkedIn, e-mail e currículo.
- WhatsApp separado visualmente como contato secundário.
- Texto de disponibilidade restrito a esta seção: busca por vagas de **Desenvolvedor Backend Júnior**, em regime remoto, híbrido ou presencial.
- Sem promessa de prazo de resposta.

Rodapé em três colunas:

1. `© 2026 Mateus Cardoso`.
2. `Recife, Brasil` e hora local ao vivo no fuso `America/Recife`.
3. `Feito com HTML, CSS e JavaScript`.

## Metadados e compartilhamento

- Title: `Mateus Cardoso | Backend Developer`.
- Description: `Backend Developer com Java e Python, focado em APIs, integrações, dados e IA aplicada. Portfólio de Mateus Cardoso, em Recife.`
- Open Graph atualizado para o mesmo posicionamento.
- `og-image.png` regenerada no novo sistema visual, em 1200 × 630 px e abaixo de 300 KB.
- Favicon e canonical atuais serão preservados.

## Interações e acessibilidade

- Skip link preservado.
- Hierarquia semântica com um único `h1`.
- Foco de teclado visível e coerente com o acento âmbar.
- Navegação ativa atualizada por `IntersectionObserver`.
- Entrada discreta de 8 px com fade para as seções.
- `prefers-reduced-motion` remove movimentos não essenciais.
- Menu mobile operável por teclado e fechável com Escape.
- Botão de cópia oferece fallback e mensagem acessível.
- Hora local é conteúdo complementar; o site continua útil sem JavaScript.

## Responsividade

- Em 1280 px ou mais, manter grid editorial e proporções da referência.
- Em 768 px, reduzir gutters e preservar duas colunas apenas onde houver espaço real.
- Em 375–390 px, empilhar hero, tabelas, projeto, trajetória e rodapé; permitir quebra segura do e-mail; impedir overflow horizontal.
- Alvos interativos terão ao menos 44 px quando apresentados como botões ou controles.

## Verificação

- Atualizar os contratos estruturais em `tests/verify_stage3.sh`.
- Validar JavaScript com `node --check`.
- Confirmar ausência de URLs de fontes, CDNs ou recursos externos.
- Validar overflow e requisições em 375, 768 e 1280 px.
- Capturar hero, sobre, projetos, stack, experiência e contato em 1440 × 1000 e 390 × 844.
- Comparar cada captura com as seis referências e corrigir tipografia, espaço, cores e alinhamentos.
- Executar Lighthouse mobile e desktop, com meta superior a 95 em Performance, Acessibilidade, Boas Práticas e SEO.
- Regenerar e validar a imagem Open Graph.

## Entrega

As mudanças serão organizadas em commits pequenos na branch `redesign`. A entrega incluirá o endereço local do preview, screenshots, diferenças deliberadas em relação à referência, resultados do Lighthouse e itens restantes marcados como `[CONFIRMAR]`. O trabalho será interrompido após essa entrega para revisão visual.
