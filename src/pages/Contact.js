import React from 'react';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1>Contact Us</h1>
        <p className="muted">We'd love to hear from you — feedback, dataset contributions, or bug reports.</p>

        <div className="contact-grid">
          <div>
            <h3>Team</h3>
            <p>Makan@RP — School of Infocomm, Republic Polytechnic</p>
            <p>Email: support@snackii.example</p>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <label>Name</label>
            <input type="text" placeholder="Your name" />
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
            <label>Message</label>
            <textarea placeholder="How can we help?" rows={5} />
            <div className="form-actions">
              <button className="btn primary" type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
