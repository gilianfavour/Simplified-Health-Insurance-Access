import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
        <div className="prose" style={{ marginTop: 22 }}>
          <span className="eyebrow">About</span>
          <h1 style={{ fontSize: 'clamp(1.8rem,4.4vw,2.5rem)', marginBottom: 12 }}>About HealthCover Uganda</h1>
          <p className="muted" style={{ fontSize: '1.02rem' }}>A public-interest prototype built for the Uganda Insurers Association Career Expo 2026 Live Employer Challenge.</p>
          <h2>Why it exists</h2>
          <p>Most people in Uganda meet health insurance at the worst possible moment — at a hospital counter, with a bill in hand. Product information is scattered across brochures and sales conversations, exclusions are buried in policy documents, and prices are rarely published at all.</p>
          <p>HealthCover Uganda puts the same facts in the same shape for every plan, so a person can see what a plan pays for, what it refuses, what the ceiling is, and what to do next — without an account, a sales call or a medical questionnaire.</p>
          <h2>How product information should be verified</h2>
          <ul>
            <li>Every record states where it came from and when it was last checked.</li>
            <li>If a figure is not supplied, it is shown as &ldquo;Not provided&rdquo; rather than estimated.</li>
            <li>Anything conditional or unclear is marked &ldquo;Check first&rdquo;, with the exact question to ask.</li>
            <li>Before paying a premium, confirm the premium, the exclusion list and the benefit schedule in writing with the insurer.</li>
          </ul>
          <div className="card">
            <strong>Demonstration data</strong>
            <p style={{ marginTop: 6 }}>This version ships with a fictional catalogue: five insurers that do not exist, with illustrative premiums and placeholder contacts. Every record is labelled. The data structure is designed so real, verified products can replace the samples without changing the interface.</p>
          </div>
          <h2>What this platform does not do</h2>
          <ul>
            <li>It does not issue, vary or cancel a policy.</li>
            <li>It does not decide or promise eligibility.</li>
            <li>It does not complete an enrolment or accept a payment.</li>
            <li>It does not collect medical histories, national ID numbers or payment details.</li>
            <li>It is not affiliated with, endorsed by or acting for any insurer.</li>
          </ul>
          <h2>Accessibility</h2>
          <p>The interface uses semantic HTML, visible focus states, labels on every control and text labels alongside colour for all status indicators. Comparison works on a 360px screen.</p>
          <h2>Languages</h2>
          <p>The interface is available in English, Luganda, Runyankole and Rutooro. Product records remain in English because insurance terms are used in English in practice.</p>
        </div>
      </div>
    </section>
  );
}
