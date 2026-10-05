# Organized Hub

Hub pessoal de Gabriel para Faculdade, Concursos, IPE Trading e Carreira & Tecnologia.

## Estado recuperado em 05/10/2026

O Site publicado está na versão 12. Este checkout reúne a busca dessa versão com correções posteriores de certificados, navegação móvel, foco e acessibilidade. A primeira CI passou com instalação limpa e build. Os checks do commit final devem estar verdes antes de publicação pelo fluxo oficial do Sites; revisão visual e integração do workflow n8n permanecem pendentes.

Conversas e mensagens usam D1; certificados usam D1 e R2. Há exportação JSON, isolamento por usuário, acesso restrito ao proprietário, idempotência, limite diário e cancelamento. Exclusão remove o conteúdo da conversa e a oculta do histórico/exportação, preservando metadados técnicos de execução para impedir reutilização de chaves e reinício da cota. Uma execução ativa deve ser interrompida antes de apagar sua conversa.

Projetos, biblioteca geral e indicadores de foco são exemplos ou funções em preparação, identificados na interface. O histórico persistido no Hub não comprova memória permanente no n8n. O repositório contém prompts e o contrato do webhook, mas não contém o JSON exportado do workflow nem a integração de confirmação de memórias.

## Desenvolvimento e verificação

Use Node >=22.13 (CI: Node 24) e pnpm 11.25.0, fixado em packageManager. O pnpm-lock.yaml é a referência de instalação:

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
pnpm exec eslint app lib db tests
pnpm build
pnpm dev
```

A CI executa instalação limpa, testes, tipos, lint e build. Fontes KaTeX e CSS local do shadcn acompanham o código para não depender de arquivos existentes apenas no computador de origem. Scripts antigos de instalação npm não são o caminho configurado em install:ci.

Nesta retomada, testes funcionais e de renderização e TypeScript passaram. O aviso de lint pelo link do CSS KaTeX foi corrigido usando import no layout; lint local passou sem erros ou avisos. O build local falhou por bloqueio de subprocessos (spawn EPERM) antes de carregar a configuração Vite; não foi possível validar a interface em navegador. A CI Linux completou o build; a revisão visual destas alterações permanece pendente.

## Acesso e banco

O servidor valida a identidade encaminhada pela plataforma e HUB_OWNER_USER_ID. Sem proprietário configurado, o acesso falha fechado. Segredos ficam no runtime, nunca no navegador. O login simulado do starter serve apenas à prévia local; o Worker publicado depende da camada de autenticação do Sites.

O esquema está em db/schema.ts e as migrações versionadas em drizzle/. A migração 0002_conversation_deletion adiciona deleted_at; precisa acompanhar a próxima versão antes de servir código que usa esse campo. Nenhuma migração foi aplicada à produção nesta retomada. No Sites, use o fluxo oficial que empacota e aplica migrações; na prévia, use Wrangler com a configuração gerada após build.

## Provedores

AI_PROVIDER aceita n8n, openai ou ollama. Uma escolha explícita com configuração incompleta desativa a IA; não troca silenciosamente de provedor. Sem provedor explícito, mantém-se compatibilidade com OpenAI quando chave e modelo estão configurados.

- n8n: N8N_WEBHOOK_URL e, se configurado no workflow, N8N_WEBHOOK_SECRET.
- OpenAI: OPENAI_API_KEY e OPENAI_MODEL, somente no servidor.
- Ollama: OLLAMA_BASE_URL HTTP em localhost/127.0.0.1 e OLLAMA_MODEL. Requer um runtime com acesso a esse serviço; um Worker hospedado não acessa o Ollama do computador de Gabriel.
- AI_DAILY_REQUEST_LIMIT: inteiro entre 1 e 500; conta tentativas iniciadas por dia UTC, incluindo falhas posteriores ao início.

O webhook recebe userId, agentId, conversationId, requestId, mensagem mais recente, idioma, fuso e campos reservados para anexos/memória. A resposta deve conter reply não vazio. O Hub persiste seu próprio histórico; idempotência e memória dentro do n8n precisam ser verificadas no workflow exportado. Não envie testes ao webhook de produção para validar o código local.

Respostas são exibidas ao concluir, sem streaming de tokens. Cancelamento tenta abortar a chamada e impede persistência tardia, mas não garante estorno do provedor. Exportação não inclui conversas apagadas. Importação automática e backups agendados seguem em preparação.

## Evidência e histórico

Os testes usam SQLite real e provedores substitutos: autenticação, proprietário, persistência, idempotência, cotas, concorrência, cancelamento, exclusão e suas corridas, exportação, origem externa, certificados, busca, configuração de provedor e renderização segura. Não realizam chamadas pagas nem comprovam geração real ou memória externa.

Em 17/09/2026, um teste local OpenAI autenticou e retornou credit_balance_exhausted na geração. Esse registro é histórico e não representa o saldo atual. A produção atual usa configuração de gateway n8n.

React/RSC 19.2.8 e Vite 8.0.16 incorporam correções publicadas nas fontes oficiais:
- https://github.com/react/react/security/advisories/GHSA-wx67-qw84-cm4g
- https://github.com/vitejs/vite/security/advisories/GHSA-fx2h-pf6j-xcff

O registro durável de retomada está em docs/RETOMADA.md. Não armazenar credenciais, tokens de publicação, conteúdo privado de conversas ou exportações de banco no GitHub.
