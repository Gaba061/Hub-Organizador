# Retomada — Gabriel AI HUB / Organized Hub

Atualizado em 05/10/2026. Repositório: https://github.com/Gaba061/Hub-Organizador

## Fontes recuperadas

- Checkout local: C:/Users/Gaba/Documents/Codex/2026-09-16/referenced-chatgpt-conversation-this-is-an
- HEAD local histórico: 9ea9982; alterações anteriores preservadas sem reset ou commit local.
- GitHub main usado como base: 59e60a7c1d9d9db2c9dc81b68c20a6ab548c8b77.
- Sites: appgprj_6aaad766ed6c8191a0c528389733c331; URL https://gabriel-ai-hub.wisheydpftn.chatgpt.site
- Versão publicada verificada: 12; commit de fonte 3a1d69033a2b9259cb999409d3a70d63615bef15.
- Arquivo fonte v12: sha256:07694c3ea28c2dcc664af3a0b091df3810f55199922223fdda7af4775f3e1733 (215 arquivos).
- Auditoria anterior: C:/Users/Gaba/Documents/Codex/Auditorias/Organized-Hub-2026-10-03.md.

## Arquitetura real

React/TypeScript e Vinext/Vite, Worker Cloudflare via Sites; D1 SQLite com Drizzle; arquivos de certificados no R2; autenticação encaminhada pelo Sites e gate HUB_OWNER_USER_ID. Provedores n8n/OpenAI/Ollama. Não é o plano histórico de PostgreSQL/VPS.

O segredo HUB_OWNER_USER_ID existe no runtime e veio mascarado na consulta; valor mascarado não prova ausência nem permite confirmar seu conteúdo. Não substituir sem evidência. Não imprimir ou versionar segredos.

## Correções desta retomada

- Busca v12 reconciliada com certificados e correções de navegação local; Ctrl/Cmd+K, navegação por teclado, retorno de foco e abas de carreira controladas.
- Pesquisar Certificados abre a aba correta inclusive quando Carreira já está aberta.
- Navegação móvel inclui pesquisa, foco e biblioteca; data atual no fuso de São Paulo.
- Indicadores fictícios removidos ou identificados como demonstração; biblioteca/projetos em preparação não prometem persistência.
- Certificados: captura síncrona do formulário antes de upload, estado de erro/repetição e bloqueio de envio duplicado.
- Polling não se sobrepõe; draft editado durante envio não é apagado; resposta tardia de cancelamento não altera outra conversa.
- DELETE implementado com tombstone atômico, conteúdo removido, listagem/exportação filtradas e preservação de chaves/cota. Exclusão durante execução retorna 409. Corridas delete/send verificadas.
- Migração Drizzle 0002_conversation_deletion.sql, snapshot e journal gerados. Nenhuma migração de produção aplicada.
- Provedor explícito incompleto não cai silenciosamente em OpenAI.
- pnpm 11.25.0 e lockfile fixados; CI preparada para instalação limpa/testes/tipos/lint/build; fontes KaTeX e CSS vendorizado incluídos.
- React/RSC 19.2.8, Next/eslint-config-next 16.3.8, Vite 8.0.16.
- Export do workflow n8n recebido, preservado em `docs/n8n/gabriel-ai-hub-router.json` e validado por teste de contrato. A leitura e a confirmação de memória existem no workflow; a produção de candidatos ainda retorna lista vazia e a proteção por `X-Gabriel-Hub-Secret` ainda precisa ser configurada no n8n.

## Verificação atual

Com as versões atualizadas, passaram node tests/run.mjs, node tests/render.test.mjs e tsc --noEmit. ESLint app/lib/db/tests: zero erros e um aviso preexistente por link de CSS KaTeX. Revisão independente não encontrou achados importantes nas correções dirigidas.

Build atual falha ao resolver a configuração Vite por spawn EPERM no ambiente Windows do Codex. A criação de subprocessos está bloqueada, inclusive para um teste simples do executável Node. Sem build ou prévia, não há validação visual atual em navegador. Não confundir verificações históricas de v12 com validação destas alterações.

A política automática rejeitou o envio da credencial ao processo oficial de sincronização do Sites porque aprovação de sandbox está desabilitada. Credencial não foi exposta. Não houve publicação, migração de produção ou alteração de runtime nesta retomada.

## Próxima execução

1. Consultar o PR/CI desta retomada e concluir build em ambiente compatível. Corrigir falhas comprovadas antes de publicar.
2. Validar desktop/celular: busca teclado/foco, tabs, Foco, abertura/retomada/cancelamento/exclusão, certificados e mensagem de erro de API.
3. Configurar no n8n a validação de `X-Gabriel-Hub-Secret`, testar isolamento/idempotência e implementar a emissão de `memoryCandidates` antes de ativar a UX de confirmação no Hub. O export auditado e os limites estão em `docs/n8n/MEMORY-INTEGRATION.md`.
4. Usar exclusivamente fluxo oficial Sites para sincronizar fonte, build, pacote, migrações e publicação. A versão 12 permanece em produção até isso.
5. Preservar o projeto portfolio-site separado e ignorado; não incluí-lo no Hub.

## Arquivos de trabalho

Backups anteriores à reconciliação: C:/Users/Gaba/Documents/Codex/2026-10-05/continue-o-trabalho-do-chat-anterior/work/pre-reconciliation.
Referência GitHub: pasta work/github-main do mesmo chat. Scripts reconcile.mjs/polish.mjs/fix-review.mjs já executados e não são idempotentes. Não executá-los novamente.

## Entrega revisável

PR em rascunho: https://github.com/Gaba061/Hub-Organizador/pull/1
Branch: codex/hub-recovery-2026-10-05.
A primeira CI completou instalação limpa, testes, tipos, lint e build com sucesso: https://github.com/Gaba061/Hub-Organizador/actions/runs/37377135085.
O ajuste final torna avisos de erro visíveis em todas as telas e importa o CSS KaTeX pelo layout, removendo o aviso de lint. Consultar os checks do commit final do PR antes da publicação.
O bloqueio local de subprocessos permanece; CI não substitui revisão visual, validação do workflow n8n ou publicação oficial.

