import { LegalPageLayout } from "@/components/legal/legal-page-layout";

export const metadata = {
  title: 'Privacy Policy - KodRish',
}

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="August 24, 2026">
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">1. Introduction</h2>
      <p>This Privacy Policy describes how KodRish Innovation & Solutions ("we," "us," or "our") collects, uses, and discloses your information when you use our website and services.</p>
      
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">2. Information We Collect</h2>
      <p>We collect information you provide directly to us, such as when you fill out a contact form, apply for a job, or request our services. This may include your name, email address, phone number, and any other information you choose to provide.</p>
      
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">3. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul className="list-disc pl-6 space-y-2 mt-4">
        <li>Provide, maintain, and improve our services.</li>
        <li>Communicate with you, respond to your requests, and provide customer support.</li>
        <li>Send you technical notices, updates, and administrative messages.</li>
      </ul>
      
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">4. Data Security</h2>
      <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
      
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">5. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@kodrish.me" className="text-foreground underline hover:text-muted-foreground">privacy@kodrish.me</a>.</p>
    </LegalPageLayout>
  );
}
