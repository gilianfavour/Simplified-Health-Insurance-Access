import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = { title: 'Disclaimer' };

export default function DisclaimerPage() {
  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Disclaimer' }]} />
        <div className="prose" style={{ marginTop: 22 }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,4.4vw,2.4rem)', marginBottom: 10 }}>Disclaimer</h1>
          <p className="muted">What this platform is, and what it is not.</p>

          <h2>What this platform is</h2>
          <p>HealthCover Uganda is an information and comparison tool. It presents product information in a consistent format so a person can understand what a health insurance plan covers, what it excludes, and what to do next.</p>

          <h2>What this platform is not</h2>
          <ul>
            <li>It is not an insurance broker, agent or intermediary.</li>
            <li>It is not affiliated with, endorsed by or acting on behalf of any insurer.</li>
            <li>It does not issue, vary, renew or cancel insurance policies.</li>
            <li>It does not accept premium payments or process claims.</li>
            <li>It does not guarantee that any product is available, suitable or that you will qualify.</li>
            <li>It does not provide financial, legal or medical advice.</li>
          </ul>

          <h2>Accuracy of product information</h2>
          <p>All product records in this version of the catalogue are demonstration data — fictional insurers with illustrative premiums. They are labelled clearly throughout the interface. No real insurer is represented and no contact detail is in service.</p>
          <p>In a live deployment, every record would carry a source URL and a date the information was last verified. Missing information is shown as &ldquo;Not provided&rdquo; rather than estimated. Anything unclear is marked &ldquo;Check first&rdquo;.</p>

          <h2>Before you act on anything here</h2>
          <p>Confirm the premium, exclusion list and benefit schedule in writing directly with the insurer before making any payment or commitment.</p>

          <h2>Jurisdiction</h2>
          <p>This prototype was built for the Uganda Insurers Association Career Expo 2026 Live Employer Challenge. It does not claim compliance with any regulatory framework.</p>
        </div>
      </div>
    </section>
  );
}
