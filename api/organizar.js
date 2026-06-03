// Backend serverless (Vercel) — guarda a chave e faz a ponte com a API da Anthropic.
// A chave NUNCA vai pro navegador. Configure ANTHROPIC_API_KEY nas Env Vars da Vercel.
export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Método não permitido' }); return; }
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) { res.status(500).json({ error: 'ANTHROPIC_API_KEY não configurada na Vercel (Settings > Environment Variables).' }); return; }
  try {
    const { prompt } = req.body || {};
    if (!prompt) { res.status(400).json({ error: 'prompt ausente' }); return; }
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: process.env.MODELO || 'claude-sonnet-4-6',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
