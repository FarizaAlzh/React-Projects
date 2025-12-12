import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-page app-container card">
      <section className="about-hero">
        <div>
          <h1>About Our Store</h1>
          <p>We believe shopping should be simple, trustworthy, and fun. Our catalog is updated regularly with the best picks.</p>
        </div>
      </section>

      <section style={{ marginTop: 12 }}>
        <h3>Our Mission</h3>
        <p>Deliver high quality goods with transparent pricing and friendly service.</p>
      </section>
    </div>
  );
};

export default AboutUs;
