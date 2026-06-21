// Case-study content recreated from the original mattpearson.net case studies
// (casestudy-project-gemini, casestudy-plants-vs-zombies, case-study-vhs).
// Text mirrors the source; layout is expressed as themed content blocks that the
// CaseStudyBody component renders to match the rest of the site.
//
// Images reference the already-downloaded assets in /public/work-images/<proj>.

export type CSBlock =
  | { kind: "section"; id: string; eyebrow?: string; title: string }
  | { kind: "subhead"; title: string }
  | { kind: "label"; text: string }
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "quotes"; items: string[] }
  | { kind: "quote"; text: string; cite?: string }
  | { kind: "callouts"; cols?: number; items: { label: string; text: string }[] }
  | {
      kind: "finding";
      n: string;
      title?: string;
      text?: string;
      list?: string[];
      quote?: string;
      cite?: string;
    }
  | { kind: "figure"; src: string; caption?: string; wide?: boolean }
  | { kind: "figures"; cols?: number; items: { src: string; caption?: string }[] };

export type CaseStudy = {
  slug: string;
  title: string;
  lead: string;
  color: string;
  banner: string;
  meta: { client: string; role: string; timeline: string };
  blocks: CSBlock[];
};

const G = "/work-images/gemini/";
const P = "/work-images/pvz/";
const V = "/work-images/vhs/";

export const caseStudies: Record<string, CaseStudy> = {
  // ─── Project Gemini ──────────────────────────────────────────────────────
  "project-gemini": {
    slug: "project-gemini",
    title: "Project Gemini",
    lead: "A UX case study exploring how Outriders 2 can resolve the original game's core usability breakdowns, making interaction more intuitive, feedback more meaningful, and systems more seamless for players.",
    color: "#7c5cff",
    banner: `${G}Cover-2048x1156.png`,
    meta: { client: "People Can Fly", role: "UI/UX", timeline: "2021 – 2025" },
    blocks: [
      {
        kind: "p",
        text: "To design an improved sequel, it’s imperative to analyze the issues that impacted the original game:",
      },

      {
        kind: "section",
        id: "inventory",
        eyebrow: "Problem 01",
        title: "Overcomplicated Inventory & Mod System",
      },
      { kind: "label", text: "Issue" },
      {
        kind: "p",
        text: "The inventory UI was visually cluttered, lacking clear hierarchy and item categorization. Modding and gear comparison were unintuitive, often requiring too many clicks and lacking contextual info.",
      },
      { kind: "label", text: "Player feedback" },
      {
        kind: "quotes",
        items: [
          "Make the Inventory easier to find things",
          "Too much clicking just to compare stats",
          "No idea what mods actually do",
        ],
      },
      {
        kind: "figure",
        wide: true,
        src: `${G}FtyFYo4gRhPOM8ETZctufkGZjM-1.webp`,
        caption: "Outriders original inventory screen",
      },
      {
        kind: "figure",
        wide: true,
        src: `${G}utwRCQfDVfrdeyOheo4LjA1Ylo-scaled.webp`,
        caption: "Expanded Gemini inventory screen",
      },
      {
        kind: "figures",
        items: [
          { src: `${G}h61FO5xHIlwNSHrUpVRIcS1r7Y.webp`, caption: "One-click stats page" },
          { src: `${G}r6bfuQYgk1g0lNDRTvAIQuLNU.webp`, caption: "Contextual tooltip system" },
          { src: `${G}U5gxTFcoZW957OzUn27RbcuYfek.webp`, caption: "Side-by-side comparison" },
          { src: `${G}fB4jiT2gyboQZKKPTYDleyLqwp0-1.webp`, caption: "Colour-coded key words" },
          {
            src: `${G}ZDiOTmvO9R6hiJD3vRbv2Ays.webp`,
            caption: "Drag & drop interaction with live preview tooltips",
          },
        ],
      },
      { kind: "subhead", title: "Direction" },
      {
        kind: "p",
        text: "In Outriders 2, the inventory system was completely overhauled to address the cluttered, click-heavy experience of the original game. We introduced a multi-screen layout that cleanly separates categories like weapons, armor, and mods, significantly improving readability and reducing cognitive overload.",
      },
      {
        kind: "p",
        text: "Gear stats are now presented side-by-side for quick comparison, with clear visual hierarchy and color-coded indicators to highlight upgrades or downgrades. A whole contextual tooltip system was added to explain complex stats and mod effects without forcing players to leave the screen. A new drag-and-drop interaction model allows for intuitive mod swapping, supported by live previews. These changes make managing gear faster, more transparent, and far less error-prone.",
      },

      {
        kind: "section",
        id: "consistency",
        eyebrow: "Problem 02",
        title: "Lack of Visual Consistency",
      },
      { kind: "label", text: "Issue" },
      {
        kind: "p",
        text: "UI screens varied dramatically in layout and visual style — from loadouts to crafting — creating cognitive dissonance and interrupting the player’s mental model.",
      },
      { kind: "label", text: "Player feedback" },
      { kind: "quotes", items: ["Every screen feels like it was made by a different team."] },
      {
        kind: "figure",
        wide: true,
        src: `${G}PwgbC1r6EHwlZgI82Fy3O8Fymw.avif`,
        caption: "A single Figma page showing the component library that keeps every screen consistent",
      },
      { kind: "subhead", title: "Direction" },
      {
        kind: "p",
        text: "To fix the lack of visual and functional consistency across the original Outriders UI, I established a unified design language built on an atomic design system in Figma.",
      },
      {
        kind: "p",
        text: "This system allowed us to create and maintain a shared library of components — buttons, layouts, icons, type styles — that could scale seamlessly across all menus, from inventory and crafting to matchmaking and map navigation. By standardizing interaction patterns and visual elements, we eliminated the disjointed feel of separate screens that previously looked and behaved like they came from different builds. The design system also streamlined collaboration between UX, UI, and engineering teams, ensuring that every new screen or feature adhered to a consistent structure, visual hierarchy, and interaction logic. The result is a far more cohesive, intuitive interface that feels deliberate and polished across the entire experience.",
      },

      {
        kind: "section",
        id: "accessibility",
        eyebrow: "Problem 03",
        title: "Poor Accessibility and Clarity",
      },
      { kind: "label", text: "Issue" },
      {
        kind: "p",
        text: "Small fonts, weak contrast, inconsistent button prompts, and minimal customization left many players frustrated, especially those with visual impairments or on larger displays.",
      },
      { kind: "label", text: "Player feedback" },
      {
        kind: "quotes",
        items: [
          "Text is unreadable on my TV",
          "No font scaling or UI resizing",
          "The HUD is hard to read",
          "There’s no customization",
        ],
      },
      {
        kind: "figures",
        items: [
          { src: `${G}XT0zD8wEoZ0yMlWPsMyA1G2dAc-1920x1083.jpg`, caption: "HUD customisation menu" },
          { src: `${G}hEkn9PjWEoQj6oSbheiWZxKqeYk.webp`, caption: "HUD customisation presets" },
          { src: `${G}iGzBWxT17ytto11XguZIx0dw20-1920x1083.jpg`, caption: "HUD customisation flow" },
          { src: `${G}z4HvjjvMneAaeJ5IahOQKehWIQQ.webp`, caption: "Accessibility menu" },
          { src: `${G}3M6vgf4Y8YbZTRfgR2LWFJKc7hE.webp`, caption: "Different enemy health-bar versions" },
        ],
      },
      { kind: "subhead", title: "Direction" },
      {
        kind: "p",
        text: "To address the lack of accessibility and visual clarity in the original Outriders, we implemented a fully customizable HUD and a range of player-focused accessibility settings in the sequel. Players can now scale UI elements, adjust font sizes, and choose from multiple colorblind-friendly palettes in an easy-to-find and easy-to-use accessibility menu.",
      },
      {
        kind: "p",
        text: "Key gameplay indicators, such as health, cooldowns, and objective markers, were redesigned with higher contrast, simplified shapes, and clearer motion to improve legibility during combat. The HUD itself is modular — players can toggle elements on or off, reposition key UI blocks, and save presets for different playstyles. These improvements not only make the game more inclusive but also give players greater control over how they experience and interact with the interface.",
      },

      { kind: "section", id: "overview", title: "Overview" },
      {
        kind: "p",
        text: "The original Outriders set out with strong intentions but was held back by foundational UX and UI shortcomings that affected usability, clarity, and consistency. In the sequel, we’re rethinking the player experience from the ground up — introducing a cohesive design system, more intuitive interfaces, and deeper customization to ensure clarity and control at every touchpoint. While development is still ongoing, our direction is clear: build a seamless, accessible, and modern user experience that evolves with player needs. The work so far sets a solid foundation, but as with any live product, the final outcome will be shaped by iteration, feedback, and the realities of shipping at scale.",
      },
    ],
  },

  // ─── Plants vs. Zombies ──────────────────────────────────────────────────
  "plants-vs-zombies": {
    slug: "plants-vs-zombies",
    title: "Plants vs. Zombies",
    lead: "A UX case study tracing how progression in Plants vs Zombies: Battle for Neighborville evolved from loot boxes to Prize Maps, and what that shift meant for player rewards and engagement.",
    color: "#2bb673",
    banner: `${P}Map-scaled.png`,
    meta: { client: "Electronic Arts", role: "Associate UX Director", timeline: "2012 – 2016" },
    blocks: [
      { kind: "section", id: "overview", eyebrow: "Context", title: "Overview" },
      {
        kind: "p",
        text: "As Lead of the UX team on Plants vs Zombies: Battle for Neighbourville, one of our major challenges was redesigning the progression and rewards system. The previous title, Garden Warfare 2, used a loot box-based economy that had become increasingly misaligned with player expectations for transparency and fairness. With rising global criticism toward randomized rewards, we had a clear UX goal: replace the opaque loot box system with a transparent, player-friendly progression system that maintained excitement, improved clarity, and empowered user choice.",
      },

      { kind: "section", id: "problems", eyebrow: "The problem", title: "Problems" },
      {
        kind: "p",
        text: "We identified these issues through a mix of qualitative and quantitative research. Community forums, internal telemetry and support tickets revealed consistent player frustration in specific areas. Together these insights made it clear which issues in Garden Warfare 2 would need addressing.",
      },
      {
        kind: "callouts",
        items: [
          { label: "Progression was opaque", text: "Players could not predict what they would receive." },
          { label: "Player agency was low", text: "Rewards were randomized, causing frustration." },
          {
            label: "Perception of pay-to-win",
            text: "Monetization tied to loot boxes undermined the game’s family-friendly appeal.",
          },
          {
            label: "Poor reward pacing",
            text: "Players either hit droughts or spikes, making the experience inconsistent.",
          },
        ],
      },
      {
        kind: "figures",
        items: [
          { src: `${P}scn6iqrCWgZzgzgrHpe9jdIn8k.webp` },
          { src: `${P}caRLiyUQmtor08H4vlkiIgAxI-1536x760.jpg` },
        ],
      },

      { kind: "section", id: "goals", eyebrow: "Goals", title: "UX Goals" },
      { kind: "p", text: "We aimed to design a new system that:" },
      {
        kind: "list",
        items: [
          "Provided clarity and transparency in progression.",
          "Increased player agency and reward anticipation.",
          "Supported seasonal content and encouraged long-term engagement.",
          "Removed monetization friction while keeping rewards exciting.",
        ],
      },

      {
        kind: "section",
        id: "methods",
        eyebrow: "Process",
        title: "UX Methods That Shaped the Solution",
      },
      {
        kind: "p",
        text: "To ensure the Prize Map system was grounded in user-centered design, we applied a range of UX research and design methods throughout development:",
      },
      { kind: "subhead", title: "Competitive Analysis" },
      { kind: "label", text: "Goal" },
      {
        kind: "p",
        text: "Understand how other live-service games (like Fortnite, Apex Legends, and Overwatch) handled progression and seasonal content.",
      },
      { kind: "label", text: "Outcome" },
      {
        kind: "p",
        text: "Identified that successful games were moving toward transparency, limited-time events, and visual progression systems — all core inspirations for our approach.",
      },
      { kind: "subhead", title: "Usability Testing" },
      { kind: "label", text: "Goal" },
      { kind: "p", text: "Playtest-Cloud, internal QA sessions, Think-Aloud protocols." },
      { kind: "label", text: "Focus areas" },
      {
        kind: "list",
        items: [
          "Can users understand how to progress?",
          "Do they feel they have meaningful choices?",
          "Is the visual layout too overwhelming or unclear?",
        ],
      },
      { kind: "label", text: "Outcome" },
      {
        kind: "p",
        text: "Led to simplification of node layouts, improved labeling, and onboarding for new users.",
      },
      { kind: "subhead", title: "Sentiment Analysis" },
      { kind: "label", text: "Tools" },
      {
        kind: "p",
        text: "Manual parsing of Reddit threads, Discord comments, and support tickets from Garden Warfare 2.",
      },
      { kind: "label", text: "Focus areas" },
      {
        kind: "p",
        text: "Identifying emotional triggers and recurring complaints around randomness, fairness, and grind.",
      },
      { kind: "label", text: "Outcome" },
      { kind: "p", text: "Validated our direction and reinforced the need for visible, predictable rewards." },
      { kind: "figure", wide: true, src: `${P}M6fBVAoidyuXwNMJYeK0a0IaLY-1.png` },
      {
        kind: "figures",
        items: [
          { src: `${P}1f5YniNzZqnsY6fDipunkusOLg.webp`, caption: "Competitive analysis — Fame Pass" },
          { src: `${P}mfwbkZ47jMMzd4bjfekjtDXN0wM.webp`, caption: "Competitive analysis — Dota 2 Compendium" },
          { src: `${P}Shj02Jo8h2op7DLid7dZtrLfusw-1.webp`, caption: "Competitive analysis — COD Warzone Battle Pass" },
          { src: `${P}u9T1WQ0iKcS9GRK06bodkbLzYgw.webp`, caption: "Competitive analysis — Tour Rewards" },
        ],
      },

      {
        kind: "section",
        id: "solution",
        eyebrow: "The solution",
        title: "The Prize Map System",
      },
      {
        kind: "p",
        text: "We introduced Prize Maps — seasonal progression boards where players could see their path to rewards and choose which nodes to unlock using in-game currency earned through gameplay. This system combined visual clarity, strategic choice, and long-term engagement.",
      },
      {
        kind: "callouts",
        items: [
          { label: "Full visual clarity", text: "Players could preview every available reward and the path to reach them." },
          { label: "Branching choices", text: "Players chose their route through the map, giving them control over their rewards." },
          { label: "Seasonal themes", text: "Monthly maps introduced new cosmetics and characters, adding novelty and structure." },
          { label: "Visible progress & milestones", text: "Each step showed clear progression feedback, encouraging retention." },
        ],
      },
      {
        kind: "figures",
        items: [
          { src: `${P}vOZetcxK0Frugf0wWWddfbmnQU-2048x1152.webp`, caption: "Festival Pass UI concept 001" },
          { src: `${P}rZaTAgXhSlaROg2wHjcbslyRU.webp`, caption: "Festival Pass UI concept 002" },
          { src: `${P}rN17CRIwkei1vSdaoOI0nrSueU.webp`, caption: "Festival Pass UI concept 003" },
          { src: `${P}Rijl13JRUAv34EAh3K0pu6g.webp`, caption: "Festival Pass UI concept 004" },
        ],
      },
      {
        kind: "figures",
        items: [{ src: `${P}Map-scaled.png` }, { src: `${P}CKSykVapvGv4nCGcRjYJzP7PsX0.webp` }],
      },

      { kind: "section", id: "outcomes", eyebrow: "Impact", title: "Outcomes" },
      {
        kind: "callouts",
        cols: 1,
        items: [
          {
            label: "Increased satisfaction",
            text: "The redesigned system gave players more control and a clearer sense of progress, which led to a noticeable improvement in sentiment. Many players felt more motivated to engage consistently, with fewer complaints about randomness or unfairness compared to previous titles.",
          },
          {
            label: "Positive press",
            text: "Players praised the transparency and fairness of the system in reviews and community feedback.",
          },
          {
            label: "No pay-to-win backlash",
            text: "With no randomized monetization tied to performance, we maintained trust with players and parents alike.",
          },
        ],
      },

      { kind: "section", id: "reflection", eyebrow: "Reflection", title: "Reflection" },
      {
        kind: "p",
        text: "The shift from loot boxes to Prize Maps was more than a feature redesign — it was a shift in corporate philosophy. We moved from exploiting randomness to respecting player choice. It taught us the value of transparency and how reward systems can either build or break trust.",
      },
      {
        kind: "p",
        text: "By centering UX principles in this redesign, we built a progression system that felt fun, fair, and forward-looking.",
      },
    ],
  },

  // ─── Video Horror Society ────────────────────────────────────────────────
  vhs: {
    slug: "vhs",
    title: "Video Horror Society",
    lead: "A UX case study examining how Video Horror Society introduces new players, where the onboarding breaks down, and what can be done to improve early-game clarity and engagement.",
    color: "#ff7eb6",
    banner: `${V}Clean_MainImage_VHS-1.png`,
    meta: { client: "Hellbent", role: "UI / UX", timeline: "2016 – 2021" },
    blocks: [
      { kind: "section", id: "introduction", title: "Introduction" },
      {
        kind: "p",
        text: "Video Horror Society (VHS) is a 4v1 asymmetrical multiplayer game. One player takes the role of a monster, while four others play as teens trying to defeat it. The gameplay mixes horror themes with arcade-style combat.",
      },
      {
        kind: "p",
        text: "The game includes an optional training mode for both the teen and monster roles. Each training session lasts about 12–17 minutes and walks the player through core mechanics using scripted prompts. The teen training teaches movement, crafting weapons, reviving teammates, and banishing the monster. The monster training covers tracking, using powers, and downing players. While functional, the training is isolated from the main game and offers no connection to real matches or progression. After completing it, players are returned to the main lobby with no clear guidance on what to do next.",
      },
      {
        kind: "figures",
        items: [{ src: `${V}download-1.jpg` }, { src: `${V}b70c5720f474dce74ecf3cc893f5c2b2ecfb_1920xt1080_S1000.jpg` }],
      },

      { kind: "section", id: "agenda", title: "The Plan" },
      { kind: "subhead", title: "Plan" },
      {
        kind: "list",
        items: [
          "Define the problem: early player drop-off and mechanic confusion",
          "Set scope: focus on first-time user experience and onboarding flow",
          "Choose research methods and timeline",
        ],
      },
      { kind: "subhead", title: "Research" },
      {
        kind: "list",
        items: [
          "Observe new player behavior in-game",
          "Review existing training and UI structure",
          "Gather community feedback and compare with similar titles",
        ],
      },
      { kind: "subhead", title: "Analysis" },
      {
        kind: "list",
        items: [
          "Evaluate onboarding using usability heuristics",
          "Identify friction points and missed teaching opportunities",
          "Synthesize findings into actionable insights",
        ],
      },
      { kind: "subhead", title: "Design" },
      {
        kind: "list",
        items: [
          "Streamline training flow and clarify core mechanic teaching",
          "Propose first-time user path with guided bot match",
          "Simplify early menus and UI elements to reduce cognitive load",
        ],
      },
      { kind: "figure", wide: true, src: `${V}brave_qZmwvwt7H7.jpeg` },

      { kind: "section", id: "problem", title: "The Problem" },
      {
        kind: "p",
        text: "Many new players in Video Horror Society were showing signs of confusion early on — missing objectives, ignoring core mechanics like crafting or reviving, and often quitting after just a few matches. These weren’t design flaws in the systems themselves, but signs that the game wasn’t teaching them well. This study was done to understand where the onboarding process was falling short and why key mechanics were going unused.",
      },

      {
        kind: "section",
        id: "why-onboarding",
        title: "Why Onboarding Matters",
      },
      {
        kind: "p",
        text: "Onboarding is not a tutorial. It’s a system or set of systems that helps new users understand how a product operates. In video games, good onboarding helps new players understand how to play without overwhelming them. It teaches mechanics, goals, and systems in a clear, gradual way. Most importantly, it builds confidence. A well-onboarded player should feel capable, not confused. Poor onboarding fails to support new players. It either gives too little information or too much, too fast. It creates confusion, not clarity.",
      },
      { kind: "p", text: "In asymmetrical games like VHS, onboarding is especially important because:" },
      {
        kind: "list",
        items: [
          "Players must understand two very different roles (teen vs. monster).",
          "There are multiple overlapping systems, as well as several systems unique to each role.",
          "The game has no single-player campaign to ease players in or to act as a training ground.",
        ],
      },
      {
        kind: "figure",
        wide: true,
        src: `${V}Game-Win64-Shipping_rRVgnobh6E.png`,
        caption: "Initial view of the game — with every feature and system available at once, it becomes very overwhelming to new players",
      },

      { kind: "section", id: "research", title: "Research" },
      {
        kind: "p",
        text: "To evaluate the onboarding experience in Video Horror Society, I used a mix of low-cost user research methods. Using more than one method gave us a broader and more reliable picture. It helped catch blind spots and reduces the chance of drawing false conclusions based on any one type of data.",
      },
      { kind: "p", text: "The full method included:" },
      {
        kind: "list",
        items: [
          "First Time User Walkthrough",
          "Heuristic Evaluation",
          "Post-Session Interviews",
          "Comparative Analysis",
          "Secondary Source Review",
        ],
      },
      { kind: "subhead", title: "I. First-Time User Walkthrough" },
      {
        kind: "p",
        text: "We played through the game with a clean account to replicate a true first-time user experience. We recorded and documented each screen, prompt, and interaction from launch through to the completion of the first full multiplayer match.",
      },
      { kind: "label", text: "Why" },
      {
        kind: "p",
        text: "This reveals the actual player journey without assumptions. It helps spot friction points and missed teaching opportunities.",
      },
      { kind: "figure", wide: true, src: `${V}FTUE-scaled.png`, caption: "First-time user journey" },
      { kind: "subhead", title: "II. Heuristic Evaluation" },
      {
        kind: "p",
        text: "We reviewed the game’s onboarding using an agreed-upon, custom list of game design heuristics which included:",
      },
      {
        kind: "list",
        items: [
          "Clear goal setting",
          "Progressive disclosure",
          "Feedback and error prevention",
          "Appropriate challenge for new users",
          "Minimized cognitive load",
        ],
      },
      { kind: "label", text: "Why" },
      {
        kind: "p",
        text: "This provides a structured way to identify usability problems that often go unnoticed. It helps anchor observations in proven design principles with clear solutions.",
      },
      {
        kind: "figures",
        items: [
          { src: `${V}Artboard1.png`, caption: "Heuristic evaluation wireframe sheet used with dummy data" },
          { src: `${V}Artboard2-scaled.png`, caption: "Heuristic evaluation results wireframe sheet used with dummy data" },
        ],
      },
      { kind: "subhead", title: "III. Post-Session Interviews" },
      { kind: "p", text: "After their first session, players were asked a short set of open-ended questions like:" },
      {
        kind: "list",
        items: ["What confused you?", "What made sense right away?", "What would you have liked more help with?"],
      },
      { kind: "label", text: "Why" },
      {
        kind: "p",
        text: "Participant reflection can reveal problems players didn’t verbalize during play. It also highlights emotional and subjective reactions that aren’t always visible during gameplay that, with further questioning, can lead to insights.",
      },
      { kind: "subhead", title: "IV. Comparative Analysis" },
      {
        kind: "p",
        text: "We analyzed onboarding flows from similar games — such as Dead by Daylight and Friday the 13th — to understand different approaches to introducing complex multiplayer systems.",
      },
      { kind: "label", text: "Why" },
      {
        kind: "p",
        text: "Comparative studies help spot gaps, strengths, and missed opportunities by viewing the design in context. It can also offer a quality bar to idealistically aim for or surpass.",
      },
      { kind: "subhead", title: "V. Secondary Source Review" },
      {
        kind: "p",
        text: "I reviewed online forums, Steam reviews, and Reddit threads focused on new players. I looked for recurring complaints or praise about onboarding and early-game confusion.",
      },
      { kind: "label", text: "Why" },
      {
        kind: "p",
        text: "Community feedback can surface trends that we might not catch in small samples, especially when it comes to long-term retention and user sentiment, and with the vast data available it becomes a good source for more generalised onboarding and initial ideas.",
      },
      { kind: "subhead", title: "Why use multiple methods" },
      {
        kind: "p",
        text: "No single method gives a complete answer. By combining direct observation, structured evaluation, player feedback, and comparative context, we build a more accurate, well-rounded understanding of the onboarding experience.",
      },
      {
        kind: "list",
        items: [
          "Catch different types of problems (e.g. usability vs. emotional friction)",
          "Balance subjective and objective insights",
          "Reduce the risk of researcher bias",
          "Increase confidence in the findings",
        ],
      },
      {
        kind: "p",
        text: "This approach ensures we’re not solving the wrong problem — and gives better guidance for improving the player experience.",
      },

      { kind: "section", id: "analysis", title: "Analysis" },
      {
        kind: "p",
        text: "After conducting the five user research methods, clear patterns began to emerge. Across all data sources — first-time playthroughs, expert evaluations, and player interviews — the same core issues were observed:",
      },
      { kind: "figure", wide: true, src: `${V}thumb-1920-1257938.jpeg` },
      {
        kind: "finding",
        n: "01",
        text: "The lack of onboarding structure caused confusion within the first few minutes of gameplay. New players often missed the optional training mode, and those who found it weren’t always sure what to do afterward. Without clear next steps, many wandered the hub menus or jumped into matches they weren’t ready for.",
        quote: "I did the training, but then I wasn’t sure what I was supposed to do next.",
        cite: "Interview participant",
      },
      {
        kind: "finding",
        n: "02",
        text: "Players consistently ignored or misused key mechanics like weapon crafting, map awareness, or team coordination. In both interviews and first-match recordings, we saw players:",
        list: ["Running from objectives", "Missing revive opportunities", "Standing idle during monster phases"],
      },
      {
        kind: "p",
        text: "This echoed what we saw in secondary sources — players didn’t understand how to play as a team or why certain systems mattered. It was also noted that the later the topics were covered in the training exercise, the more people ignored the topic; this pointed to players skipping the training early and missing topics entirely, something we cross-checked with other associated data.",
      },
      {
        kind: "finding",
        n: "03",
        text: "Heuristic evaluation confirmed what players said in interviews: the game surfaces too much information too early. With multiple currencies, progression trees, cosmetics, and loadouts visible from the beginning, the menus added to the mental load.",
        quote: "I didn’t touch any of the perk stuff. I just went into a match.",
        cite: "Interview participant",
      },
      {
        kind: "finding",
        n: "04",
        text: "There was no transitional space between training and competitive play. Players were left to decide what to do next — often before they were ready. Compared to similar games, VHS lacks an intermediate step like a guided bot match or tiered objective system.",
      },
      { kind: "figure", wide: true, src: `${V}E_hOEH8VcAID4K2.jpeg` },

      { kind: "section", id: "design", title: "Design" },
      {
        kind: "p",
        text: "Guided by the patterns above, we designed three major interventions to rebuild the early-game experience around clarity and confidence:",
      },
      {
        kind: "finding",
        n: "01",
        title: "Simplifying Initial Menus",
        text: "We proposed hiding advanced menus — such as Rentals, Loadouts, Journey, Movies, and the Store — until after a few matches. These features are valuable later on but introduce unnecessary complexity early in the experience. By delaying their appearance, we reduced cognitive load and helped players focus on learning the basics — movement, crafting, and teamwork — without distraction. We also added simple, contextual tooltips to explain unfamiliar terms directly in the interface. To match the player’s growing familiarity, systems like Loadouts and Perk Customization would unlock gradually, based on progress or match count. These changes created a more focused onboarding experience and allowed players to build confidence before engaging with deeper systems.",
      },
      {
        kind: "finding",
        n: "02",
        title: "Enhancing the Training Experience",
        text: "We also proposed revamping the training mode to make it shorter and more focused. The original version included long pauses, scripted delays, and moments where players waited for instructions to catch up with their actions. We streamlined the sequence by removing unnecessary steps and narrowing the focus to the essentials — movement, crafting, combat, and reviving. Alongside this, we updated the UI to better highlight objectives, added clearer visual markers to guide players through each task, and revised the voiceover to be more concise and direct. These changes made the training feel more responsive and purposeful, reducing player frustration and helping them grasp the core systems quickly. By tightening the experience and improving the clarity of communication, we ensured players spent less time waiting and more time learning through action — building a stronger foundation before moving on to their first real match.",
      },
      {
        kind: "finding",
        n: "03",
        title: "Guided First-Time Flow",
        text: "To address visibility, freedom, and recognition, we designed a more supportive first-time experience that holds the player’s hand for longer. On first launch, players are required to complete the training mode, followed by a guided transition into a bot match. While the training mode introduces mechanics in isolation — such as movement, crafting, and abilities — the bot match places those same mechanics into the flow of a full game. Players face AI opponents and teammates, allowing them to practice what they’ve learned in a realistic but low-pressure environment. This bridge between tutorial and live matches helps reinforce learning through repetition and gives players the chance to experiment without the risk of letting down real teammates.",
      },
      {
        kind: "figures",
        cols: 5,
        items: [
          { src: `${V}Evil3.png` },
          { src: `${V}Character3.png` },
          { src: `${V}Evil2.png` },
          { src: `${V}Character2.png` },
          { src: `${V}Evil1.png` },
        ],
      },

      { kind: "section", id: "conclusion", title: "Conclusion" },
      {
        kind: "p",
        text: "This study’s purpose was to uncover why many new players struggled in Video Horror Society — often ignoring key systems, becoming frustrated, and quitting early. By using a mix of methods — first-time walkthroughs, heuristic evaluation, interviews, comparative analysis, and community review — we captured a clear picture of where onboarding breaks down and how it can improve.",
      },
      {
        kind: "p",
        text: "We found that the training mode was overly long, disconnected from real gameplay, and supported by inconsistent UI and vague feedback. Players left it still uncertain about what to do next. Menus overloaded first-time users and offered no stage-by-stage guidance. In live matches, lack of direction and lack of reinforcement caused players to overlook mechanics like reviving or crafting entirely.",
      },
      {
        kind: "p",
        text: "Guided by Nielsen Norman’s usability heuristics, we designed and tested three major interventions: a focused onboarding flow that transitioned players from training into a bot match, trimmed and more direct training content, and contextual UI updates including clean visual cues and tighter voiceover. These changes worked together to build confidence and reduce early friction.",
      },
      { kind: "label", text: "Limitations" },
      {
        kind: "list",
        items: [
          "Small sample size: our initial usability sessions involved only a handful of participants, which may not capture the full diversity of player backgrounds.",
          "Prototype scope: we tested early-stage mockups rather than full system integration — certain interface behaviors and edge cases weren’t covered.",
          "Short-term metrics: we observed player reactions and immediate behavior, but gaps remain in understanding long-term retention impact.",
        ],
      },
      { kind: "label", text: "Benefits and observed outcomes" },
      {
        kind: "list",
        items: [
          "Lowered cognitive load: simplified menus and focused training allowed new players to absorb and use core mechanics more quickly.",
          "Clearer mental models: contextual tooltips, consistent labeling, and visual guidance helped players make sense of the interface and game systems.",
          "Faster onboarding pace: streamlined training and a structured bot match gave players early success and momentum.",
          "Improved confidence: players felt more prepared and less lost when entering actual multiplayer matches.",
        ],
      },
      {
        kind: "p",
        text: "In summary, small, focused improvements to onboarding — grounded in proven usability principles and tested with real players — can convert confusion into clarity. They help VHS deliver on its unique asymmetrical design by ensuring new players understand and engage with its systems, setting them up for longer-term enjoyment and retention.",
      },
    ],
  },
};

export const caseStudySlugs = Object.keys(caseStudies);
