import { LegalPageLayout } from "@/components/legal/legal-page-layout";

export const metadata = {
  title: 'Terms of Service - KodRish',
}

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="August 24, 2026">
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">1. Agreement to Terms</h2>
      <p>By accessing or using our website and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
      
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">2. Intellectual Property</h2>
      <p>The service and its original content, features, and functionality are and will remain the exclusive property of KodRish Innovation & Solutions and its licensors.</p>
      
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">3. User Responsibilities</h2>
      <p>You agree not to use the service for any purpose that is unlawful or prohibited by these terms. You may not use the service in any manner that could damage, disable, overburden, or impair our servers or networks.</p>
      
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">4. Limitation of Liability</h2>
      <p>In no event shall KodRish Innovation & Solutions, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>
      
      <h2 className="text-2xl font-display text-foreground mt-8 mb-4">5. Changes to Terms</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect.</p>
    </LegalPageLayout>
  );
}
