import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Download,
  Share2,
  Calendar,
  Layers,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// Imported generated report assets
import reportCover from '../assets/images/trend_report_cover_1791959946542.jpg';
import bioSurrealismImg from '../assets/images/dreamcore_bio_surrealism_1791959964127.jpg';
import liquidChromeImg from '../assets/images/liquid_chrome_gradients_1791959982193.jpg';
import checkerVortexImg from '../assets/images/optical_checker_vortex_1791960006104.jpg';
import glowBlackImg from '../assets/images/glow_against_black_1791960025965.jpg';
import { WatermarkedImage } from './WatermarkedImage';

interface BlogSectionProps {
  onOpenInquiry?: (note?: string) => void;
}

export default function BlogSection({ onOpenInquiry }: BlogSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'aesthetic' | 'market' | 'roadmap'>('all');
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="blog" className="relative py-24 px-[3.5vw] bg-[#070709] border-t border-zinc-800 text-zinc-100 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-3/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Editorial Eyebrow & Brand */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest bg-zinc-900 border border-zinc-700 text-pink-400 font-bold">
              KAT MADE // RESEARCH & TREND INTELLIGENCE
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> 2026 Industry Whitepaper
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isCopied ? 'Link Copied!' : 'Share Report'}</span>
          </button>
        </div>

        {/* Main Article Title */}
        <div className="mt-8 mb-10">
          <div className="text-xs font-mono font-bold tracking-widest text-[#d8ff43] uppercase mb-2">
            KAT MADE
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-bold tracking-tight text-[#f5f4ef] leading-[1.08]">
            The Rise of Psychedelic Maximalism: 2026 Trend Report
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 font-sans max-w-3xl leading-relaxed">
            Exploring the commercial and visual paradigm shift away from corporate minimalism toward high-voltage tactile complexity, biological surrealism, and multi-stream artist business architecture.
          </p>
        </div>

        {/* Page 1: Hero Banner Artwork */}
        <div className="relative mb-16 rounded-2xl overflow-hidden border border-zinc-700 shadow-[0_10px_40px_rgba(0,0,0,0.8)] group">
          <WatermarkedImage
            src={reportCover}
            alt="The Rise of Psychedelic Maximalism: 2026 Trend Report cover"
            watermarkDensity="subtle"
            badgePosition="bottom-right"
            className="w-full aspect-[16/9]"
            imgClassName="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
            <div className="text-xs font-mono text-zinc-300 bg-black/70 backdrop-blur-md px-3 py-1.5 border border-zinc-700/80 rounded">
              Figure 1.0 — KAT MADE 2026 Trend Report Cover Artwork
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PAGE 2: Aesthetic Analysis & 2026 Market Signals */}
        {/* ============================================================== */}
        <article className="space-y-16 text-zinc-200 font-sans leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-zinc-100 mb-6 pb-3 border-b border-zinc-800">
              Aesthetic Analysis & 2026 Market Signals
            </h2>

            <div className="relative">
              <p className="text-base sm:text-lg leading-relaxed text-zinc-300 first-letter:float-left first-letter:text-6xl first-letter:font-bold first-letter:font-serif-display first-letter:mr-3 first-letter:mt-1 first-letter:text-[#d8ff43] first-letter:leading-none">
                As we say goodbye to the sterile minimalism of the early 2020s, a big shift continues to develop and unfold throughout 2026. Tired of uniform designs and AI-generated content, consumers and businesses now crave rich textures, complex structures, and authentic human creativity. <strong className="text-zinc-100 font-semibold">68% of designers said they preferred maximalism over minimalism.</strong> This has led to a high demand for refined vector work and unique digital designs. According to Kittl, <strong className="text-cyan-300 font-semibold">searches for maximalist visuals have jumped 340%</strong>, and Adobe reports that <strong className="text-pink-400 font-semibold">78% of creatives embrace “human imperfection” in their work.</strong> Psychedelic Maximalism has become the go-to aesthetic for forward-thinking brands.
              </p>
            </div>

            {/* Figure: Dreamcore Nature & Bio-Surrealism */}
            <div className="my-10 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/60 p-3 sm:p-4">
              <WatermarkedImage
                src={bioSurrealismImg}
                alt="Dreamcore Nature and Bio-Surrealism example"
                watermarkDensity="subtle"
                badgePosition="bottom-right"
                className="w-full aspect-[4/3] rounded-lg"
                imgClassName="w-full h-full object-cover rounded-lg"
              />
              <div className="mt-3 text-xs sm:text-sm text-zinc-400 italic font-sans">
                <strong className="text-zinc-200 not-italic font-semibold">Dreamcore Nature & Bio-Surrealism:</strong> Intricate, flowing organic motifs that interweave botanical anatomy—vines, spores, tendrils, and blossom structures—with surreal, dreamlike ecosystems.
                <span className="block text-[11px] font-mono text-zinc-500 mt-1 not-italic">
                  *Created using Recraft V4 via Leonardo*
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* PAGES 3-6: Core Visual Markers of Psychedelic Maximalism */}
          {/* ============================================================== */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-zinc-100 mb-6 pb-3 border-b border-zinc-800">
              Core Visual Markers of Psychedelic Maximalism
            </h2>

            {/* 1. Dreamcore Nature & Bio-Surrealism */}
            <div className="space-y-4 mb-10">
              <h3 className="text-lg font-serif-display font-bold text-[#d8ff43]">
                Dreamcore Nature & Bio-Surrealism
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                Dreamcore nature features ethereal, immersive landscapes that evoke the feeling of stepping into a lucid dream, with misty forests, floating flora, cascading vines, glimmering spores, and bioluminescent fungi, using soft gradients, hazy overlays, and layered organic silhouettes to create a surreal atmosphere, and can be searched with keywords like dreamlike forests, floating flora, ethereal landscapes, bioluminescent plants, and surreal nature art, while bio-surrealism emphasizes the fusion of biological forms with uncanny or fantastical elements such as hybrid plant-animal structures, spiraling spore clusters, tendrils morphing into skeletal frames, or flowers with eyes, often featuring high-contrast detailing, precise linework, and an uncanny twist to natural forms, with keywords including biomorphic surrealism, hybrid flora, organic surreal art, anatomical nature, and living tendrils, and when combined they create compositions where hazy, dreamlike backgrounds of layered forests and floating spores merge with detailed, morphing flora and bioluminescent blossoms with subtle surreal distortions, balancing soft depth with intricate focal points to lead the viewer through a living, otherworldly ecosystem, which in printing and silk-screening is achieved by using non-destructive layer structuring for iterative adjustments, precise Bezier curve control to reduce vector clutter while maintaining clean organic linework, carefully planned spot-color separations to capture both soft gradients and sharp details, and multi-pass rotary textile printing or silk-screening with overprint strategies and transparency layers to build atmospheric depth and highlight the luminous surreal effects.
              </p>
            </div>

            {/* Figure: Iridescent Chrome & Liquid Gradients */}
            <div className="my-10 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/60 p-3 sm:p-4">
              <WatermarkedImage
                src={liquidChromeImg}
                alt="Iridescent Chrome & Liquid Gradients examples"
                watermarkDensity="subtle"
                badgePosition="bottom-right"
                className="w-full aspect-[4/3] rounded-lg"
                imgClassName="w-full h-full object-cover rounded-lg"
              />
              <div className="mt-3 text-xs sm:text-sm text-zinc-400 italic font-sans">
                <strong className="text-zinc-200 not-italic font-semibold">Iridescent Chrome & Liquid Gradients examples</strong>
                <span className="block text-[11px] font-mono text-zinc-500 mt-1 not-italic">
                  *Created using Recraft V4 via Leonardo*
                </span>
              </div>
            </div>

            {/* 2. Iridescent Chrome & Liquid Gradients */}
            <div className="space-y-4 mb-10">
              <h3 className="text-lg font-serif-display font-bold text-cyan-300">
                Iridescent Chrome & Liquid Gradients
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                Iridescent chrome is characterized by its fluid multi-color gradient meshes and liquid metallic luster, creating surfaces that appear to shift colors depending on the angle of view. This effect gives flat two-dimensional vector planes a pseudo-3D volume and atmospheric depth. Liquid gradients, on the other hand, are smooth transitions between colors that mimic the fluidity of liquids, adding a dynamic and organic feel to designs. When combined in a composition, iridescent chrome and liquid gradients enhance each other’s visual impact. Designers use isometric grids, long drop shadows, and complex color-stop mapping to achieve a tactile volume, ensuring that the composition remains scalable as a pure SVG/AI vector without the need for rasterized opacity blurs. This synergy results in a visually striking and cohesive design that captures attention and conveys a sense of movement and depth.
              </p>
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded text-xs font-mono text-zinc-400">
                <strong className="text-cyan-400">Keywords:</strong> Iridescent chrome, liquid gradients, multi-color gradient meshes, metallic luster, pseudo-3D volume, atmospheric depth, smooth color transitions, dynamic design, organic feel, isometric grids, long drop shadows, color-stop mapping, scalable vector, SVG/AI, visual impact, cohesive design, movement, depth.
              </div>
            </div>

            {/* 3. Optical Checkerboard Vortexes */}
            <div className="space-y-4 mb-10">
              <h3 className="text-lg font-serif-display font-bold text-[#ff67bd]">
                Optical Checkerboard Vortexes
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                High-contrast geometric patterns that create the illusion of movement and depth. These designs feature warping, distorting, and interweaving optical grids, alternating stripes, and repeating focal points. They are visually captivating, drawing attention with their extreme contrast and dynamic motion, making them effective in both physical packaging and digital screens.
              </p>
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded text-xs font-mono text-zinc-400">
                <strong className="text-[#ff67bd]">Keywords:</strong> Optical Checkerboard Vortexes, Geometric Kinetic Patterns, Warp, Distort, Interweave, Optical Grids, Alternating Stripes, Repeating Focal Points, Visual Depth Illusions, Viewer Attention, Extreme Contrast, Dynamic Motion, Physical Packaging, Digital Screen Environments.
              </div>
            </div>

            {/* Figure: Optical checkerboard vortexes example */}
            <div className="my-10 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/60 p-3 sm:p-4">
              <WatermarkedImage
                src={checkerVortexImg}
                alt="Optical checkerboard vortexes example"
                watermarkDensity="subtle"
                badgePosition="bottom-right"
                className="w-full aspect-[4/3] rounded-lg"
                imgClassName="w-full h-full object-cover rounded-lg"
              />
              <div className="mt-3 text-xs sm:text-sm text-zinc-400 italic font-sans">
                <strong className="text-zinc-200 not-italic font-semibold">Optical checkerboard vortexes example</strong>
                <span className="block text-[11px] font-mono text-zinc-500 mt-1 not-italic">
                  *Created using Recraft V4 via Leonardo*
                </span>
              </div>
            </div>

            {/* 4. 70s Retro Revival */}
            <div className="space-y-4 mb-10">
              <h3 className="text-lg font-serif-display font-bold text-amber-300">
                70s Retro Revival
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                70s retro revival: is a typography style characterized by groovy, hand-drawn display fonts that feature letterform distortion and tight kerning or tracking. This style often includes sweeping, fluid swirls and is set against nostalgic, earthy-warm color palettes such as burnt orange, mustard yellow, and avocado green. The typography breaks away from rigid grid structures, infusing brand materials with an expressive, human-crafted personality reminiscent of the 1970s.
              </p>
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded text-xs font-mono text-zinc-400">
                <strong className="text-amber-400">Keywords:</strong> 70s retro revival, groovy typography, letterform distortion, tight kerning, fluid swirls, earthy-warm colors, burnt orange, mustard yellow, avocado green, hand-drawn fonts, expressive typography.
              </div>
            </div>

            {/* Figure: The "Glow Against Black" standard */}
            <div className="my-10 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/60 p-3 sm:p-4">
              <WatermarkedImage
                src={glowBlackImg}
                alt="The Glow Against Black standard"
                watermarkDensity="subtle"
                badgePosition="bottom-right"
                className="w-full aspect-[4/3] sm:aspect-square rounded-lg"
                imgClassName="w-full h-full object-cover rounded-lg"
              />
              <div className="mt-3 text-xs sm:text-sm text-zinc-400 italic font-sans">
                <strong className="text-zinc-200 not-italic font-semibold">The “Glow Against Black” standard:</strong> features a striking combination of full-spectrum, hyper-saturated electric neon and optic-white colors set against deep obsidian or rich jet-black backgrounds. This high-contrast design ensures maximum visual impact, vibrant display performance, and outstanding print quality under both RGB digital lighting and CMYK/Pantone printing conditions.
              </div>
            </div>

            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded text-xs font-mono text-zinc-400">
              <strong className="text-pink-400">Keywords:</strong> Glow Against Black, full-spectrum, hyper-saturated, electric neon, optic-white, deep obsidian, jet-black, high-contrast, optical pop, vivid display, print vibrancy, RGB digital backlighting, CMYK/Pantone print.
            </div>
          </div>

          {/* ============================================================== */}
          {/* PAGE 7: Digital Provenance & Table 1 */}
          {/* ============================================================== */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-zinc-100 mb-6 pb-3 border-b border-zinc-800">
              Digital Provenance & Technical Vector Delivery Standards
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-8">
              To command premium enterprise licensing rates, commercial artwork must transcend visual impact and satisfy strict technical and legal procurement standards. In 2026, corporate buyers demand complete intellectual property safety. All vector deliverables must incorporate <strong className="text-cyan-300 font-semibold">Content Authenticity Initiative (CAI)</strong> digital provenance metadata, embedding verifiable attribution, creation history, and human-refinement records directly into file headers. Technical vector assets must maintain strict SVG path efficiency (under 10,000 nodes per tile to prevent RIP/printing engine failure), non-destructive live pattern tiles, clean spot-color separations mapped to Pantone Matching System (PMS) standards, and clear CMYK color space conversions for giclée and rotary offset production.
            </p>

            {/* TABLE 1: Visual Paradigm Shift */}
            <div className="my-8 rounded-xl overflow-hidden border border-amber-500/40 bg-zinc-950">
              <div className="p-4 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 border-b border-amber-500/30">
                <h4 className="font-serif-display text-lg font-bold text-amber-200">
                  Visual Paradigm Shift: AI Minimalism vs. 2026 Psychedelic Maximalism
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
                  <thead>
                    <tr className="bg-amber-500 text-black font-bold uppercase tracking-wider text-[11px]">
                      <th className="p-3.5 border-r border-amber-600/40">Visual Feature</th>
                      <th className="p-3.5 border-r border-amber-600/40">AI Minimalism (2020–2024)</th>
                      <th className="p-3.5">2026 Psychedelic Maximalism</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-zinc-200 border-r border-zinc-800">Color Palettes</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Monochromatic, muted corporate neutrals, low-contrast pastels</td>
                      <td className="p-3.5 text-cyan-300 font-medium">Full-spectrum, hyper-saturated neon anchored against deep obsidian black</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-zinc-200 border-r border-zinc-800">Line Work</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Uniform mathematical stroke weights, sterile Bezier paths</td>
                      <td className="p-3.5 text-pink-300 font-medium">Irregular line weights, hand-drawn wobbles, expressive contour control</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-zinc-200 border-r border-zinc-800">Composition</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Expansive white space, isolated central focal points, rigid grids</td>
                      <td className="p-3.5 text-[#d8ff43] font-medium">Dense visual layering, optical vortexes, overlapping pattern swatches</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-zinc-200 border-r border-zinc-800">Brand Emotion</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Clinical, risk-averse, highly safe, algorithm-optimized</td>
                      <td className="p-3.5 text-amber-300 font-medium">Unapologetic, rebellious, human, deeply tactile, evocative</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-zinc-200 border-r border-zinc-800">Consumer perception</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Generic machine output; easily overlooked in feed</td>
                      <td className="p-3.5 text-emerald-300 font-bold">High commercial value; commands 2.3x higher social media engagement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-zinc-400 italic text-sm">
              This fundamental evolution in visual preference directly alters how commercial art directors and procurement managers source visual assets across key B2B market sectors.
            </p>
          </div>

          {/* ============================================================== */}
          {/* PAGES 8-10: Industry Buyer Profiles & Table 2 */}
          {/* ============================================================== */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-zinc-100 mb-6 pb-3 border-b border-zinc-800">
              Industry Buyer Profiles & Market Demand
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-6">
              Commercial demand for Psychedelic Maximalism spans multiple enterprise procurement channels. B2B art buyers across music packaging, live event production, wellness consumer packaged goods (CPG), and interior textiles are actively shifting creative budgets toward complex, high-impact visuals. In an oversaturated digital landscape, maximalist artwork provides the visual density required to halt screen-scrolling and command physical shelf presence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              {/* Music & Album Cover Design */}
              <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <h3 className="font-serif-display text-lg font-bold text-cyan-300">
                  Music & Album Cover Design
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  The music recording industry remains a high-volume buyer of psychedelic visual assets, driven by the sustained resurgence of physical vinyl packaging, immersive streaming canvas animations, and limited-edition merchandise drops. Buyer motivations focus on visual storytelling that mirrors sonic identity while establishing immediate recognition on streaming thumbnails.
                </p>
                <div className="text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-800">
                  <strong className="text-zinc-200">Technical Deliverables:</strong> 3000x3000px 300 DPI layered PSD/AI master files, spot-color separation files for vinyl jacket printing, mechanical layouts for spine and gatefold prints, and 1080x1920px MP4/GIF motion canvas loops.
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  <strong className="text-zinc-200">Commercial Pricing Tiers:</strong>
                  <ol className="list-decimal list-inside mt-1 space-y-0.5 text-cyan-300">
                    <li>Premade Cover Art: $30–$80</li>
                    <li>Mid-Tier Custom Commissions: $150–$500</li>
                    <li>Premium Label Packages: $500–$2,000+</li>
                    <li>High-End Creative Agency Tier: $2,000–$10,000+</li>
                  </ol>
                </div>
              </div>

              {/* Festivals, Merchandise & Apparel */}
              <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <h3 className="font-serif-display text-lg font-bold text-pink-400">
                  Festivals, Merchandise & Apparel
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Streetwear brands, tour merchandise managers, and live music festival coordinators require bold visual assets capable of translating across screen printing, embroidery, and large-format physical signage. Buyers prioritize dense, high-contrast compositions that maintain visual clarity on textile substrates.
                </p>
                <div className="text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-800">
                  <strong className="text-zinc-200">Technical Deliverables:</strong> Vector SVG/EPS files with clean path geometries, color-separated artwork split into max 6–8 spot colors (Pantone coded) for screen printing, high-resolution placement print mockups, and scalable vector cutouts.
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  <strong className="text-zinc-200">Commercial Terms:</strong> $200–$800 flat fee per placement design, or a structured 5–8% royalty on total retail merchandise sales.
                </div>
              </div>

              {/* Wellness and Lifestyle Brands */}
              <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <h3 className="font-serif-display text-lg font-bold text-emerald-300">
                  Wellness and Lifestyle Brands
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Boutique lifestyle, adaptogenic beverage, personal care, and eco-conscious CPG brands leverage bio-surrealism to communicate botanical potency and elevated sensory experiences. Target applications include aluminum beverage cans, secondary carton packaging, cosmetics labels, and pop-up retail environmental graphics.
                </p>
                <div className="text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-800">
                  <strong className="text-zinc-200">Technical Deliverables:</strong> Scalable vector label dielines, high-resolution CMYK packaging wraps, transparent background PNG renders, and vector spot-illustration libraries for multi-SKU product lines.
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  <strong className="text-zinc-200">Commercial Terms:</strong> $500–$2,500 flat project fee per SKU line, or category-exclusive licensing contracts tied to retail distribution volume.
                </div>
              </div>

              {/* Home Decor & Textiles */}
              <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <h3 className="font-serif-display text-lg font-bold text-[#d8ff43]">
                  Home Decor & Textiles
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Commercial buyers for interior wallpaper brands, boutique bedding collections, upholstery fabric mills, and decorative ceramic manufacturers actively license seamless repeat patterns. Driven by consumer interior trends toward maximalist statement walls and eclectic textile layering, buyers seek intricate repeats that tile seamlessly without visual banding.
                </p>
                <div className="text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-800">
                  <strong className="text-zinc-200">Technical Deliverables:</strong> Production-ready seamless pattern repeat tiles (half-drop or block repeat), layered AI/PSD files with color-separated channels for rotary screen or digital textile printing, and technical color swatches.
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  <strong className="text-zinc-200">Commercial Terms:</strong> 5–10% base royalty on net wholesale sales (with bonus tiers up to 15% for high-volume performance), or $400–$1,200 outright flat-fee licenses per pattern tile.
                </div>
              </div>
            </div>

            {/* TABLE 2: Industry Demand Matrix */}
            <div className="my-8 rounded-xl overflow-hidden border border-cyan-500/40 bg-zinc-950">
              <div className="p-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border-b border-cyan-500/30">
                <h4 className="font-serif-display text-lg font-bold text-cyan-200">
                  Industry Demand Matrix: Profiles & Commercial Terms
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
                  <thead>
                    <tr className="bg-cyan-500 text-black font-bold uppercase tracking-wider text-[11px]">
                      <th className="p-3.5 border-r border-cyan-600/40">Industry Sector</th>
                      <th className="p-3.5 border-r border-cyan-600/40">Target Buyer Profile</th>
                      <th className="p-3.5 border-r border-cyan-600/40">Primary Product Deliverables</th>
                      <th className="p-3.5">Standard Commercial Pricing / Fee Structures</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-cyan-300 border-r border-zinc-800">Music & Audio</td>
                      <td className="p-3.5 text-zinc-300 border-r border-zinc-800">Independent Musicians, Record Labels, Creative Directors</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Layered Cover PSD/AI, Vinyl Packaging Dielines, Motion Canvas Loops</td>
                      <td className="p-3.5 text-zinc-200 font-mono text-xs">$30–$80 (Premade); $150–$500 (Mid-Custom); $500–$2,000 (Label Package); $2,000–$10,000+ (Agency Campaign)</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-pink-400 border-r border-zinc-800">Festivals & Apparel</td>
                      <td className="p-3.5 text-zinc-300 border-r border-zinc-800">Streetwear Apparel Brands, Merch Managers, Festival Directors</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Spot-Color Vector SVG/EPS, Placement Prints, Screenprint Separations</td>
                      <td className="p-3.5 text-zinc-200 font-mono text-xs">$200–$800 flat fee per design, or 5–8% gross merchandise sales royalty</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-emerald-300 border-r border-zinc-800">Wellness & Lifestyle</td>
                      <td className="p-3.5 text-zinc-300 border-r border-zinc-800">CPG Brand Directors, Boutique Packaging Procurement</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Packaging Dielines, CMYK Label Wraps, Isolated Vector Botanical Spots</td>
                      <td className="p-3.5 text-zinc-200 font-mono text-xs">$500–$2,500 flat project fee, or category-exclusive licensing agreement</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-[#d8ff43] border-r border-zinc-800">Home Decor & Textiles</td>
                      <td className="p-3.5 text-zinc-300 border-r border-zinc-800">Upholstery Fabric Mills, Wallpaper Brands, Ceramic Manufacturers</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Seamless Repeat Swatches, Layered Rotary Separations, Colorways</td>
                      <td className="p-3.5 text-zinc-200 font-mono text-xs">5–10% net wholesale royalty (12–15% bonus tiers), or $400–$1,200 flat license</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* PAGES 11-12: The Multi-Use Asset Strategy & Diagram 1 */}
          {/* ============================================================== */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-zinc-100 mb-6 pb-3 border-b border-zinc-800">
              The Multi-Use Asset Strategy: Modularizing 20 Core Artworks
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-8">
              To build a scalable, high-yield creative practice in 2026, designers must transition from creating one-off isolated pieces to executing an <strong className="text-[#d8ff43]">Asset Modularization Engine</strong>. Modularization is the systematic process of disassembling a complex, high-density "hero" master artwork into standalone, technically optimized visual components. By designing 20 core hero artworks with modularity planned from inception, a commercial studio can extract hundreds of individual licensable assets, maximizing return on creative investment (ROI) while preserving visual coherence across brand channels.
            </p>

            {/* DIAGRAM 1: ASSET MODULARIZATION ARCHITECTURE */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-purple-500/40 my-10 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <div className="text-center mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-purple-400 font-bold">
                  FIGURE 2.0 // SYSTEM ARCHITECTURE
                </span>
                <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-zinc-100 mt-1">
                  ASSET MODULARIZATION ARCHITECTURE
                </h4>
              </div>

              {/* Hierarchy Tree */}
              <div className="max-w-2xl mx-auto flex flex-col items-center">
                {/* Level 1: Root */}
                <div className="w-64 py-3.5 px-4 rounded-xl bg-indigo-950 border-2 border-indigo-500 text-center text-white font-mono font-bold text-sm shadow-lg">
                  20 Hero Master Artworks
                </div>

                {/* Vertical Arrow */}
                <div className="w-0.5 h-6 bg-purple-500/60 my-1" />

                {/* Level 2: 2 branches */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="py-3 px-3 rounded-lg bg-purple-950/80 border border-purple-500 text-center text-purple-200 font-mono text-xs font-semibold">
                    20 Seamless Pattern Repeats
                  </div>
                  <div className="py-3 px-3 rounded-lg bg-purple-950/80 border border-purple-500 text-center text-purple-200 font-mono text-xs font-semibold">
                    60 Isolated Spot Illustrations
                  </div>
                </div>

                {/* Vertical Connector */}
                <div className="w-0.5 h-5 bg-purple-500/60 my-1" />

                {/* Level 3: 2 sub-branches */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="py-2.5 px-3 rounded-lg bg-purple-900/60 border border-purple-400 text-center text-purple-200 font-mono text-xs">
                    60 Vector & PNG Clipart Elements
                  </div>
                  <div className="py-2.5 px-3 rounded-lg bg-purple-900/60 border border-purple-400 text-center text-purple-200 font-mono text-xs">
                    40 Kinetic Typographic Layouts
                  </div>
                </div>

                {/* Vertical Connector */}
                <div className="w-0.5 h-5 bg-purple-500/60 my-1" />

                {/* Level 4: Brush Sets */}
                <div className="w-full max-w-md py-2.5 px-4 rounded-lg bg-purple-900/50 border border-purple-400 text-center text-purple-200 font-mono text-xs">
                  20 Custom Digital Texture / Procreate Brush Sets
                </div>

                {/* Down Arrow */}
                <div className="w-0.5 h-6 bg-amber-400 my-1 animate-pulse" />

                {/* Level 5: Target Output Vault */}
                <div className="w-full max-w-md py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-yellow-500/30 border-2 border-amber-400 text-center shadow-[0_0_25px_rgba(251,191,36,0.3)]">
                  <span className="font-serif-display font-bold text-lg sm:text-xl text-amber-300 block">
                    200+ Monetizable Asset Library
                  </span>
                  <span className="text-[11px] font-mono text-amber-200/80 uppercase tracking-wider">
                    Derived from 20 Hero Artworks
                  </span>
                </div>
              </div>
            </div>

            {/* Deconstructed Asset Types List */}
            <div className="space-y-4 my-8">
              <h3 className="text-xl font-serif-display font-bold text-zinc-100">
                Deconstructed Asset Types
              </h3>
              <ul className="space-y-3 text-zinc-300 text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <div>
                    <strong className="text-zinc-100 font-semibold">Seamless Repeat Patterns:</strong> Technical pattern swatches engineered in half-drop or block configurations. Delivered as seamless vector SVG/AI files and high-resolution 300 DPI PSD pattern presets, these tiles are built with non-destructive layers to facilitate instant colorway shifts for rotary textile printing, commercial wallcoverings, and apparel manufacturing.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <div>
                    <strong className="text-zinc-100 font-semibold">Spot Illustrations:</strong> Isolated hero graphic elements completely stripped of background graphics. Extracted as clean, high-resolution transparent PNG cutouts and scalable vector SVG cutouts, these assets are optimized for placement prints on t-shirts, tote bags, stickers, CPG product packaging, and editorial spots.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <div>
                    <strong className="text-zinc-100 font-semibold">Vector & PNG Clipart:</strong> Highly detailed individual graphic sub-components—such as surreal eyes, botanical leaves, liquid chrome droplets, and psychedelic starbursts. Packaged as scalable SVG libraries and high-resolution digital clipart packs ready for immediate integration into drag-and-drop digital design software.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <div>
                    <strong className="text-zinc-100 font-semibold">Experimental & Kinetic Typography:</strong> Custom visual lettering, display wordmarks, bubble display lettering, and quote compositions extracted from master hero artworks. Delivered as expanded vector paths and standalone display graphic assets ready for commercial advertising, editorial layouts, and event collateral.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <div>
                    <strong className="text-zinc-100 font-semibold">Digital Assets & Brushes:</strong> Custom texture overlays, liquid chrome brushes, isometric grid guides, and stipple noise brushes created during the master art production phase. Packaged and exported as downloadable Procreate .brushset files, Photoshop .abr brush libraries, and seamless raster grain overlays for sale to other digital creators.
                  </div>
                </li>
              </ul>
            </div>

            {/* The 1-to-10 Expansion Formula */}
            <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4 my-8">
              <h3 className="text-xl font-serif-display font-bold text-zinc-100">
                The 1-to-10 Expansion Formula
              </h3>
              <p className="text-sm text-zinc-300">
                By systematically applying this extraction workflow across a primary collection of 20 master hero artworks, a studio yields an enterprise-ready, multi-channel commercial library:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-zinc-950 rounded border border-zinc-800 text-zinc-300">
                  <strong className="text-cyan-400 block mb-0.5">• 20 Master Hero Compositions</strong>
                  Complex visual master files for fine art prints, album covers & campaigns.
                </div>
                <div className="p-3 bg-zinc-950 rounded border border-zinc-800 text-zinc-300">
                  <strong className="text-pink-400 block mb-0.5">• 20 Seamless Repeat Tiles</strong>
                  Configured for textile mills, wallpaper licensing, and POD home decor.
                </div>
                <div className="p-3 bg-zinc-950 rounded border border-zinc-800 text-zinc-300">
                  <strong className="text-emerald-400 block mb-0.5">• 60 Isolated Spot Illustrations</strong>
                  Extracted at a rate of 3 distinct hero elements per composition.
                </div>
                <div className="p-3 bg-zinc-950 rounded border border-zinc-800 text-zinc-300">
                  <strong className="text-amber-400 block mb-0.5">• 60 Vector/PNG Clipart Assets</strong>
                  Granular design elements isolated for digital design suites & stock licensing.
                </div>
                <div className="p-3 bg-zinc-950 rounded border border-zinc-800 text-zinc-300">
                  <strong className="text-[#d8ff43] block mb-0.5">• 40 Kinetic Typographic Compositions</strong>
                  Isolated custom display lettering and quote layouts for publishing & merch.
                </div>
                <div className="p-3 bg-zinc-950 rounded border border-zinc-800 text-zinc-300">
                  <strong className="text-purple-400 block mb-0.5">• 20 Digital Asset & Brush Sets</strong>
                  Custom line brushes, gradient meshes, and texture overlays.
                </div>
              </div>
              <div className="p-3 rounded bg-zinc-950 border border-[#d8ff43]/30 text-center font-mono text-xs text-[#d8ff43]">
                <strong>Total Catalog Output:</strong> 200+ High-Value Commercial Assets generated from just 20 core creative sessions.
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* PAGES 13-17: The 7-Stream Monetization Sequence & Table 3 */}
          {/* ============================================================== */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-zinc-100 mb-6 pb-3 border-b border-zinc-800">
              The 7-Stream Monetization Sequence
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-8">
              Relying on a single revenue stream leaves visual artists highly vulnerable to economic shifts, platform algorithm adjustments, and seasonal procurement cycles. Adopting the "four-legged table" business architecture articulated by design strategist Mable Tan, a resilient creative business must balance passive, recurring e-commerce channels with active, high-touch client engagements. Establishing at least four active revenue columns ensures financial stability during industry lulls.
            </p>

            {/* DIAGRAM 2: FOUR-LEGGED COMMERCIAL BUSINESS ENGINE */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-blue-500/40 my-10 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
              <div className="text-center mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-bold">
                  FIGURE 3.0 // BUSINESS ARCHITECTURE
                </span>
                <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-zinc-100 mt-1">
                  FOUR-LEGGED COMMERCIAL BUSINESS ENGINE
                </h4>
              </div>

              <div className="max-w-2xl mx-auto flex flex-col items-center">
                <div className="w-80 py-3.5 px-4 rounded-xl bg-indigo-950 border-2 border-indigo-400 text-center text-white font-mono font-bold text-sm shadow-lg">
                  Resilient Commercial Business Engine
                </div>

                <div className="w-0.5 h-6 bg-blue-500/60 my-1" />

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="py-3 px-3 rounded-lg bg-blue-950/80 border border-blue-400 text-center text-blue-200 font-mono text-xs">
                    <span className="block font-bold">Streams 1 & 3</span>
                    POD / Digital Products (Passive)
                  </div>
                  <div className="py-3 px-3 rounded-lg bg-blue-950/80 border border-blue-400 text-center text-blue-200 font-mono text-xs">
                    <span className="block font-bold">Streams 2 & 4</span>
                    Surface Design Licensing & Album Art (Semi-Active)
                  </div>
                </div>

                <div className="w-0.5 h-5 bg-blue-500/60 my-1" />

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="py-3 px-3 rounded-lg bg-blue-900/60 border border-blue-400 text-center text-blue-200 font-mono text-xs">
                    <span className="block font-bold">Stream 5</span>
                    Wholesale & Retail B2B Distribution (Active)
                  </div>
                  <div className="py-3 px-3 rounded-lg bg-blue-900/60 border border-blue-400 text-center text-blue-200 font-mono text-xs">
                    <span className="block font-bold">Streams 6 & 7</span>
                    Education & Custom Client Commissions (Active)
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Breakdown of 7 Streams */}
            <div className="space-y-6 my-8">
              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                <h4 className="font-serif-display font-bold text-zinc-100 text-base mb-2">
                  1. Print-on-Demand (POD) Infrastructure
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 mb-3">
                  Print-on-demand platforms allow creators to monetize physical goods globally without capital expenditure, physical inventory, or shipping overhead. Strategic deployment across specialized platforms yields optimal channel margins:
                </p>
                <ul className="text-xs font-mono space-y-1.5 text-zinc-400">
                  <li><strong className="text-cyan-300">• INPRNT:</strong> Generates ~50% artist profit margin on giclée fine art prints. Curated, community-voted application model commanding $30–$100+ retail.</li>
                  <li><strong className="text-pink-400">• Fourthwall:</strong> Dedicated storefront with custom domain, zero monthly fees on physical goods, keeping 100% of custom set markups and customer email data.</li>
                  <li><strong className="text-amber-400">• Redbubble:</strong> Captures high volume organic search traffic for sticker packs (Standard 50%, Premium 20%, Pro 0% platform fee tiers).</li>
                  <li><strong className="text-[#d8ff43]">• Spoonflower:</strong> Focuses exclusively on textiles and wallpaper, paying 10–15% base royalty with multi-channel distribution to Etsy, Amazon, and Michaels.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                <h4 className="font-serif-display font-bold text-zinc-100 text-base mb-2">
                  2. Fabric & Surface Pattern Licensing
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Art licensing permits manufacturers to apply designs to physical products in exchange for royalty compensation. Base royalty rates in surface design typically range between 5% and 10% of net wholesale sales, with tiered bonus structures reaching 15% upon surpassing contract volume thresholds. Licensing agreements frequently include recoupable advances ($500–$5,000+) paid upfront against future royalties. Contracts must explicitly define whether rights are exclusive or non-exclusive, scope exact product categories and geographical sales territories, establish minimum performance guarantees, and ensure the artist retains core copyright ownership.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                <h4 className="font-serif-display font-bold text-zinc-100 text-base mb-2">
                  3. Digital Downloads & Asset Bundles
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Direct-to-consumer (DTC) digital storefronts hosted on Etsy, Gumroad, or self-hosted platforms yield extraordinary profit margins (90–95% net after payment processing). Monetizable digital products derived from modularized assets include custom Procreate brush sets ($5–$20), editable Canva brand kits ($10–$50), high-resolution transparent PNG clipart bundles, and printable digital planners ($10–$30 per bundle).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                <h4 className="font-serif-display font-bold text-zinc-100 text-base mb-2">
                  4. Album Cover Illustration & Music Branding
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Targeting independent musicians and record labels provides consistent active revenue. Structured pricing model: Premade Cover Artwork ($30–$80), Mid-Tier Custom Cover Art ($150–$500), Premium Label Packages ($500–$2,000+), and Creative Agency Campaign Tier ($2,000–$10,000+).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                <h4 className="font-serif-display font-bold text-zinc-100 text-base mb-2">
                  5. Wholesale & Brand Collaborations (The Gingiber Model)
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Deconstructing the growth trajectory of creative entrepreneur Stacie Bloomfield (founder of Gingiber) demonstrates how digital art scales into physical retail. Starting with digital nursery prints on Etsy, Bloomfield expanded into B2B wholesale, building a physical distribution network supplying over 600 retail stockists via platforms like Faire, alongside high-value corporate retail licensing contracts with brands including Land of Nod, Williams-Sonoma, Crate & Barrel, and Moda Fabrics.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                <h4 className="font-serif-display font-bold text-zinc-100 text-base mb-2">
                  6. Creative Teaching & Digital Workshops
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Monetizing technical expertise via online educational channels generates high-margin passive income while positioning the artist as an industry authority. Creators publish structured video courses on Skillshare, Teachable, or Creativebug, while selling downloadable e-books, technical brush workbooks, and surface design guides directly to aspiring designers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                <h4 className="font-serif-display font-bold text-zinc-100 text-base mb-2">
                  7. Custom Commissions & Client Work
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Active, high-touch client work provides immediate cash flow to fund ongoing portfolio development. Professional project management requires strict legal contracts, a 30–50% non-refundable upfront deposit before work begins, structured milestone payments, enforceable revision limits (maximum 2 revision rounds prior to additional hourly billing), late payment penalties, and explicit usage rights agreements detailing allowed channels, media, and timeframes.
                </p>
              </div>
            </div>

            {/* TABLE 3: 7-Stream Monetization Blueprint */}
            <div className="my-8 rounded-xl overflow-hidden border border-amber-500/40 bg-zinc-950">
              <div className="p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-amber-500/30">
                <h4 className="font-serif-display text-lg font-bold text-amber-200">
                  7-Stream Monetization Blueprint
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  A diversified monetization framework ensures financial security, enabling creators to transform individual artistic outputs into a scalable brand ecosystem.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
                  <thead>
                    <tr className="bg-amber-500 text-black font-bold uppercase tracking-wider text-[11px]">
                      <th className="p-3.5 border-r border-amber-600/40">Income Stream</th>
                      <th className="p-3.5 border-r border-amber-600/40">Income Type</th>
                      <th className="p-3.5 border-r border-amber-600/40">Key Platforms / Channels</th>
                      <th className="p-3.5 border-r border-amber-600/40">Typical Margin / Royalty Rate</th>
                      <th className="p-3.5">Operational Complexity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-zinc-200 border-r border-zinc-800">Print-on-Demand (POD)</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Passive</td>
                      <td className="p-3.5 text-zinc-300 border-r border-zinc-800">INPRNT, Fourthwall Pro, Redbubble, Spoonflower</td>
                      <td className="p-3.5 text-cyan-300 font-mono text-xs border-r border-zinc-800">~50% (INPRNT); 100% markup (Fourthwall); 10–15% (Spoonflower)</td>
                      <td className="p-3.5 text-emerald-400 font-semibold">Low (Automated production and shipping)</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-zinc-200 border-r border-zinc-800">Fabric & Pattern Licensing</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Passive / Semi-Active</td>
                      <td className="p-3.5 text-zinc-300 border-r border-zinc-800">Manufacturers, Pattern Observer Directory</td>
                      <td className="p-3.5 text-cyan-300 font-mono text-xs border-r border-zinc-800">5–10% base net wholesale royalty (up to 15% bonus tiers)</td>
                      <td className="p-3.5 text-amber-400 font-semibold">Medium (Contract negotiation and compliance)</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-zinc-200 border-r border-zinc-800">Digital Downloads & Bundles</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Passive</td>
                      <td className="p-3.5 text-zinc-300 border-r border-zinc-800">Etsy, Gumroad, Self-Hosted Storefront</td>
                      <td className="p-3.5 text-cyan-300 font-mono text-xs border-r border-zinc-800">90–95% net profit (minus processing fees)</td>
                      <td className="p-3.5 text-emerald-400 font-semibold">Low (Fully automated digital delivery)</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-zinc-200 border-r border-zinc-800">Album Cover & Music Branding</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Active</td>
                      <td className="p-3.5 text-zinc-300 border-r border-zinc-800">Direct Outreach, Label Procurement, Agencies</td>
                      <td className="p-3.5 text-cyan-300 font-mono text-xs border-r border-zinc-800">Flat fee ($30–$80 premade; $150–$500 custom; $2k–$10k+ agency)</td>
                      <td className="p-3.5 text-amber-400 font-semibold">Medium (Client briefs and revision cycles)</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-zinc-200 border-r border-zinc-800">Wholesale & Retail Sale</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Active / Passive</td>
                      <td className="p-3.5 text-zinc-300 border-r border-zinc-800">Faire B2B, Direct Retailers, Corporate Licensing</td>
                      <td className="p-3.5 text-cyan-300 font-mono text-xs border-r border-zinc-800">50% retail margin; 5–10% corporate licensing royalties</td>
                      <td className="p-3.5 text-rose-400 font-semibold">High (B2B inventory management and logistics)</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-zinc-200 border-r border-zinc-800">Creative Teaching & Courses</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Passive / Semi-Active</td>
                      <td className="p-3.5 text-zinc-300 border-r border-zinc-800">Skillshare, Teachable, Creativebug, Self-Hosted</td>
                      <td className="p-3.5 text-cyan-300 font-mono text-xs border-r border-zinc-800">40–90% depending on platform host</td>
                      <td className="p-3.5 text-amber-400 font-semibold">Medium (Upfront curriculum production)</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="p-3.5 font-semibold text-zinc-200 border-r border-zinc-800">Custom Commissions & Enterprise</td>
                      <td className="p-3.5 text-zinc-400 border-r border-zinc-800">Active</td>
                      <td className="p-3.5 text-zinc-300 border-r border-zinc-800">Direct Client Inquiries, Enterprise Contracts</td>
                      <td className="p-3.5 text-cyan-300 font-mono text-xs border-r border-zinc-800">Flat fee based on scope ($150–$5,000+ with 30–50% deposit)</td>
                      <td className="p-3.5 text-rose-400 font-semibold">High (High-touch project management)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* PAGES 17-19: Implementation Roadmap & Diagram 3 */}
          {/* ============================================================== */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-zinc-100 mb-6 pb-3 border-b border-zinc-800">
              Strategic Brand Architecture & Implementation Roadmap
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-6">
              Transitioning from an individual freelance illustrator into a scalable brand ecosystem requires clear business frameworks and structured execution milestones. By treating creative outputs as an intellectual property (IP) library, designers build sustainable, long-term commercial equity that withstands shifting aesthetic trends.
            </p>

            {/* Core Business Philosophies */}
            <div className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-4 my-8">
              <h3 className="text-xl font-serif-display font-bold text-zinc-100">
                Core Business Philosophies
              </h3>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li>
                  <strong className="text-cyan-300">• The "Four-Legged Table" Business Model (Mable Tan Framework):</strong> A sustainable creative enterprise must rest upon at least four independent revenue streams. Balancing passive e-commerce engines (POD, digital downloads) with semi-active royalties (surface pattern licensing) and active client services (album art, custom commissions) insulates the studio against seasonal buying lulls and market fluctuations.
                </li>
                <li>
                  <strong className="text-pink-400">• "Selling Without Ceiling" Principle (Bonnie Christine Philosophy):</strong> Decouple earning potential from active labor hours. By prioritizing asset modularization, downloadable digital product bundles, and residual licensing royalties, a single hero artwork can generate passive revenue repeatedly without incurring additional production time or overhead.
                </li>
                <li>
                  <strong className="text-[#d8ff43]">• The Multi-Hyphenate Brand Ecosystem (Lisa Congdon Framework):</strong> A modern creative brand achieves longevity by combining diverse commercial channels into a unified creative identity. As demonstrated by Lisa Congdon, scaling a visual brand involves balancing commercial pattern licensing (e.g., Nerida Hansen fabrics) with digital educational courses (Skillshare, Creativebug), publishing (authoring illustrated books), direct-to-consumer e-commerce, and physical brick-and-mortar retail storefront presence (Portland, OR).
                </li>
                <li>
                  <strong className="text-amber-400">• IP Retention & Ownership Standard:</strong> Retain underlying copyright across all creative work. Grant corporate clients category-specific, time-bound, or geographically scoped licenses rather than executing complete copyright transfers. Require Content Authenticity Initiative (CAI) metadata tracking on all digital exports to protect IP provenance and ensure perpetual attribution.
                </li>
              </ul>
            </div>

            {/* DIAGRAM 3: 4-PHASE IMPLEMENTATION ROADMAP */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-purple-500/40 my-10 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <div className="text-center mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-purple-400 font-bold">
                  FIGURE 4.0 // CHRONOLOGICAL EXECUTION
                </span>
                <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-zinc-100 mt-1">
                  4-PHASE IMPLEMENTATION ROADMAP
                </h4>
              </div>

              <div className="max-w-2xl mx-auto space-y-4">
                {/* Phase 1 */}
                <div className="p-4 sm:p-5 rounded-xl bg-purple-950/80 border-2 border-purple-500 shadow-md">
                  <div className="font-mono font-bold text-sm text-purple-200 mb-1">
                    Phase 1: Creation & Digitization (Months 1–3)
                  </div>
                  <ul className="text-xs text-zinc-300 font-mono space-y-1">
                    <li>• Produce 20 hero vector artworks in Psychedelic Maximalism style</li>
                    <li>• Apply 1-to-10 Expansion Formula → Generate 200+ modular assets</li>
                    <li>• Embed CAI metadata; format SVG/EPS spot colors & PSD repeats</li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-purple-500/60" />
                </div>

                {/* Phase 2 */}
                <div className="p-4 sm:p-5 rounded-xl bg-indigo-950/80 border-2 border-indigo-500 shadow-md">
                  <div className="font-mono font-bold text-sm text-indigo-200 mb-1">
                    Phase 2: Storefront & POD Launch (Months 4–6)
                  </div>
                  <ul className="text-xs text-zinc-300 font-mono space-y-1">
                    <li>• Launch Fourthwall Pro storefront (.store domain) & INPRNT shop</li>
                    <li>• Upload pattern library to Spoonflower (digital proofing active)</li>
                    <li>• Package Canva templates, Procreate brushes for Etsy & Gumroad</li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-purple-500/60" />
                </div>

                {/* Phase 3 */}
                <div className="p-4 sm:p-5 rounded-xl bg-blue-950/80 border-2 border-blue-500 shadow-md">
                  <div className="font-mono font-bold text-sm text-blue-200 mb-1">
                    Phase 3: Outbound Licensing & Client Pitching (Months 7–9)
                  </div>
                  <ul className="text-xs text-zinc-300 font-mono space-y-1">
                    <li>• Assemble 8–15 design category pitch decks for home/textiles</li>
                    <li>• Pitch record labels & independent artists for music branding</li>
                    <li>• Join Pattern Observer Directory for direct buyer visibility</li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-purple-500/60" />
                </div>

                {/* Phase 4 */}
                <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/80 border-2 border-emerald-500 shadow-md">
                  <div className="font-mono font-bold text-sm text-emerald-200 mb-1">
                    Phase 4: Wholesale & Education Scaling (Months 10–12)
                  </div>
                  <ul className="text-xs text-zinc-300 font-mono space-y-1">
                    <li>• Open Faire B2B wholesale portal for top physical prints/goods</li>
                    <li>• Publish digital masterclass on Skillshare / Teachable</li>
                    <li>• Reinvest cash flow into legal contract counsel & IP expansion</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Detailed Phase descriptions */}
            <div className="space-y-6 my-8 text-sm leading-relaxed text-zinc-300">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h4 className="font-mono font-bold text-zinc-100 text-sm mb-2">
                  Phase 1: Asset Creation & Digitization (Months 1–3)
                </h4>
                <p>
                  Produce 20 original hero vector master compositions adhering to 2026 Psychedelic Maximalism markers (bio-surrealism, liquid chrome, kinetic checkerboards, 70s typography, glow-against-black). Execute the 1-to-10 Expansion Formula to deconstruct master files into a 200+ piece asset library. Embed Content Authenticity Initiative (CAI) metadata across all exports, verify clean SVG node paths (&lt;10,000 nodes/tile), and establish Pantone/CMYK spot-color separations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h4 className="font-mono font-bold text-zinc-100 text-sm mb-2">
                  Phase 2: POD & Digital Storefront Launch (Months 4–6)
                </h4>
                <p>
                  Launch automated passive income storefronts on INPRNT (fine art giclée) and Fourthwall Pro (custom .store domain, zero digital fees, direct email capture). Upload seamless pattern collection to Spoonflower, utilizing digital proofing tools and establishing multi-channel distribution to Etsy, Amazon, and Michaels. List modular Canva templates, Procreate brush sets, and PNG clipart bundles for direct-to-consumer digital sale on Etsy and Gumroad.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h4 className="font-mono font-bold text-zinc-100 text-sm mb-2">
                  Phase 3: Outbound Licensing & Client Pitching (Months 7–9)
                </h4>
                <p>
                  Curate category-specific pitch decks (8–15 target designs per deck) targeted at home decor, apparel, and stationery buyers. Launch direct B2B outreach campaigns targeting independent record labels, musicians, and festival merchandise buyers, presenting tiered premade and custom cover art packages. List portfolio assets on global buyer platforms, including the Pattern Observer Directory, to capture incoming manufacturer licensing queries.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h4 className="font-mono font-bold text-zinc-100 text-sm mb-2">
                  Phase 4: Wholesale & Education Scaling (Months 10–12)
                </h4>
                <p>
                  Launch a B2B wholesale storefront on Faire, supplying physical art prints, stationery, and lifestyle goods to physical retail stockists (executing the Gingiber expansion model). Record and launch a comprehensive video masterclass on Skillshare or Teachable detailing specialized vector mechanics and pattern monetization strategies. Reinvest recurring studio cash flow into legal contract reviews (enforcing minimum guarantees, audit rights, and rights reversion clauses) to secure scalable, ceiling-free creative independence.
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* PAGE 20: And to wrap it up… & Diagram 4 */}
          {/* ============================================================== */}
          <div className="pt-8 border-t border-zinc-800">
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-zinc-100 mb-4">
              And to wrap it up…
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8">
              The visual landscape of 2026 belongs to designers who create complex, emotionally resonant, and distinctly human visual work. By pairing the vibrant visual language of Psychedelic Maximalism with a modular asset engine and a multi-stream business architecture, visual strategists and commercial artists can construct scalable, resilient, and highly profitable creative enterprises.
            </p>

            {/* DIAGRAM 4: THE 2026 VISUAL LANDSCAPE */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-indigo-500/40 my-8 shadow-[0_0_35px_rgba(99,102,241,0.2)]">
              {/* Top Banner */}
              <div className="py-4 px-6 rounded-xl bg-indigo-950 border-2 border-indigo-400 text-center mb-6 shadow-md">
                <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-white">
                  The 2026 Visual Landscape
                </h4>
                <p className="text-xs sm:text-sm font-sans text-indigo-200 italic mt-0.5">
                  Belongs to designers who create complex, emotionally resonant, and distinctly human visual work.
                </p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <div className="p-3.5 rounded-lg bg-indigo-900/60 border border-indigo-400 text-center text-xs font-mono">
                  <strong className="block text-white text-xs sm:text-sm mb-1 font-bold">Asset Modularization</strong>
                  <span className="text-indigo-200 text-[11px] block">20 heros &gt;&gt; 200+ assets</span>
                  <span className="text-indigo-300 text-[10px]">1-to-10 Expansion Formula</span>
                </div>
                <div className="p-3.5 rounded-lg bg-indigo-900/60 border border-indigo-400 text-center text-xs font-mono">
                  <strong className="block text-white text-xs sm:text-sm mb-1 font-bold">Industry Demand Matrix</strong>
                  <span className="text-indigo-200 text-[11px] block">Music / Apparel / Wellness</span>
                  <span className="text-indigo-300 text-[10px]">/ Home Decor / 4 sectors</span>
                </div>
                <div className="p-3.5 rounded-lg bg-indigo-900/60 border border-indigo-400 text-center text-xs font-mono">
                  <strong className="block text-white text-xs sm:text-sm mb-1 font-bold">Four-Legged Business Engine</strong>
                  <span className="text-indigo-200 text-[11px] block">7 streams / Passive,</span>
                  <span className="text-indigo-300 text-[10px]">Semi-Active, Active</span>
                </div>
                <div className="p-3.5 rounded-lg bg-indigo-900/60 border border-indigo-400 text-center text-xs font-mono">
                  <strong className="block text-white text-xs sm:text-sm mb-1 font-bold">4-Phase Roadmap</strong>
                  <span className="text-indigo-200 text-[11px] block">Months 1–12 / Create,</span>
                  <span className="text-indigo-300 text-[10px]">Launch, License, Scale</span>
                </div>
              </div>

              {/* Downward converging arrows */}
              <div className="flex justify-center my-2">
                <div className="w-0.5 h-6 bg-amber-400" />
              </div>

              {/* Large Gold Convergence Output Box */}
              <div className="py-5 px-6 rounded-xl bg-gradient-to-r from-amber-500/25 via-orange-500/30 to-amber-500/25 border-2 border-amber-400 text-center mb-4 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                <h5 className="font-serif-display font-bold text-xl sm:text-2xl text-amber-300 uppercase tracking-wide">
                  Scalable / Resilient / Highly Profitable
                </h5>
                <p className="text-xs sm:text-sm font-sans text-amber-100 font-medium mt-1">
                  Creative Enterprise for Visual Strategists & Commercial Artists Powered by Psychedelic Maximalism
                </p>
              </div>

              {/* Bottom Summary Pill */}
              <div className="py-3 px-4 rounded-lg bg-indigo-950/80 border border-indigo-500 text-center text-xs font-mono text-indigo-200">
                Pair a vivid visual language with a modular asset engine and a multi-stream business architecture.
              </div>

              <div className="mt-3 text-center text-[11px] font-mono text-zinc-500">
                Summary :: The Rise of Psychedelic Maximalism :: 2026
              </div>
            </div>

            {/* Call to action */}
            {onOpenInquiry && (
              <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 border border-[#d8ff43]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div>
                  <h4 className="text-xl font-serif-display font-bold text-zinc-100">
                    Ready to License or Commission Psychedelic Maximalism?
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    Connect directly with Kathleen Raft for custom surface scale, exclusive category rights, or festival merchandise collections.
                  </p>
                </div>
                <button
                  onClick={() => onOpenInquiry('From Trend Report: Licensing & Commission Inquiry')}
                  className="px-6 py-3.5 bg-[#d8ff43] text-[#070707] font-sans-grotesk font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-[#d8ff43] shadow-[4px_4px_0_#ff67bd] hover:shadow-[6px_6px_0_#ff67bd] cursor-pointer whitespace-nowrap shrink-0 transition-all"
                >
                  <span>Request Licensing Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
