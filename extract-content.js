/**
 * SEA College Website Content Extractor
 * Processes raw HTML files and extracts clean text content, image URLs, and metadata.
 * Outputs structured markdown files ready for Claude Code to rebuild.
 */

const fs = require('fs');
const path = require('path');

// ---- Configuration: Map of step files to output content files ----
const PAGE_MAP = [
  // HOME
  { step: 58, slug: 'home', section: 'home', title: 'Home', url: 'https://seaedu.ac.in/' },

  // ABOUT US
  { step: 59, slug: 'overview', section: 'about', title: 'Overview', url: 'https://seaedu.ac.in/page/overview' },
  { step: 60, slug: 'founder', section: 'about', title: "Founder's Message", url: 'https://seaedu.ac.in/page/founder' },
  { step: 61, slug: 'chairmans-message', section: 'about', title: "Chairman's Desk", url: 'https://seaedu.ac.in/page/chairmans-message' },
  { step: 62, slug: 'board-of-trustees', section: 'about', title: 'Board of Trustees', url: 'https://seaedu.ac.in/page/board-of-trustees' },
  { step: 63, slug: 'director-message', section: 'about', title: "Director's Message", url: 'https://seaedu.ac.in/page/director-message' },
  { step: 64, slug: 'principals', section: 'about', title: 'Principals', url: 'https://seaedu.ac.in/page/principals' },

  // ACADEMICS
  { step: 66, slug: 'value-added-programs', section: 'academics', title: 'Value Added Programs', url: 'https://seaedu.ac.in/page/value-added-programs' },
  { step: 67, slug: 'research-center', section: 'academics', title: 'Research Center', url: 'https://seaedu.ac.in/page/research-center' },
  { step: 68, slug: 'pre-university', section: 'academics', title: 'Pre-University', url: 'https://seaedu.ac.in/page/pre-university' },
  { step: 69, slug: 'mttm', section: 'academics', title: 'MTTM', url: 'https://seaedu.ac.in/page/mttm' },
  { step: 70, slug: 'bsc-clinical-nutrition', section: 'academics', title: 'B.Sc Clinical Nutrition', url: 'https://seaedu.ac.in/page/bsc-clinical-nutrition' },
  { step: 71, slug: 'hospital-administration', section: 'academics', title: 'Hospital Administration', url: 'https://seaedu.ac.in/page/hospital-administration' },

  // INSTITUTIONS
  { step: 73, slug: 'sea-college-of-engineering-technology', section: 'institutions', title: 'SEA College of Engineering & Technology', url: 'https://seaedu.ac.in/page/sea-college-of-engineering-technology' },
  { step: 74, slug: 'sea-college-of-management-studies', section: 'institutions', title: 'SEA College of Management Studies', url: 'https://seaedu.ac.in/page/sea-college-of-management-studies' },
  { step: 75, slug: 'sea-college-of-research-development-center', section: 'institutions', title: 'SEA College of Research & Development Center', url: 'https://seaedu.ac.in/page/sea-college-of-research-development-center' },
  { step: 76, slug: 'sea-college-of-nursing', section: 'institutions', title: 'SEA College of Nursing', url: 'https://seaedu.ac.in/page/sea-college-of-nursing' },
  { step: 77, slug: 'sea-college-of-law', section: 'institutions', title: 'SEA College of Law', url: 'https://seaedu.ac.in/page/sea-college-of-law' },
  { step: 78, slug: 'sea-college-of-science-commerce-arts', section: 'institutions', title: 'SEA College of Science, Commerce & Arts', url: 'https://seaedu.ac.in/page/sea-college-of-science-commerce-arts' },
  { step: 79, slug: 'sea-composite-pu-college', section: 'institutions', title: 'SEA Composite PU College', url: 'https://seaedu.ac.in/page/sea-composite-pu-college' },
  { step: 81, slug: 'sea-evening-college', section: 'institutions', title: 'SEA Evening College', url: 'https://seaedu.ac.in/page/sea-evening-college' },
  { step: 82, slug: 'sea-bed-college', section: 'institutions', title: 'SEA B.Ed College', url: 'https://seaedu.ac.in/page/sea-bed-college' },
  { step: 83, slug: 'sea-international-school', section: 'institutions', title: 'SEA International School', url: 'https://seaedu.ac.in/page/sea-international-school' },
  { step: 84, slug: 'sea-primary-higher-secondary-school', section: 'institutions', title: 'SEA Primary & Higher Secondary School', url: 'https://seaedu.ac.in/page/sea-primary-higher-secondary-school' },
  { step: 85, slug: 'sea-industrial-training-institute', section: 'institutions', title: 'SEA Industrial Training Institute', url: 'https://seaedu.ac.in/page/sea-industrial-training-institute' },

  // ADMISSIONS
  { step: 87, slug: 'apply-online', section: 'admissions', title: 'Apply Online', url: 'https://seaedu.ac.in/page/apply-online' },
  { step: 88, slug: 'admission', section: 'admissions', title: 'Admission', url: 'https://seaedu.ac.in/page/admission' },
  { step: 89, slug: 'admission-procedure', section: 'admissions', title: 'Admission Procedure', url: 'https://seaedu.ac.in/page/admission-procedure' },
  { step: 90, slug: 'foreign-national', section: 'admissions', title: 'Foreign National', url: 'https://seaedu.ac.in/page/foreign-national' },
  { step: 91, slug: 'financial-aid', section: 'admissions', title: 'Financial Aid', url: 'https://seaedu.ac.in/page/financial-aid' },
  { step: 92, slug: 'nri-admission', section: 'admissions', title: 'NRI Admission', url: 'https://seaedu.ac.in/page/nri-admission' },

  // CAMPUS
  { step: 93, slug: 'campus-infrastructure', section: 'campus', title: 'Campus Infrastructure', url: 'https://seaedu.ac.in/page/campus-infrastructure' },
  { step: 95, slug: 'digital-infrastructure', section: 'campus', title: 'Digital Infrastructure', url: 'https://seaedu.ac.in/page/digital-infrastructure' },
  { step: 96, slug: 'accommodation-hostel-facilities', section: 'campus', title: 'Accommodation & Hostel Facilities', url: 'https://seaedu.ac.in/page/accommodation-hostel-facilities' },
  { step: 97, slug: 'sports', section: 'campus', title: 'Sports', url: 'https://seaedu.ac.in/page/sports' },

  // PLACEMENTS
  { step: 98, slug: 'placement-overview', section: 'placements', title: 'Placement Overview', url: 'https://seaedu.ac.in/page/placement-overview' },
  { step: 99, slug: 'career-advancement-cell', section: 'placements', title: 'Career Advancement Cell', url: 'https://seaedu.ac.in/page/career-advancement-cell' },
  { step: 100, slug: 'recruiters', section: 'placements', title: 'Recruiters', url: 'https://seaedu.ac.in/page/recruiters' },

  // GALLERY
  { step: 101, slug: 'photo-gallery', section: 'gallery', title: 'Photo Gallery', url: 'https://seaedu.ac.in/page/photo-gallery' },
  { step: 103, slug: 'video-gallery', section: 'gallery', title: 'Video Gallery', url: 'https://seaedu.ac.in/page/video-gallery' },

  // OTHER
  { step: 104, slug: 'contact-us', section: 'other', title: 'Contact Us', url: 'https://seaedu.ac.in/page/contact-us' },
  { step: 105, slug: 'accreditations', section: 'other', title: 'Accreditations', url: 'https://seaedu.ac.in/page/accreditations' },
  { step: 106, slug: 'brochures', section: 'other', title: 'Brochures', url: 'https://seaedu.ac.in/page/brochures' },
];

const STEPS_DIR = path.join(
  'C:\\Users\\Shreyas\\.gemini\\antigravity-ide\\brain\\90de1db7-2d3a-4100-b0bb-a4a94e58943f\\.system_generated\\steps'
);
const OUTPUT_DIR = path.join('d:\\College website\\content');
const ASSETS_DIR = path.join('d:\\College website\\assets');

// ---- HTML Content Extraction Utilities ----

function stripHtmlTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<\/td>/gi, ' | ')
    .replace(/<\/th>/gi, ' | ')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<h1[^>]*>/gi, '# ')
    .replace(/<h2[^>]*>/gi, '## ')
    .replace(/<h3[^>]*>/gi, '### ')
    .replace(/<h4[^>]*>/gi, '#### ')
    .replace(/<h5[^>]*>/gi, '##### ')
    .replace(/<h6[^>]*>/gi, '###### ')
    .replace(/<strong[^>]*>|<b[^>]*>/gi, '**')
    .replace(/<\/strong>|<\/b>/gi, '**')
    .replace(/<em[^>]*>|<i[^>]*>/gi, '*')
    .replace(/<\/em>|<\/i>/gi, '*')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}

function extractImages(html) {
  const images = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    let src = match[1];
    // Skip tiny icons, tracking pixels, and base64 images
    if (src.startsWith('data:') || src.includes('pixel') || src.includes('tracking')) continue;
    // Make relative URLs absolute
    if (src.startsWith('../') || src.startsWith('/')) {
      src = 'https://seaedu.ac.in' + src.replace(/^\.\./, '');
    }
    // Extract alt text
    const altMatch = match[0].match(/alt=["']([^"']*?)["']/i);
    const alt = altMatch ? altMatch[1] : '';
    images.push({ src, alt });
  }
  return images;
}

function extractMainContent(html) {
  // Try to find the main content area (between header/nav and footer)
  // SEA website uses .page-content, .content-area, or similar patterns
  
  // Remove header/nav area
  let content = html;
  
  // Remove everything before the main content
  const contentMarkers = [
    /<div[^>]*class="[^"]*page-content[^"]*"[^>]*>/i,
    /<div[^>]*class="[^"]*content-area[^"]*"[^>]*>/i,
    /<div[^>]*class="[^"]*main-content[^"]*"[^>]*>/i,
    /<section[^>]*class="[^"]*about-section[^"]*"[^>]*>/i,
    /<div[^>]*class="[^"]*inner-content[^"]*"[^>]*>/i,
    /<div[^>]*class="[^"]*cms-content[^"]*"[^>]*>/i,
  ];
  
  for (const marker of contentMarkers) {
    const match = content.match(marker);
    if (match) {
      content = content.substring(match.index);
      break;
    }
  }
  
  // Remove footer
  const footerMarkers = [
    /<footer/i,
    /<div[^>]*class="[^"]*footer[^"]*"[^>]*>/i,
    /<div[^>]*class="[^"]*footersection[^"]*"[^>]*>/i,
  ];
  
  for (const marker of footerMarkers) {
    const match = content.match(marker);
    if (match) {
      content = content.substring(0, match.index);
      break;
    }
  }
  
  return content;
}

function extractLinks(html) {
  const links = [];
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    let href = match[1];
    const text = stripHtmlTags(match[2]).trim();
    if (href.startsWith('#') || href === 'javascript:void(0)' || !text) continue;
    if (href.startsWith('../') || href.startsWith('/')) {
      href = 'https://seaedu.ac.in' + href.replace(/^\.\./, '');
    }
    links.push({ href, text });
  }
  return links;
}

// ---- Main Processing ----

function processPage(pageConfig) {
  const stepFile = path.join(STEPS_DIR, String(pageConfig.step), 'content.md');
  
  if (!fs.existsSync(stepFile)) {
    console.log(`⚠ Step file not found: ${stepFile}`);
    return null;
  }
  
  const rawContent = fs.readFileSync(stepFile, 'utf-8');
  
  // Extract the HTML portion (after the --- frontmatter)
  const htmlStart = rawContent.indexOf('---', rawContent.indexOf('---') + 3);
  const html = htmlStart > -1 ? rawContent.substring(htmlStart + 3) : rawContent;
  
  // Extract images from full HTML
  const images = extractImages(html);
  
  // Extract main content area
  const mainHtml = extractMainContent(html);
  
  // Convert to clean text
  const cleanText = stripHtmlTags(mainHtml);
  
  // Extract links
  const links = extractLinks(mainHtml);
  
  return {
    title: pageConfig.title,
    slug: pageConfig.slug,
    section: pageConfig.section,
    url: pageConfig.url,
    content: cleanText,
    images: images,
    links: links,
  };
}

// ---- Output Generation ----

function generateMarkdown(pageData) {
  let md = `---
title: "${pageData.title}"
slug: "${pageData.slug}"
section: "${pageData.section}"
source_url: "${pageData.url}"
---

# ${pageData.title}

`;

  md += pageData.content;
  
  if (pageData.images.length > 0) {
    md += '\n\n---\n\n## Images Found on This Page\n\n';
    pageData.images.forEach((img, i) => {
      md += `${i + 1}. ![${img.alt || 'Image'}](${img.src})\n`;
    });
  }
  
  return md;
}

// ---- Run ----

console.log('🚀 SEA College Website Content Extractor');
console.log('=========================================\n');

const allImages = [];
const siteMap = {
  name: 'SEA Group of Institutions',
  domain: 'seaedu.ac.in',
  extractedAt: new Date().toISOString(),
  sections: {},
  pages: [],
};

let successCount = 0;
let failCount = 0;

for (const page of PAGE_MAP) {
  process.stdout.write(`Processing: ${page.title}... `);
  
  const data = processPage(page);
  
  if (!data) {
    console.log('❌ FAILED');
    failCount++;
    continue;
  }
  
  // Write markdown content file
  const outputPath = path.join(OUTPUT_DIR, page.section, `${page.slug}.md`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, generateMarkdown(data), 'utf-8');
  
  // Collect images
  data.images.forEach(img => {
    allImages.push({
      src: img.src,
      alt: img.alt,
      page: page.title,
      section: page.section,
    });
  });
  
  // Add to sitemap
  if (!siteMap.sections[page.section]) {
    siteMap.sections[page.section] = [];
  }
  siteMap.sections[page.section].push({
    title: page.title,
    slug: page.slug,
    url: page.url,
    contentFile: `content/${page.section}/${page.slug}.md`,
    imageCount: data.images.length,
    contentLength: data.content.length,
  });
  
  siteMap.pages.push({
    title: page.title,
    slug: page.slug,
    section: page.section,
    route: page.section === 'home' ? '/' : `/${page.section}/${page.slug}`,
    url: page.url,
  });
  
  console.log(`✅ (${data.content.length} chars, ${data.images.length} images)`);
  successCount++;
}

// Write images catalog
const imagesOutputPath = path.join(ASSETS_DIR, 'images.json');
fs.writeFileSync(imagesOutputPath, JSON.stringify(allImages, null, 2), 'utf-8');

// Write sitemap
const siteMapPath = path.join('d:\\College website', 'site-map.json');
fs.writeFileSync(siteMapPath, JSON.stringify(siteMap, null, 2), 'utf-8');

console.log(`\n=========================================`);
console.log(`✅ Processed: ${successCount} pages`);
console.log(`❌ Failed: ${failCount} pages`);
console.log(`📸 Total images found: ${allImages.length}`);
console.log(`📄 Site map saved to: ${siteMapPath}`);
console.log(`🖼  Images catalog saved to: ${imagesOutputPath}`);
console.log(`📁 Content files saved to: ${OUTPUT_DIR}`);
