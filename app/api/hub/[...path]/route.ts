import {env} from 'cloudflare:workers';
import {after} from 'next/server';
import {getChatGPTUser} from '@/app/chatgpt-auth';
import {handleHub} from '@/lib/hub-service';
import {handleCertificates} from '@/lib/certificate-service';
import {resolveProviderConfig} from '@/lib/provider-config';
import {authorizeHubOwner} from '@/lib/hub-access';
export const dynamic='force-dynamic';
async function handler(request:Request){
 const user=await getChatGPTUser();
 const denied=authorizeHubOwner(user?.userId||null,env.HUB_OWNER_USER_ID);
 if(denied)return denied;
 const path=new URL(request.url).pathname;
 if(path.startsWith('/api/hub/certificates'))return handleCertificates(request,{db:env.DB,bucket:env.BUCKET,user:user?.userId||null});
 const dailyLimit=Number(env.AI_DAILY_REQUEST_LIMIT);
 const allowanceReady=Number.isInteger(dailyLimit)&&dailyLimit>0&&dailyLimit<=500;
 const config=resolveProviderConfig(env);
 const enabled=allowanceReady&&!!config;
 return handleHub(request,{db:env.DB,user:user?.userId||null,config:enabled?config:null,dailyLimit:enabled?dailyLimit:0,defer:promise=>after(promise)});
}
export {handler as GET,handler as POST,handler as DELETE};
