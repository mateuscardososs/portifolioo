# Design — Hero pessoal e portfólio com múltiplos projetos

## Objetivo

Reequilibrar o portfólio para que um recrutador identifique primeiro **Mateus Cardoso**, seu posicionamento como **Backend Developer** e a variedade de sistemas que já desenvolveu. O Controle de Acesso continua sendo a principal prova técnica, mas deixa de ocupar quase toda a seção de projetos.

O redesign preserva a identidade editorial preta e âmbar já aprovada, as fontes locais e a implementação em HTML, CSS e JavaScript puros.

## Decisões aprovadas

- Hero: opção A, com retrato central usando `img/face2.png`.
- Sobre: opção A, com narrativa profissional em vez dos quatro cards técnicos.
- Projetos: opção A, lista editorial equilibrada com quatro trabalhos visíveis.
- O status de disponibilidade continua restrito à seção de contato.
- O Qlik permanece apenas como menção breve na experiência do TRF5, sem case e sem link.

## Ordem da página

1. Hero pessoal
2. Sobre
3. Projetos selecionados
4. Stack por capacidade
5. Experiência, formação e certificação
6. Contato

## Hero

O início abandona o título abstrato e a tabela factual lateral. A composição será centralizada, inspirada na referência enviada pelo usuário, sem copiar sua paleta azul ou elementos decorativos.

Conteúdo:

- retrato circular com `face2.png`, borda âmbar fina e pequeno selo técnico `{ }`;
- nome: **Mateus Cardoso**;
- cargo: **Backend Developer | Java & Python**;
- texto: **Desenvolvo APIs, integrações e sistemas orientados a dados, com IA aplicada quando ela melhora de fato a operação.**;
- localização discreta: **Recife, Brasil**;
- ações: **Ver projetos** e **Baixar currículo**.

Não haverá tabela com “ATUAL”, contagem de testes ou disponibilidade no hero. As provas serão apresentadas no contexto dos projetos, onde fazem sentido.

## Sobre

Título:

> Backend que entende a operação inteira.

Texto:

> Sou Mateus Cardoso, Backend Developer em Recife. Trabalho com Java, Python e SQL para construir APIs, integrações e fluxos de dados que transformam processos manuais em sistemas confiáveis.

> No TRF5, entre março de 2025 e agosto de 2026, participei do desenvolvimento de soluções internas, automações e iniciativas de IA. Fora dele, desenvolvo produtos completos — de controle de acesso usado em evento real a gestão comercial com IA local e consulta inteligente de documentos.

> Meu foco é backend, mas penso no fluxo ponta a ponta: regra de negócio, banco de dados, segurança, testes, operação e a experiência de quem usa o sistema.

Uma faixa final curta reforçará três eixos: **Java + Python**, **APIs + dados** e **IA local**.

## Projetos selecionados

A seção usará linhas editoriais, não cards em grade. Cada linha terá nome, contexto curto, stack verificável, estado do projeto e ação disponível. O Controle de Acesso recebe somente uma linha adicional de prova; os demais projetos permanecem visualmente relevantes.

### 1. Controle de Acesso — case principal

Sistema full stack para gerenciar colaboradores, convidados, áreas, dispositivos e eventos de acesso em uma operação de grande porte.

- Java 21, Spring Boot 3, PostgreSQL, Flyway, RabbitMQ, WebSocket e Next.js.
- Projeto desenvolvido individualmente e usado em evento real.
- 279 testes no total: 260 executados localmente e 19 testes de integração dependentes de Docker.
- Provider real validado em controladora Intelbras via CGI/Digest; modo fake como padrão de desenvolvimento; compatibilidade dependente de modelo e firmware.
- Repositório público: `https://github.com/mateuscardososs/Controle-de-acesso`.

O registro de evidências será reduzido a uma faixa compacta com links profundos já auditados. Não serão publicados links para arquivos com IPs, credenciais de desenvolvimento, domínios internos ou dados reais.

### 2. Proposta Comercial

Sistema de gestão operacional para propostas, clientes, tarefas, serviços, financeiro e acompanhamento de mensagens. A evolução atual inclui um assistente local por texto e voz.

- Python, FastAPI, SQLAlchemy, Jinja2, PostgreSQL/SQLite e Docker.
- Ollama como interpretador local, atrás do backend e sem acesso direto ao banco.
- Voz local com faster-whisper para transcrição e Piper para síntese.
- Ações de escrita exigem validação e confirmação; o modelo não executa SQL, shell ou código.
- Repositório público: `https://github.com/mateuscardososs/Proposta.comercial`.

### 3. AcervoIA — em desenvolvimento

Aplicação para consultar manuais e procedimentos técnicos com resultados apoiados por trechos verificáveis.

- Python, FastAPI, PostgreSQL, pgvector, SQLAlchemy, Alembic e Ollama local.
- Autenticação JWT com Argon2 e isolamento de coleções por proprietário.
- Upload e processamento de PDF, DOCX e TXT, divisão em trechos e busca semântica.
- O estado atual recupera evidências e pontua similaridade; ainda não deve ser apresentado como resposta final gerada por chat.
- Repositório público: `https://github.com/mateuscardososs/AcervoIA`.

### 4. Time Registry Platform

Plataforma de registro de ponto com backend Spring Boot, painel administrativo React e aplicativo Android para tablet.

- Java, Spring Boot, PostgreSQL, Flyway, React, Android/Kotlin e Docker.
- Integração com AWS Rekognition para Face Liveness e comparação facial.
- Armazenamento privado de evidências em S3 com KMS e políticas explícitas de retenção.
- Segurança de dispositivos com tokens, assinatura HMAC, nonce e idempotência.
- O repositório não é público; a linha não exibirá ação para GitHub.

## Experiência

O período do TRF5 será corrigido para **março de 2025 — agosto de 2026**. O texto deixará de sugerir vínculo atual. A frase sobre Qlik será mantida exatamente como menção breve e sem link.

As duas funções da AD Balanças, formação e certificação permanecem com as datas e informações já aprovadas.

## Direção visual

- Fundo `#030303`, texto quente claro e acento âmbar existentes.
- Archivo para títulos, Source Sans 3 para corpo e IBM Plex Mono para metadados.
- Hero centralizado, com muito espaço negativo e somente o retrato como elemento visual dominante.
- Projetos organizados por linhas e divisores; sem bento, sombras, gradientes ou cartões genéricos.
- O acento âmbar continua limitado a seleção, metadados importantes, foco e prova.
- No mobile, o retrato, o título e as ações empilham; cada projeto mantém nome, resumo, stack e link legíveis sem overflow.

## Metadados e compartilhamento

O `title` continua **Mateus Cardoso | Backend Developer**. A descrição será atualizada para mencionar Java, Python, APIs, integrações, dados e IA aplicada, sem linguagem de senioridade não comprovada.

O Open Graph continuará local, 1200 × 630 e abaixo de 300 KB. O texto permanece coerente com o novo hero; não é necessário usar a fotografia no OG.

## Verificação

- Contratos automatizados para o novo hero, os quatro projetos e o período correto do TRF5.
- Verificação de links públicos e ausência de requisições externas.
- Sem overflow em 375, 768 e 1280 px.
- Screenshots de hero, sobre, projetos, stack, experiência e contato em 1440 × 1000 e 390 × 844.
- Inspeção visual de todas as capturas antes da entrega.
- Lighthouse mobile e desktop acima de 95 em Performance, Acessibilidade, Boas Práticas e SEO.
- Branch limpa ao final.

## Itens ainda não afirmados publicamente

- Nome do evento permanece “evento de grande porte” até existir autorização para citar São João de Caruaru.
- Não será afirmado que o repositório público do Controle de Acesso é idêntico à versão usada no evento.
- Não serão listados fluxos específicos utilizados no evento sem confirmação.
