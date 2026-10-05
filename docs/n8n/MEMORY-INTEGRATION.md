# Integração de memória do workflow n8n

O export recebido em 5 de outubro de 2026 foi preservado em [`gabriel-ai-hub-router.json`](./gabriel-ai-hub-router.json). SHA-256: `F32A6608D160586132EB7F36649106C1B74FEA3362F8A3DCFD6AC9BCDC8AC00D`.

## O que foi confirmado

- Workflow ativo `Gabriel AI Hub — Roteador`, versão `c79d5560-a2b1-49ba-83b8-c5e5da206820`, com webhook `POST /webhook/gabriel-ai-hub` e resposta por nó de resposta.
- O contrato normal exige `userId`, `conversationId`, `requestId` e `message`. A ação `confirmMemory` dispensa `message` e aceita `confirmedMemories` ou `memoryConfirmations`.
- O fluxo separa memória central e memória por agente nas tabelas `hub_user_memory` e `hub_agent_memory`, registra candidatos em `hub_memory_candidates` e grava o histórico em `hub_conversations`.
- O histórico usa `requestId` como chave de idempotência para o par de mensagens do turno.
- O contrato de resposta mantém `conversationId`, `agentId`, `reply`, `memoryCandidates`, `citations` e `followUp`, compatível com o gateway do Hub.
- O arquivo não contém campos de credencial ou segredos visíveis.

## Lacunas que permanecem explícitas

1. O nó `Validar Requisição` valida identidade e campos, mas o export não mostra validação do header `X-Gabriel-Hub-Secret`. O Hub já envia esse header quando `N8N_WEBHOOK_SECRET` está configurado; a validação correspondente precisa ser adicionada no n8n antes de publicar o endpoint em produção.
2. Os quatro nós de normalização retornam `memoryCandidates: []`. A leitura e a confirmação de memória existem, porém o workflow não produz candidatos para a interface confirmar.
3. O frontend do Hub ainda não oferece a confirmação visual de candidatos. Até essa etapa, a memória persistida deve ser tratada como integração de backend validada, sem prometer uma UX de confirmação que ainda não existe.
4. A confirmação de memória deve continuar exigindo `userId`, `conversationId` e `requestId`, além de `agentId` quando o escopo for `agent`.

## Teste operacional mínimo

Antes de ativar mudanças no workflow, enviar um turno normal e uma confirmação com um `requestId` novo, verificar isolamento entre dois `userId` e repetir o mesmo `requestId`. O resultado esperado é uma resposta com o mesmo `conversationId`, nenhuma leitura cruzada e nenhuma duplicação no histórico.

Este arquivo documenta o export e seus limites; ele não altera o workflow remoto nem grava credenciais no repositório.

