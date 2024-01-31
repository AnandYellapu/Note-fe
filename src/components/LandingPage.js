import React from 'react';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <h1 className="title">My Notes App</h1>
        <p className="subtitle">Your go-to application for organizing your thoughts.</p>
      </header>
      <main className="main">
        <section className="features">
          <div className="feature">
            <h2 className="feature-title">Easy to Use</h2>
            <p className="feature-description">Intuitive interface for effortless note-taking.</p>
          </div>
          <div className="feature">
            <h2 className="feature-title">Organize Efficiently</h2>
            <p className="feature-description">Sort and categorize your notes for quick access.</p>
          </div>
          <div className="feature">
            <h2 className="feature-title">Sync Across Devices</h2>
            <p className="feature-description">Access your notes anytime, anywhere.</p>
          </div>
        </section>
        <section className="cta">
          <h2 className="cta-title">Get Started</h2>
          <p className="cta-description">Join thousands of users who have transformed their note-taking experience.</p>
          <button className="cta-button">Sign Up Now</button>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">&copy; 2024 My Notes App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
