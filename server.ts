import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Support larger payload for base64 pattern saving and chat messages
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static pattern uploads directory
const publicPatternsDir = path.resolve(__dirname, 'public', 'patterns');
if (!fs.existsSync(publicPatternsDir)) {
  fs.mkdirSync(publicPatternsDir, { recursive: true });
}

// 1. Endpoint: Save pattern image
app.post('/api/save-pattern', (req, res) => {
  try {
    const { specimenId, dataUrl } = req.body;
    if (!specimenId || !dataUrl) {
      return res.status(400).json({ error: 'Missing specimenId or dataUrl' });
    }

    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid data URL format' });
    }

    const ext = matches[1].includes('jpeg') || matches[1].includes('jpg') ? 'jpg' : 'png';
    const buffer = Buffer.from(matches[2], 'base64');
    const fileName = `${specimenId}.${ext}`;
    const targetPath = path.join(publicPatternsDir, fileName);

    fs.writeFileSync(targetPath, buffer);
    const publicUrl = `/patterns/${fileName}`;

    return res.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('[API /api/save-pattern] Error saving pattern file:', error);
    return res.status(500).json({ error: String(error) });
  }
});

// 2. Endpoint: Gemini Chatbot
const KAT_MADE_SYSTEM_PROMPT = `You are the Kat-Made AI Concierge and Lead Surface Design Specialist for artist & designer Kathleen Raft.
You represent KAT-MADE and the hypnotic, surreal textile & pattern collection: "HYPNO CHROME GARDEN".

ABOUT KAT-MADE & KATHLEEN RAFT:
- Kathleen Raft creates liquid-chrome botanicals, iridescent psychedelia, and high-voltage pattern architecture.
- Her design universe fuses organic floral anatomy (orchids, carnivorous traps, hyper-blooms, spores) with molten chrome, prismatic refraction, optical grid illusions, and neo-acid color palettes.

THE 10 LOCKED PATTERNS IN "HYPNO CHROME GARDEN":
1. 01 — Chrome Garden Vortex (Hypno Chrome Garden — Hero A): Molten mercury liquid spirals and iridescent chrome botanical petals.
2. 02 — Prismatic Portal (Hypno Chrome Garden — Hero B): Holographic refraction lenses and spectral floral mandalas.
3. 03 — Checker Bloom Tunnel (Hypno Chrome Garden — Secondary A): Kinetic checkerboard tunnel warping into chrome orchid petals.
4. 04 — Iridescent Tendril Mesh (Hypno Chrome Garden — Secondary B): Fluid neon tendrils and chrome lattices for sheer silk overlays.
5. 05 — Dreamcore Fungi Field (Hypno Chrome Garden — Tertiary A): Bioluminescent acid mushrooms with chrome caps in neon twilight.
6. 06 — Liquid Mercury Dahlia (Hypno Chrome Garden — Tertiary B): Concentric chrome ripples with metallic specular highlights.
7. 07 — Psychedelic Foliage Wave (Hypno Chrome Garden — Accent A): Wavefront botanicals and chromatic aberration fringing.
8. 08 — Neo-Carnivorous Bloom (Hypno Chrome Garden — Accent B): Spiked liquid-chrome Venus traps with electric magenta veins.
9. 09 — Acid Spore Matrix (Hypno Chrome Garden — Micro Repeat): High-frequency floating chrome spore clusters for dense streetwear.
10. 10 — Holographic Flora Ribbon (Hypno Chrome Garden — Border Print): Undulating ribbons with hyper-reflective prism bands for hems, trims, and architectural panels.

TECHNICAL REPEAT SPECIFICATIONS & SUBSTRATES:
- All Kat-Made patterns are engineered at 300+ DPI master vector/raster tiles.
- Supported repeats: Straight Match (grid alignment) and Half-Drop (50% vertical offset for seamless organic flow).
- Recommended Substrates & Applications:
  * Heavy Silk Twill & Charmeuse (luxury scarves, blouses, resort wear)
  * Neoprene & Tech Lycra (streetwear, swimwear, festival apparel)
  * Foil-stamped metallic jacquards & coated vinyl (statement outerwear, upholstery)
  * Architectural ceramic tiles, acoustic wall panels, vinyl wraps

LICENSING & BESPOKE COMMISSIONS:
- Non-Exclusive Commercial License: Ready-to-print tiles for limited apparel & decor runs.
- Exclusive Category License: Dedicated territorial/industry rights for runway or luxury home collections.
- Bespoke Commissioning: Kathleen Raft crafts customized colorways, custom scale repeats, and exclusive bespoke collections tailored to brand palettes.

TONE & STYLE:
- Chic, design-forward, knowledgeable, visionary, polite, and enthusiastic.
- Keep answers crisp, structured, engaging, and well-formatted with markdown bullets when providing specs.
- Invite the user to try the interactive Pattern Sandbox on this site or submit a bespoke inquiry through the site.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userEmail, userName } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please add it to your environment secrets.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Format messages for @google/genai
    // Accepts role: 'user' | 'model'
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: KAT_MADE_SYSTEM_PROMPT + (userName ? `\n(User interacting: ${userName} <${userEmail || ''}>)` : ''),
        temperature: 0.7,
      },
    });

    const reply = response.text || "I'm here to assist with any Kat-Made pattern, licensing, or bespoke inquiries.";
    return res.json({ reply });
  } catch (error: any) {
    console.error('[API /api/chat] Gemini generation error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate response from Gemini AI Concierge.',
    });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[KAT-MADE Server] Listening on http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[KAT-MADE Server] Failed to start:', err);
  process.exit(1);
});
