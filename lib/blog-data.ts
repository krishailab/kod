export const posts = [
  {
    slug: "the-future-of-intelligent-automation-in-2026",
    title: "The Future of Intelligent Automation in 2026",
    excerpt: "How companies are leveraging AI to automate complex workflows and what it means for the future of work.",
    date: "Aug 24, 2026",
    category: "AI & Machine Learning",
    readTime: "5 min read",
    content: `
      <p>The landscape of enterprise software is shifting dramatically. For years, "automation" meant writing brittle scripts or connecting a few APIs through a visual builder. Today, intelligent automation is about creating systems that understand context, learn from exceptions, and adapt to changing workflows without human intervention.</p>
      
      <h3>The Evolution of Automation</h3>
      <p>Traditional RPA (Robotic Process Automation) was great for highly structured, repetitive tasks. But business processes are rarely perfectly structured. That's where AI comes in.</p>
      <p>By integrating Large Language Models (LLMs) and computer vision into automation pipelines, companies can now process unstructured data—like emails, PDFs, and customer support tickets—at unprecedented scale.</p>
      
      <h3>What this means for your team</h3>
      <p>The goal isn't to replace humans, but to elevate them. When your team isn't bogged down by data entry or routing requests, they can focus on strategy, customer relationships, and creative problem-solving.</p>
      <p>At KodRish, we're building the infrastructure to make this transition seamless for businesses of all sizes.</p>
    `
  },
  {
    slug: "building-resilient-infrastructure-with-nextjs",
    title: "Building Resilient Infrastructure with Next.js",
    excerpt: "A deep dive into our architecture choices and why we believe server components are changing the game.",
    date: "Aug 12, 2026",
    category: "Engineering",
    readTime: "8 min read",
    content: `
      <p>When we started building the new KodRish platform, we had a choice to make regarding our frontend architecture. We needed something fast, SEO-friendly, and capable of handling complex state without shipping megabytes of JavaScript to the client.</p>
      
      <h3>Enter React Server Components</h3>
      <p>The App Router in Next.js fundamentally changed how we think about rendering. By moving data fetching and heavy rendering logic to the server, we drastically reduced our Time to Interactive (TTI) and First Contentful Paint (FCP).</p>
      
      <h3>Our Stack</h3>
      <p>We pair Next.js with a robust set of tools:</p>
      <ul>
        <li>TailwindCSS for styling</li>
        <li>TypeScript for end-to-end type safety</li>
        <li>Framer Motion for complex animations</li>
      </ul>
      <p>This combination allows us to move incredibly fast without sacrificing the end-user experience.</p>
    `
  },
  {
    slug: "designing-for-trust-ui-patterns-for-security",
    title: "Designing for Trust: UI Patterns for Security",
    excerpt: "Exploring the psychological impact of design choices on user perception of security and reliability.",
    date: "Jul 30, 2026",
    category: "Design",
    readTime: "4 min read",
    content: `
      <p>Security isn't just about backend encryption and firewalls; it's also about how users perceive the system. If an app is secure but looks sketchy, users won't trust it. If it looks secure but isn't, you have a much bigger problem.</p>
      
      <h3>Visual Indicators of Security</h3>
      <p>We rely on established visual patterns to communicate safety:</p>
      <ul>
        <li><strong>Color psychology:</strong> Thoughtful use of greens and blues, avoiding alarming reds unless absolutely necessary.</li>
        <li><strong>Microcopy:</strong> Clear, jargon-free explanations of why we need certain permissions or data.</li>
        <li><strong>Feedback loops:</strong> Instant visual confirmation when an action (like a password change) is successful.</li>
      </ul>
      
      <p>Good design is transparent design. By being clear about what's happening under the hood, we build lasting trust with our users.</p>
    `
  },
  {
    slug: "why-we-open-sourced-our-core-components",
    title: "Why We Open Sourced Our Core Components",
    excerpt: "Our journey from a proprietary toolkit to building an open ecosystem for developers.",
    date: "Jul 15, 2026",
    category: "Company",
    readTime: "6 min read",
    content: `
      <p>For the first two years of KodRish, our UI component library was our secret weapon. It allowed us to build custom solutions for clients at record speed. But as the library matured, we realized its true value wasn't in keeping it secret.</p>
      
      <h3>The power of community</h3>
      <p>By open-sourcing our core components, we achieved three things:</p>
      <ol>
        <li>We forced ourselves to write better, more documented code.</li>
        <li>We attracted incredible talent who saw our work and wanted to contribute.</li>
        <li>We helped the broader ecosystem build better products.</li>
      </ol>
      
      <p>A rising tide lifts all boats. We're excited to see what the community builds with our tools.</p>
    `
  }
];
