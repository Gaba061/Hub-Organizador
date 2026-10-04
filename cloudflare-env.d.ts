declare namespace Cloudflare {
  interface Env {
    HUB_OWNER_USER_ID?: string;
    DB?: D1Database;
    BUCKET?: R2Bucket;
		OPENAI_API_KEY?: string;
		OPENAI_MODEL?: string;
		AI_PROVIDER?: string;
		OLLAMA_BASE_URL?: string;
		OLLAMA_MODEL?: string;
		AI_DAILY_REQUEST_LIMIT?: string;
		N8N_WEBHOOK_URL?: string;
		N8N_WEBHOOK_SECRET?: string;
  }
}

