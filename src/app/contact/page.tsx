import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Contact",
  description: "Address, phone numbers and email for SEA Group of Institutions, Ekta Nagar, K R Puram, Bengaluru 560049.",
};

export default function Contact() {
  return <>
    <section className="page-intro">
      <Reveal><span className="eyebrow">CONTACT / GET IN TOUCH</span><h1>Let's start<br /><em>the conversation.</em></h1></Reveal>
      <Reveal delay={0.1}><p>Welcome to SEA Educational Trust — we're happy to assist you.</p></Reveal>
    </section>
    <div className="contact-grid">
      <Reveal>
        <div className="contact-info">
          <div>
            <h3>Address</h3>
            <p>Ekta Nagar, Basavanapura, Virgonagar P.O,<br />K R Puram, Bangalore – 560049, India.</p>
          </div>
          <div>
            <h3>Phone</h3>
            <a href="tel:+916366453030">+91 63664 53030</a>
            <a href="tel:+917353945999">+91 73539 45999</a>
            <a href="tel:08029730618">080 29730618</a>
          </div>
          <div>
            <h3>Email</h3>
            <a href="mailto:seaeduinfo@seaedu.ac.in">seaeduinfo@seaedu.ac.in</a>
            <a href="mailto:seaclgeduinfo@seaedu.ac.in">seaclgeduinfo@seaedu.ac.in</a>
            <a href="mailto:directorplacements@seaedu.ac.in">directorplacements@seaedu.ac.in</a>
          </div>
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps?q=Ekta+Nagar,+Basavanapura,+Virgonagar,+K+R+Puram,+Bangalore+560049&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SEA Group of Institutions location"
            />
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div>
          <h3 style={{ fontFamily: "'Archivo Black'", fontSize: 20, marginBottom: 14 }}>Send us a quick message</h3>
          <ContactForm />
        </div>
      </Reveal>
    </div>
    <Footer />
  </>;
}
