// OpenRouter configuration using environment variables

export interface OpenRouterConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
}

export function getOpenRouterConfig(): OpenRouterConfig {
  const apiKey =
    process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ||
    process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      'OpenRouter API key not found. Please set NEXT_PUBLIC_OPENROUTER_API_KEY or OPENROUTER_API_KEY environment variable.'
    );
  }

  return {
    apiKey,
    model:
      process.env.NEXT_PUBLIC_OPENROUTER_MODEL ||
      process.env.OPENROUTER_MODEL ||
      'openai/gpt-oss-20b:free',
    baseUrl:
      process.env.NEXT_PUBLIC_OPENROUTER_BASE_URL ||
      process.env.OPENROUTER_BASE_URL ||
      'https://openrouter.ai/api/v1',
  };
}

export function isOpenRouterConfigured(): boolean {
  try {
    getOpenRouterConfig();
    return true;
  } catch {
    return false;
  }
}
