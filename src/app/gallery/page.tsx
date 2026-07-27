import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { LightboxGallery } from "@/components/lightbox-gallery";
import { Reveal } from "@/components/motion";

const images = [
  ["/images/gallery/seacet1.jpg", "Engineering in motion", "gallery-1"],
  ["/images/gallery/degree1.jpg", "The SEA community", "gallery-2"],
  ["/images/gallery/seacon1.jpg", "Learning beyond lectures", "gallery-3"],
  ["/images/gallery/sealaw1.jpg", "Ideas into action", "gallery-4"],
  ["/images/gallery/seapu1.jpg", "The early chapters", "gallery-5"],
  ["/images/gallery/seaiti1.jpg", "Hands-on learning", "gallery-6"],
  ["/images/gallery/seabed1.jpg", "Teaching tomorrow", "gallery-7"],
  ["/images/gallery/seacet2.jpg", "Campus in focus", "gallery-3"],
  ["/images/gallery/degree2.jpg", "Everyday moments", "gallery-4"],
  ["/images/gallery/seacon2.jpg", "Research at work", "gallery-5"],
  ["/images/gallery/sealaw2.jpg", "Arguments and answers", "gallery-6"],
  ["/images/gallery/seapu2.jpg", "The next chapter", "gallery-3"],
  ["/images/gallery/icse1.jpg", "Where it all begins", "gallery-4"],
  ["/images/gallery/seasb1.jpg", "Building foundations", "gallery-5"],
];

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs from the SEA campus, institutions and student community.",
};

export default function Gallery() {
  return <>
    <section className="page-intro gallery-intro">
      <Reveal><span className="eyebrow">SEA / IN THE MOMENT</span><h1>Proof that the<br /><em>energy is real.</em></h1></Reveal>
      <Reveal delay={0.1}><p>A selection from the SEA campus, institutions and student community. Tap any photo for a closer look.</p></Reveal>
    </section>
    <LightboxGallery images={images.map(([src, alt, className]) => ({ src, alt, className }))} />
    <Footer />
  </>;
}
