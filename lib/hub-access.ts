export function authorizeHubOwner(userId: string | null, configuredOwnerId: string | undefined): Response | null {
 if(!userId)return Response.json({error:'Autenticação necessária.'},{status:401});
 if(!configuredOwnerId?.trim())return Response.json({error:'Acesso privado ainda não foi configurado.'},{status:503});
 if(userId!==configuredOwnerId.trim())return Response.json({error:'Acesso não autorizado.'},{status:403});
 return null;
}

