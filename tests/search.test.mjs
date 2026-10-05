import assert from 'node:assert/strict';

const search=await import('../lib/hub-search.ts').catch(()=>null);
assert.ok(search,'A busca do Hub precisa de um índice pesquisável.');

assert.deepEqual(search.filterHubSearch('Faculdade').map(item=>[item.id,item.title,item.category]),[
 ['faculdade','Faculdade','Agente'],
]);
assert.deepEqual(search.filterHubSearch('Projetos').map(item=>[item.id,item.title,item.category]),[
 ['projetos','Projetos','Espaço'],
]);
assert.deepEqual(search.filterHubSearch('tecnología').map(item=>item.id),['carreira']);
assert.deepEqual(search.filterHubSearch('certificado').map(item=>item.id),['certificados']);
assert.equal(search.filterHubSearch('conteúdo inexistente').length,0);
assert.equal(search.filterHubSearch('').length,6);
console.log('PASS: busca do Hub filtra Faculdade, Projetos, acentos e estado vazio');
