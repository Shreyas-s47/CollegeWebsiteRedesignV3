/**
 * SEA College Website - Direct Content Scraper
 * Fetches each page directly via HTTPS and extracts the actual body content,
 * skipping navigation and footer.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join('d:\\College website\\content');
const ASSETS_DIR = path.join('d:\\College website\\assets');

const PAGES = [
  // HOME
  { url: 'https://seaedu.ac.in/', slug: 'home', section: 'home', title: 'Home' },
  // ABOUT
  { url: 'https://seaedu.ac.in/page/overview', slug: 'overview', section: 'about', title: 'Overview' },
  { url: 'https://seaedu.ac.in/page/founder', slug: 'founder', section: 'about', title: "Founder's Message" },
  { url: 'https://seaedu.ac.in/page/chairmans-message', slug: 'chairmans-message', section: 'about', title: "Chairman's Desk" },
  { url: 'https://seaedu.ac.in/page/board-of-trustees', slug: 'board-of-trustees', section: 'about', title: 'Board of Trustees' },
  { url: 'https://seaedu.ac.in/page/director-message', slug: 'director-message', section: 'about', title: "Director's Message" },
  { url: 'https://seaedu.ac.in/page/principals', slug: 'principals', section: 'about', title: 'Principals' },
  // ACADEMICS
  { url: 'https://seaedu.ac.in/page/value-added-programs', slug: 'value-added-programs', section: 'academics', title: 'Value Added Programs' },
  { url: 'https://seaedu.ac.in/page/research-center', slug: 'research-center', section: 'academics', title: 'Research Center' },
  { url: 'https://seaedu.ac.in/page/pre-university', slug: 'pre-university', section: 'academics', title: 'Pre-University' },
  { url: 'https://seaedu.ac.in/page/mttm', slug: 'mttm', section: 'academics', title: 'MTTM' },
  { url: 'https://seaedu.ac.in/page/bsc-clinical-nutrition', slug: 'bsc-clinical-nutrition', section: 'academics', title: 'B.Sc Clinical Nutrition' },
  { url: 'https://seaedu.ac.in/page/hospital-administration', slug: 'hospital-administration', section: 'academics', title: 'Hospital Administration' },
  // INSTITUTIONS
  { url: 'https://seaedu.ac.in/page/sea-college-of-engineering-technology', slug: 'sea-college-of-engineering-technology', section: 'institutions', title: 'SEA College of Engineering & Technology' },
  { url: 'https://seaedu.ac.in/page/sea-college-of-management-studies', slug: 'sea-college-of-management-studies', section: 'institutions', title: 'SEA College of Management Studies' },
  { url: 'https://seaedu.ac.in/page/sea-college-of-research-development-center', slug: 'sea-college-of-research-development-center', section: 'institutions', title: 'SEA College of Research & Development Center' },
  { url: 'https://seaedu.ac.in/page/sea-college-of-nursing', slug: 'sea-college-of-nursing', section: 'institutions', title: 'SEA College of Nursing' },
  { url: 'https://seaedu.ac.in/page/sea-college-of-law', slug: 'sea-college-of-law', section: 'institutions', title: 'SEA College of Law' },
  { url: 'https://seaedu.ac.in/page/sea-college-of-science-commerce-arts', slug: 'sea-college-of-science-commerce-arts', section: 'institutions', title: 'SEA College of Science, Commerce & Arts' },
  { url: 'https://seaedu.ac.in/page/sea-composite-pu-college', slug: 'sea-composite-pu-college', section: 'institutions', title: 'SEA Composite PU College' },
  { url: 'https://seaedu.ac.in/page/sea-evening-college', slug: 'sea-evening-college', section: 'institutions', title: 'SEA Evening College' },
  { url: 'https://seaedu.ac.in/page/sea-bed-college', slug: 'sea-bed-college', section: 'institutions', title: 'SEA B.Ed College' },
  { url: 'https://seaedu.ac.in/page/sea-international-school', slug: 'sea-international-school', section: 'institutions', title: 'SEA International School' },
  { url: 'https://seaedu.ac.in/page/sea-primary-higher-secondary-school', slug: 'sea-primary-higher-secondary-school', section: 'institutions', title: 'SEA Primary & Higher Secondary School' },
  { url: 'https://seaedu.ac.in/page/sea-industrial-training-institute', slug: 'sea-industrial-training-institute', section: 'institutions', title: 'SEA Industrial Training Institute' },
  // ADMISSIONS
  { url: 'https://seaedu.ac.in/page/apply-online', slug: 'apply-online', section: 'admissions', title: 'Apply Online' },
  { url: 'https://seaedu.ac.in/page/admission', slug: 'admission', section: 'admissions', title: 'Admission' },
  { url: 'https://seaedu.ac.in/page/admission-procedure', slug: 'admission-procedure', section: 'admissions', title: 'Admission Procedure' },
  { url: 'https://seaedu.ac.in/page/foreign-national', slug: 'foreign-national', section: 'admissions', title: 'Foreign National' },
  { url: 'https://seaedu.ac.in/page/financial-aid', slug: 'financial-aid', section: 'admissions', title: 'Financial Aid' },
  { url: 'https://seaedu.ac.in/page/nri-admission', slug: 'nri-admission', section: 'admissions', title: 'NRI Admission' },
  // CAMPUS
  { url: 'https://seaedu.ac.in/page/campus-infrastructure', slug: 'campus-infrastructure', section: 'campus', title: 'Campus Infrastructure' },
  { url: 'https://seaedu.ac.in/page/digital-infrastructure', slug: 'digital-infrastructure', section: 'campus', title: 'Digital Infrastructure' },
  { url: 'https://seaedu.ac.in/page/accommodation-hostel-facilities', slug: 'accommodation-hostel-facilities', section: 'campus', title: 'Accommodation & Hostel Facilities' },
  { url: 'https://seaedu.ac.in/page/sports', slug: 'sports', section: 'campus', title: 'Sports' },
  // PLACEMENTS
  { url: 'https://seaedu.ac.in/page/placement-overview', slug: 'placement-overview', section: 'placements', title: 'Placement Overview' },
  { url: 'https://seaedu.ac.in/page/career-advancement-cell', slug: 'career-advancement-cell', section: 'placements', title: 'Career Advancement Cell' },
  { url: 'https://seaedu.ac.in/page/recruiters', slug: 'recruiters', section: 'placements', title: 'Recruiters' },
  // GALLERY
  { url: 'https://seaedu.ac.in/page/photo-gallery', slug: 'photo-gallery', section: 'gallery', title: 'Photo Gallery' },
  { url: 'https://seaedu.ac.in/page/video-gallery', slug: 'video-gallery', section: 'gallery', title: 'Video Gallery' },
  // OTHER
  { url: 'https://seaedu.ac.in/page/contact-us', slug: 'contact-us', section: 'other', title: 'Contact Us' },
  { url: 'https://seaedu.ac.in/page/accreditations', slug: 'accreditations', section: 'other', title: 'Accreditations' },
  { url: 'https://seaedu.ac.in/page/brochures', slug: 'brochures', section: 'other', title: 'Brochures' },
];

// ---- Fetch a URL and return full HTML ----
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPage(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// ---- Extract content between navigation end and footer start ----
function extractBodyContent(html) {
  // The SEA site structure: after the sidebar nav closes (</div> for #mySidebar)
  // and after the navbar, the actual page content appears.
  // The content area typically has classes like: .cms-page, .page-content, .inner-page-content,
  // or is within the main <section> after the header.

  // Strategy: Find the content between the LAST closing of navbar-collapse and the footer
  
  let contentStart = 0;
  let contentEnd = html.length;
  
  // Try multiple content area selectors
  const startMarkers = [
    // CMS content div
    /class="[^"]*cms-page[^"]*"/i,
    /class="[^"]*inner-page[^"]*"/i,
    /class="[^"]*page-content[^"]*"/i,
    /class="[^"]*content-section[^"]*"/i,
    // Section after navigation
    /class="[^"]*about-section[^"]*"/i,
    /class="[^"]*section-padding[^"]*"/i,
    // The page banner / breadcrumb area (indicates start of content)
    /class="[^"]*page-banner[^"]*"/i,
    /class="[^"]*banner-section[^"]*"/i,
    /class="[^"]*breadcrumb[^"]*"/i,
    // The most reliable: end of the navbar
    /id="navbar-collapse-3"/i,
  ];

  for (const marker of startMarkers) {
    const match = html.match(marker);
    if (match) {
      contentStart = match.index;
      break;
    }
  }

  // If we found navbar-collapse, skip past its closing
  if (contentStart > 0) {
    // Move past the found marker
    const afterMarker = html.indexOf('>', contentStart);
    if (afterMarker > -1) {
      // For navbar, we need to find where it ends
      const navbarEnd = html.indexOf('</header>', afterMarker);
      if (navbarEnd > -1) {
        contentStart = navbarEnd + '</header>'.length;
      }
    }
  }
  
  // Find footer
  const footerMarkers = [
    /<footer/i,
    /class="[^"]*footer-section[^"]*"/i,
    /class="[^"]*footersection[^"]*"/i,
    /class="[^"]*footer-area[^"]*"/i,
    /class="[^"]*foot-sec[^"]*"/i,
  ];
  
  for (const marker of footerMarkers) {
    const match = html.substring(contentStart).match(marker);
    if (match) {
      contentEnd = contentStart + match.index;
      break;
    }
  }
  
  return html.substring(contentStart, contentEnd);
}

// ---- Extract images with full URLs ----
function extractImages(html) {
  const images = [];
  const seen = new Set();
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    let src = match[1];
    if (src.startsWith('data:')) continue;
    
    // Make absolute
    if (src.startsWith('..')) src = src.replace(/^\.\.\//, '/');
    if (src.startsWith('/')) src = 'https://seaedu.ac.in' + src;
    if (!src.startsWith('http')) src = 'https://seaedu.ac.in/' + src;
    // Fix double slashes
    src = src.replace(/([^:])\/\//g, '$1/');
    
    const altMatch = match[0].match(/alt=["']([^"']*?)["']/i);
    const alt = altMatch ? altMatch[1] : '';
    
    if (!seen.has(src)) {
      seen.add(src);
      images.push({ src, alt });
    }
  }
  return images;
}

// ---- Convert HTML to clean markdown text ----
function htmlToMarkdown(html) {
  let text = html;
  
  // Remove scripts, styles, comments
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<!--[\s\S]*?-->/g, '');
  
  // Handle specific elements
  text = text.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n');
  text = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n');
  text = text.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n');
  text = text.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n');
  text = text.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '\n##### $1\n');
  text = text.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '\n###### $1\n');
  
  // Bold & Italic
  text = text.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  text = text.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  text = text.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  
  // Links - preserve them
  text = text.replace(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (m, href, txt) => {
    const cleanTxt = txt.replace(/<[^>]+>/g, '').trim();
    if (!cleanTxt || href.startsWith('#') || href.startsWith('javascript')) return cleanTxt;
    // Make absolute
    let absHref = href;
    if (href.startsWith('..')) absHref = href.replace(/^\.\.\//, '/');
    if (absHref.startsWith('/')) absHref = 'https://seaedu.ac.in' + absHref;
    return `[${cleanTxt}](${absHref})`;
  });
  
  // Lists
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');
  text = text.replace(/<ul[^>]*>|<\/ul>/gi, '\n');
  text = text.replace(/<ol[^>]*>|<\/ol>/gi, '\n');
  
  // Table handling
  text = text.replace(/<th[^>]*>([\s\S]*?)<\/th>/gi, '| $1 ');
  text = text.replace(/<td[^>]*>([\s\S]*?)<\/td>/gi, '| $1 ');
  text = text.replace(/<tr[^>]*>/gi, '');
  text = text.replace(/<\/tr>/gi, '|\n');
  text = text.replace(/<table[^>]*>|<\/table>|<thead[^>]*>|<\/thead>|<tbody[^>]*>|<\/tbody>/gi, '\n');
  
  // Paragraphs and line breaks
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<\/div>/gi, '\n');
  
  // Remove remaining HTML tags
  text = text.replace(/<[^>]+>/g, '');
  
  // Decode entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&rsquo;/g, "'");
  text = text.replace(/&lsquo;/g, "'");
  text = text.replace(/&rdquo;/g, '"');
  text = text.replace(/&ldquo;/g, '"');
  text = text.replace(/&ndash;/g, '–');
  text = text.replace(/&mdash;/g, '—');
  text = text.replace(/&hellip;/g, '…');
  text = text.replace(/&#\d+;/g, '');
  
  // Clean up whitespace
  text = text.replace(/[ \t]+/g, ' ');
  text = text.split('\n').map(l => l.trim()).join('\n');
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.trim();
  
  return text;
}

// ---- Process a single page ----
async function processPage(page) {
  try {
    const html = await fetchPage(page.url);
    
    // Save raw HTML for reference
    const rawDir = path.join('d:\\College website\\raw-html');
    fs.mkdirSync(rawDir, { recursive: true });
    fs.writeFileSync(path.join(rawDir, `${page.slug}.html`), html, 'utf-8');
    
    // Extract body content (between nav and footer)
    const bodyHtml = extractBodyContent(html);
    
    // Extract images from body
    const images = extractImages(bodyHtml);
    
    // Also get images from full page that are in content areas
    const allPageImages = extractImages(html);
    
    // Convert to markdown
    const content = htmlToMarkdown(bodyHtml);
    
    // Build output markdown
    let md = `---
title: "${page.title}"
slug: "${page.slug}"
section: "${page.section}"
source_url: "${page.url}"
extracted_at: "${new Date().toISOString()}"
---

# ${page.title}

${content}
`;

    if (images.length > 0) {
      md += '\n\n---\n\n## Page Images\n\n';
      images.forEach((img, i) => {
        md += `${i + 1}. ${img.alt ? `**${img.alt}**: ` : ''}${img.src}\n`;
      });
    }

    // Write content file
    const outputPath = path.join(OUTPUT_DIR, page.section, `${page.slug}.md`);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, md, 'utf-8');
    
    return {
      ...page,
      contentLength: content.length,
      imageCount: images.length,
      allImageCount: allPageImages.length,
      images: allPageImages,
    };
  } catch (err) {
    console.error(`  ❌ ERROR: ${err.message}`);
    return { ...page, contentLength: 0, imageCount: 0, error: err.message };
  }
}

// ---- Sequential processing with delay ----
async function main() {
  console.log('🚀 SEA College Website - Direct Content Scraper');
  console.log('================================================\n');
  
  const allImages = [];
  const siteMap = {
    name: 'SEA Group of Institutions',
    domain: 'seaedu.ac.in',
    phone: '+91-6366453030 / 7353945999',
    email: 'seaeduinfo@seaedu.ac.in',
    social: {
      facebook: 'https://www.facebook.com/share/1C2GkDRqiD/',
      instagram: 'https://www.instagram.com/sea_group_of_institutions/',
      youtube: 'https://youtube.com/@seaedu2023',
      whatsapp: 'https://whatsapp.com/channel/0029Vb7dfzV96H4aaswTsb2x',
    },
    extractedAt: new Date().toISOString(),
    navigation: {
      'About Us': [
        { title: 'Overview', route: '/about/overview' },
        { title: "Founder's Message", route: '/about/founder' },
        { title: "Chairman's Desk", route: '/about/chairmans-message' },
        { title: 'Board of Trustees', route: '/about/board-of-trustees' },
        { title: "Director's Message", route: '/about/director-message' },
        { title: 'Principals', route: '/about/principals' },
      ],
      'Academics': [
        { title: 'UG Courses', children: [
          { title: 'BE', external: 'https://seacet.edu.in/' },
          { title: 'Degree', external: 'https://seadegree.ac.in/' },
          { title: 'Law', external: 'https://sealawcollege.edu.in/' },
          { title: 'Nursing', external: 'https://seanursing.edu.in/' },
        ]},
        { title: 'PG Courses', children: [
          { title: 'M.Tech', external: 'https://seacet.edu.in/' },
          { title: 'MBA (VTU)', external: 'https://seacet.edu.in/' },
          { title: 'MBA (BU)', external: 'https://seadegree.ac.in/' },
          { title: 'M.Com', external: 'https://seacet.edu.in/' },
          { title: 'M.Sc Nursing', external: 'https://seanursing.edu.in/' },
          { title: 'Master of Arts', external: 'https://seadegree.ac.in/' },
          { title: 'M.Sc (CS)', external: 'https://seadegree.ac.in/' },
        ]},
        { title: 'Value Added Programs', route: '/academics/value-added-programs' },
        { title: 'Research Center', route: '/academics/research-center' },
        { title: 'Pre-University', route: '/academics/pre-university' },
        { title: 'MTTM', route: '/academics/mttm' },
        { title: 'B.Sc Clinical Nutrition', route: '/academics/bsc-clinical-nutrition' },
        { title: 'Hospital Administration', route: '/academics/hospital-administration' },
      ],
      'Institutions': [
        { title: 'SEA College of Engineering & Technology', route: '/institutions/sea-college-of-engineering-technology' },
        { title: 'SEA College of Management Studies', route: '/institutions/sea-college-of-management-studies' },
        { title: 'SEA College of Research & Development Center', route: '/institutions/sea-college-of-research-development-center' },
        { title: 'SEA College of Nursing', route: '/institutions/sea-college-of-nursing' },
        { title: 'SEA College of Law', route: '/institutions/sea-college-of-law' },
        { title: 'SEA College of Science, Commerce & Arts', route: '/institutions/sea-college-of-science-commerce-arts' },
        { title: 'SEA Composite PU College', route: '/institutions/sea-composite-pu-college' },
        { title: 'SEA Evening College', route: '/institutions/sea-evening-college' },
        { title: 'SEA B.Ed College', route: '/institutions/sea-bed-college' },
        { title: 'SEA International School', route: '/institutions/sea-international-school' },
        { title: 'SEA Primary & Higher Secondary School', route: '/institutions/sea-primary-higher-secondary-school' },
        { title: 'SEA Industrial Training Institute', route: '/institutions/sea-industrial-training-institute' },
      ],
      'Admissions': [
        { title: 'Apply Online', route: '/admissions/apply-online' },
        { title: 'Admission', route: '/admissions/admission' },
        { title: 'Admission Procedure', route: '/admissions/admission-procedure' },
        { title: 'Foreign National', route: '/admissions/foreign-national' },
        { title: 'Financial Aid', route: '/admissions/financial-aid' },
        { title: 'NRI Admission', route: '/admissions/nri-admission' },
      ],
      'Our Campus': [
        { title: 'Campus Infrastructure', route: '/campus/campus-infrastructure' },
        { title: 'Digital Infrastructure', route: '/campus/digital-infrastructure' },
        { title: 'Accommodation & Hostel Facilities', route: '/campus/accommodation-hostel-facilities' },
        { title: 'Sports', route: '/campus/sports' },
      ],
      'Placements': [
        { title: 'Placement Overview', route: '/placements/placement-overview' },
        { title: 'Career Advancement Cell', route: '/placements/career-advancement-cell' },
        { title: 'Recruiters', route: '/placements/recruiters' },
      ],
      'Gallery': [
        { title: 'Photo Gallery', route: '/gallery/photo-gallery' },
        { title: 'Video Gallery', route: '/gallery/video-gallery' },
      ],
    },
    pages: [],
  };
  
  let success = 0;
  let fail = 0;
  
  for (let i = 0; i < PAGES.length; i++) {
    const page = PAGES[i];
    process.stdout.write(`[${i + 1}/${PAGES.length}] ${page.title}... `);
    
    const result = await processPage(page);
    
    if (result.error) {
      fail++;
    } else {
      success++;
      console.log(`✅ ${result.contentLength} chars, ${result.imageCount} body imgs, ${result.allImageCount} total imgs`);
      
      // Collect images
      if (result.images) {
        result.images.forEach(img => {
          allImages.push({ ...img, page: page.title, section: page.section });
        });
      }
      
      // Add to sitemap
      siteMap.pages.push({
        title: page.title,
        slug: page.slug,
        section: page.section,
        route: page.section === 'home' ? '/' : `/${page.section}/${page.slug}`,
        sourceUrl: page.url,
        contentFile: `content/${page.section}/${page.slug}.md`,
        contentLength: result.contentLength,
        imageCount: result.imageCount,
      });
    }
    
    // Small delay to be polite to the server
    if (i < PAGES.length - 1) {
      await new Promise(r => setTimeout(r, 300));
    }
  }
  
  // Deduplicate images
  const uniqueImages = [];
  const seenSrcs = new Set();
  for (const img of allImages) {
    if (!seenSrcs.has(img.src)) {
      seenSrcs.add(img.src);
      uniqueImages.push(img);
    }
  }
  
  // Write images catalog
  fs.writeFileSync(
    path.join(ASSETS_DIR, 'images.json'),
    JSON.stringify(uniqueImages, null, 2),
    'utf-8'
  );
  
  // Write sitemap
  fs.writeFileSync(
    path.join('d:\\College website', 'site-map.json'),
    JSON.stringify(siteMap, null, 2),
    'utf-8'
  );
  
  console.log(`\n================================================`);
  console.log(`✅ Processed: ${success} pages`);
  console.log(`❌ Failed: ${fail} pages`);
  console.log(`📸 Unique images: ${uniqueImages.length}`);
  console.log(`📄 Site map: d:\\College website\\site-map.json`);
  console.log(`🖼  Images: d:\\College website\\assets\\images.json`);
  console.log(`📁 Content: d:\\College website\\content\\`);
  console.log(`📦 Raw HTML: d:\\College website\\raw-html\\`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
