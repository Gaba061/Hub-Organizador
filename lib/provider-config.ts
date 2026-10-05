import type {ProviderConfig} from './provider';
type ProviderEnvironment={AI_PROVIDER?:string;OPENAI_API_KEY?:string;OPENAI_MODEL?:string;N8N_WEBHOOK_URL?:string;N8N_WEBHOOK_SECRET?:string;OLLAMA_BASE_URL?:string;OLLAMA_MODEL?:string};
export function resolveProviderConfig(env:ProviderEnvironment):ProviderConfig|null{
 const kind=env.AI_PROVIDER || (env.OPENAI_API_KEY&&env.OPENAI_MODEL?'openai':'');
 if(kind==='n8n')return env.N8N_WEBHOOK_URL?{kind,model:'n8n-router',webhookUrl:env.N8N_WEBHOOK_URL,webhookSecret:env.N8N_WEBHOOK_SECRET}:null;
 if(kind==='ollama')return env.OLLAMA_MODEL&&/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/i.test(env.OLLAMA_BASE_URL||'')?{kind,model:env.OLLAMA_MODEL,baseUrl:env.OLLAMA_BASE_URL}:null;
 if(kind==='openai')return env.OPENAI_API_KEY&&env.OPENAI_MODEL?{kind,model:env.OPENAI_MODEL,key:env.OPENAI_API_KEY}:null;
 return null;
}
