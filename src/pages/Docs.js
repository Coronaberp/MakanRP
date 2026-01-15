import React from 'react';
import './Docs.css';

export default function Docs() {
  return (
    <div className="docs-page">
      <div className="docs-header">
        <h1>Docs — How to use Makan@RP</h1>
        <p className="muted">A practical, layered guide to get started and power users' tips.</p>
      </div>

      <section className="docs-section">
        <h2>Getting Started</h2>
        <ol>
          <li>Open the app and allow location access to get nearby recommendations.</li>
          <li>Use the <strong>Get Started</strong> button on the homepage to run a quick suggestion.</li>
          <li>Filter by budget or dietary preferences using the filters panel (coming soon).</li>
        </ol>
      </section>

      <section className="docs-section">
        <h2>Using the Menu</h2>
        <p>
          The Menu page lists canteens and stalls. Click any stall to view available dishes, average wait time, and price range.
        </p>
      </section>

      <section className="docs-section">
        <h2>FAQ / Troubleshooting</h2>
        <details>
          <summary>Why are my recommendations not accurate?</summary>
          <p>Make sure location permission is granted and your preferred dietary filters are set. If issues persist, try reloading the app.</p>
        </details>
        <details>
          <summary>How do I report incorrect information?</summary>
          <p>Use the Chat link to report issues or suggest corrections; your feedback helps keep the data accurate.</p>
        </details>
      </section>

      <section className="docs-section docs-layered">
        <h2>Advanced / Wiki</h2>
        <div className="layer">
          <h3>Data Sources</h3>
          <p>We aggregate campus stall menus, student feedback, and live canteen crowd data when available.</p>
        </div>
        <div className="layer">
          <h3>Recommendation logic</h3>
          <p>Recommendations use proximity, price heuristics, and simple preference matching. Future versions will include learning from user choices.</p>
        </div>
        <div className="layer">
          <h3>Contributing</h3>
          <p>If you are a student or staff with dataset access, contact the team to contribute verified menu data.</p>
        </div>
      </section>

    </div>
  );
}
