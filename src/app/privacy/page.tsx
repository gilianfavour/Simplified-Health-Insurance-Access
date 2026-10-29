import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
export const metadata: Metadata = { title: 'Privacy notice' };
export default function PrivacyPage() {
  return (
    <section className="section"><div className="container">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy notice' }]} />
      <div className="prose" style={{ marginTop: 22 }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,4.4vw,2.4rem)', marginBottom: 10 }}>Privacy notice</h1>
        <p className="muted">What this prototype does with your information: nothing.</p>
        <h2>What we collect</h2>
        <p>Nothing is sent to a server. There is no account system, no analytics service and no advertising. The site works entirely in your browser.</p>
        <h2>What is stored on your device</h2>
        <ul>
          <li>Which plans you selected for comparison, so the selection survives a page refresh.</li>
          <li>Which enrolment checklist steps you have ticked.</li>
          <li>Your language preference.</li>
        </ul>
        <p>These are stored in your browser&apos;s local storage. They never leave your device and you can clear them at any time from your browser settings.</p>
        <h2>What we never ask for</h2>
        <ul>
          <li>Medical history, diagnoses, medication or test results.</li>
          <li>National identification numbers.</li>
          <li>Payment details or mobile money numbers.</li>
          <li>Passwords or an account of any kind.</li>
        </ul>
        <h2>The feedback form</h2>
        <p>The contact form validates your input in the browser and then tells you plainly that your message was not sent, because this prototype has no backend. It does not transmit anything.</p>
        <h2>Links to other sites</h2>
        <p>Plan records link to insurer websites. In this demonstration catalogue those links point to <code>example.com</code> and go nowhere real.</p>
      </div>
    </div></section>
  );
}
