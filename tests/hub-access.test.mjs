import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {authorizeHubOwner} from '../work/hub-access-test.mjs';

assert.equal(authorizeHubOwner(null,'owner')?.status,401,'missing authenticated identity must be denied');
assert.equal(authorizeHubOwner('owner',undefined)?.status,503,'missing owner configuration must fail closed');
assert.equal(authorizeHubOwner('owner','  ')?.status,503,'blank owner configuration must fail closed');
assert.equal(authorizeHubOwner('other','owner')?.status,403,'a different authenticated account must be denied');
assert.equal(authorizeHubOwner('owner',' owner '),null,'the configured owner must be allowed');

const route=readFileSync('app/api/hub/[...path]/route.ts','utf8');
assert.match(route,/authorizeHubOwner\(user\?\.userId\s*\|\|\s*null,\s*env\.HUB_OWNER_USER_ID\)/,
  'the shared Hub API handler must authorize the authenticated identity against the server-only owner before dispatch');
assert.ok(route.indexOf('authorizeHubOwner(')<route.indexOf('handleCertificates('),
  'owner authorization must run before certificate routes');
assert.ok(route.indexOf('authorizeHubOwner(')<route.indexOf('handleHub('),
  'owner authorization must run before chat, export and status routes');

console.log('PASS: every Hub API route is protected at the shared server boundary');

