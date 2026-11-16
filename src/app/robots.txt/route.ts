import { site } from "@/lib/site";

/**
 * robots.txt, written by hand so it can carry comments and named AI crawler groups.
 * Every bot may crawl public pages; /api/ and /admin stay blocked.
 */
const body = `# robots.txt for www.hedgewealthcapital.com
# All crawlers, including AI search and AI assistant bots, may crawl public pages.
# /api/ and /admin stay blocked for every bot.

# Default rule for all crawlers
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin

# Search engines
User-agent: Googlebot
User-agent: Bingbot
User-agent: Applebot
User-agent: DuckDuckBot
Allow: /
Disallow: /api/
Disallow: /admin

# AI search, AI assistants and AI training crawlers
# OpenAI (ChatGPT)
User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
# Anthropic (Claude)
User-agent: ClaudeBot
User-agent: Claude-User
User-agent: Claude-SearchBot
User-agent: anthropic-ai
# Perplexity
User-agent: PerplexityBot
User-agent: Perplexity-User
# Google Gemini / AI Overviews and Apple Intelligence
User-agent: Google-Extended
User-agent: Applebot-Extended
# Microsoft Copilot, Meta AI, Amazon, DuckDuckGo AI, Mistral, Cohere, Common Crawl
User-agent: Meta-ExternalAgent
User-agent: Meta-ExternalFetcher
User-agent: Amazonbot
User-agent: DuckAssistBot
User-agent: MistralAI-User
User-agent: cohere-ai
User-agent: CCBot
Allow: /
Allow: /llms.txt
Disallow: /api/
Disallow: /admin

Sitemap: ${site.url}/sitemap.xml
`;

export function GET() {
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
