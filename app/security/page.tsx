import { LegalPageLayout } from "@/components/legal/legal-page-layout";

export const metadata = {
  title: 'Security - KodRish',
}

export default function SecurityPage() {
  return (
    <LegalPageLayout title="Security at KodRish" lastUpdated="August 24, 2026">
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">Our Commitment to Security</h2>
      <p>At KodRish, security is not an afterthought; it is built into the core of our development processes and infrastructure. We take the protection of our clients' data and systems very seriously.</p>
      
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">Infrastructure Security</h2>
      <p>We utilize industry-leading cloud providers and employ robust architectural patterns to ensure high availability and data protection.</p>
      <ul className="list-disc pl-6 space-y-2 mt-4">
        <li><strong className="text-foreground">Encryption:</strong> All data is encrypted at rest and in transit using industry-standard protocols (TLS 1.3+).</li>
        <li><strong className="text-foreground">Access Control:</strong> We enforce strict role-based access control (RBAC) and require multi-factor authentication (MFA) for all internal systems.</li>
        <li><strong className="text-foreground">Monitoring:</strong> Continuous monitoring and automated threat detection systems are in place across our infrastructure.</li>
      </ul>
      
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">Development Practices</h2>
      <p>Our engineering teams follow secure coding practices to prevent vulnerabilities before they reach production.</p>
      <ul className="list-disc pl-6 space-y-2 mt-4">
        <li><strong className="text-foreground">Code Reviews:</strong> All code changes require approval from at least one senior engineer.</li>
        <li><strong className="text-foreground">Dependency Scanning:</strong> Automated tools continuously scan our dependencies for known vulnerabilities.</li>
        <li><strong className="text-foreground">Static Analysis:</strong> We run static application security testing (SAST) as part of our CI/CD pipelines.</li>
      </ul>
      
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">Compliance and Auditing</h2>
      <p>We regularly review our policies and procedures to ensure alignment with industry best practices and relevant compliance frameworks.</p>
      
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">Reporting Security Issues</h2>
      <p>If you believe you have found a security vulnerability in our systems, please report it to our security team immediately at <a href="mailto:security@kodrish.me" className="text-foreground underline hover:text-muted-foreground">security@kodrish.me</a>. We will respond promptly to investigate and address the issue.</p>
    </LegalPageLayout>
  );
}
