import Link from "next/link";
import { FacebookIcon, InstagramIcon, WhatsappIcon, YoutubeIcon } from "./social-icons";

const campuses = [
  "SEA College of Engineering & Technology",
  "SEA College of Management Studies",
  "SEA College of Nursing",
  "SEA College of Law",
  "SEA Composite PU College",
  "SEA International School",
];

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/share/1C2GkDRqiD/", Icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/sea_group_of_institutions/", Icon: InstagramIcon },
  { label: "YouTube", href: "https://youtube.com/@seaedu2023", Icon: YoutubeIcon },
  { label: "WhatsApp", href: "https://whatsapp.com/channel/0029Vb7dfzV96H4aaswTsb2x", Icon: WhatsappIcon },
];

export function Footer() {
  return <footer className="footer-wrap">
    <div className="newsletter-bar">
      <div>
        <span className="eyebrow">STAY IN THE LOOP</span>
        <h3>Campus news, admission dates and results — straight from SEA.</h3>
      </div>
      <div className="follow-actions">
        <a className="follow-cta" href="https://whatsapp.com/channel/0029Vb7dfzV96H4aaswTsb2x" target="_blank" rel="noreferrer">
          <WhatsappIcon /> WhatsApp channel
        </a>
        <a className="follow-cta" href="https://www.instagram.com/sea_group_of_institutions/" target="_blank" rel="noreferrer">
          <InstagramIcon /> Instagram
        </a>
      </div>
    </div>
    <div className="footer">
      <div className="footer-brand">
        <span className="footer-kicker">SEA GROUP · BENGALURU</span>
        <img src="/images/logo.png" alt="SEA Group of Institutions" width={284} height={89} />
        <p>Meaningful learning, ambitious futures and one connected campus since 2000.</p>
        <div className="footer-social">
          {socials.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon /></a>
          ))}
        </div>
      </div>
      <div className="footer-col">
        <h4>Quick Links</h4>
        <Link href="/about/">About Us</Link>
        <Link href="/academics/">Programmes</Link>
        <Link href="/placements/">Placements</Link>
        <Link href="/admissions/">Admissions</Link>
        <Link href="/campus-life/">Campus Life</Link>
        <Link href="/gallery/">Gallery</Link>
      </div>
      <div className="footer-col">
        <h4>Our Campuses</h4>
        {campuses.map((name) => <span key={name}>{name}</span>)}
      </div>
      <div className="footer-col">
        <h4>Contact Us</h4>
        <a href="tel:+916366453030">+91 63664 53030</a>
        <a href="mailto:seaeduinfo@seaedu.ac.in">seaeduinfo@seaedu.ac.in</a>
        <span>Ekta Nagar, K R Puram,<br />Bengaluru — 560049</span>
      </div>
      <p className="footer-bottom"><span>© SEA Group of Institutions</span><span>Established 2000 · Bengaluru</span><span>Reimagined for the future.</span></p>
    </div>
  </footer>;
}
