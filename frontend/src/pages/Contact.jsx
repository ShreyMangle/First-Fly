import { useState } from "react";

const contactInfo = [
  { icon: "📧", label: "Email",    value: "hello@firstfly.in" },
  { icon: "📍", label: "Location", value: "Maharashtra, India" },
  { icon: "⏰", label: "Hours",    value: "Mon–Sat, 10am–6pm IST" },
];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // "sending" | "success" | "error"

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: wire to a real form submission endpoint (e.g. Formspree, backend route)
    setTimeout(() => setStatus("success"), 1000);
  };

  return (
    <div id="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero__glow" />
        <div className="container text-center">
          <div className="badge badge-primary">Contact</div>
          <h1 className="mt-lg">Get in touch</h1>
          <p className="contact-hero__sub mt-lg">
            Have a question or feedback? We read every message and reply within 24 hours.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="contact-body">
        <div className="container contact-layout">
          {/* Info */}
          <div className="contact-info">
            <h2>We'd love to hear from you</h2>
            <p className="mt-md">
              Whether you have questions about how the tool works, want to report
              a data issue, or have partnership ideas — reach out!
            </p>

            <div className="contact-info-list mt-xl">
              {contactInfo.map(({ icon, label, value }) => (
                <div key={label} className="contact-info-item glass-card">
                  <span className="contact-info-icon">{icon}</span>
                  <div>
                    <div className="contact-info-label">{label}</div>
                    <div className="contact-info-value">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="glass-card contact-form-card">
            {status === "success" ? (
              <div className="contact-success">
                <div className="contact-success-icon">✓</div>
                <h3>Message sent!</h3>
                <p>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit}>
                <h3 className="contact-form-title">Send a message</h3>

                <div className="form-group mt-lg">
                  <label className="form-label" htmlFor="contact-name">Your Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Rahul Sharma"
                    className="form-input"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="rahul@example.com"
                    className="form-input"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Your question or feedback..."
                    className="form-input"
                    value={form.message}
                    onChange={handleChange}
                    required
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .contact-hero {
          position: relative;
          padding: 8rem 0 4rem;
          overflow: hidden;
        }
        .contact-hero__glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(249,115,22,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .contact-hero__sub { max-width: 480px; margin: 0 auto; font-size: 1.075rem; }
        .contact-body { padding: var(--space-3xl) 0 var(--space-4xl); }
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: var(--space-3xl);
          align-items: start;
        }
        .contact-info-list { display: flex; flex-direction: column; gap: var(--space-md); }
        .contact-info-item {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-lg);
        }
        .contact-info-icon { font-size: 1.5rem; }
        .contact-info-label { font-size: 0.8rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px; }
        .contact-info-value { font-size: 0.9375rem; font-weight: 500; }
        .contact-form-card { padding: var(--space-2xl); }
        .contact-form-title { font-size: 1.25rem; font-weight: 700; }
        .contact-success {
          text-align: center;
          padding: var(--space-3xl) var(--space-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
        }
        .contact-success-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--color-safe-lo);
          color: var(--color-safe);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
        }
        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default Contact;