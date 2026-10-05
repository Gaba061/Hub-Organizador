import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const workflow = JSON.parse(readFileSync(new URL('../docs/n8n/gabriel-ai-hub-router.json', import.meta.url), 'utf8'));
const nodeNames = new Set(workflow.nodes.map((node) => node.name));
const webhook = workflow.nodes.find((node) => node.name === 'Webhook');
const serialized = JSON.stringify(workflow);

assert.equal(workflow.name, 'Gabriel AI Hub — Roteador');
assert.equal(workflow.active, true);
assert.equal(webhook?.parameters?.httpMethod, 'POST');
assert.equal(webhook?.parameters?.path, 'gabriel-ai-hub');
for (const name of [
  'Validar Requisição',
  'Preparar Contexto',
  'Normalizar Resposta Final',
  'Preparar Registros',
  'Registrar Candidato Confirmado',
  'Gravar Memória Usuário',
  'Gravar Memória Agente',
  'Gravar Histórico',
]) assert.equal(nodeNames.has(name), true, `nó ausente: ${name}`);

for (const table of ['hub_memory_candidates', 'hub_user_memory', 'hub_agent_memory', 'hub_conversations']) {
  assert.match(serialized, new RegExp(table));
}

assert.doesNotMatch(serialized, /credentialData|apiKey|accessToken|refreshToken|password/i);
console.log('n8n workflow contract: PASS');

