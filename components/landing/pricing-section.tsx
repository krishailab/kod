import { ArrowRight, Check } from "lucide-react";

const solutions = [
  {
    name: "AI Strategy",
    description: "A practical roadmap to identify high-value AI opportunities across your business.",
    features: ["AI readiness assessment", "Use-case prioritization", "Implementation roadmap"],
  },
  {
    name: "Custom AI Solutions",
    description: "Purpose-built AI products that solve real operational and customer-facing challenges.",
    features: ["Intelligent applications", "AI integrations", "Scalable architecture"],
    featured: true,
  },
  {
    name: "Business Automation",
    description: "Connected workflows that reduce repetitive work and help your teams move faster.",
    features: ["Process automation", "System integrations", "Performance optimization"],
  },
];

export function PricingSection() {
  return (
    <section id="solutions" className="relative border-t border-foreground/10 py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-20 max-w-3xl">
          <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Solutions for modern businesses
          </span>
          <h2 className="mb-6 font-display text-5xl tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Technology that moves
            <br />
            <span className="text-stroke">your business forward</span>
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">
            From the first idea to full-scale delivery, KodRish creates focused digital solutions around your goals, your teams, and your customers.
          </p>
        </div>

        <div className="grid gap-px bg-foreground/10 md:grid-cols-3">
          {solutions.map((solution, index) => (
            <div
              key={solution.name}
              className={`relative bg-background p-8 lg:p-12 ${
                solution.featured ? "border-2 border-foreground md:-my-4 md:py-16" : ""
              }`}
            >
              {solution.featured && (
                <span className="absolute -top-3 left-8 bg-foreground px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary-foreground">
                  Recommended
                </span>
              )}

              <div className="mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-3xl text-foreground">{solution.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{solution.description}</p>
              </div>

              <ul className="mb-10 space-y-4">
                {solution.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`group flex w-full items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${
                  solution.featured
                    ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                    : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                }`}
              >
                Discuss this solution
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Every engagement is scoped around your needs, with a clear plan, measurable outcomes, and ongoing support.
        </p>
      </div>
    </section>
  );
}
