const fs = require('fs');
const axios = require('axios');
const uri = 'https://taito-hasegawa.com';
require('dotenv').config();

async function generateSitemap() {
  const serviceDomain = process.env.SERVICE_DOMAIN;
  const apiKey = process.env.API_KEY;
  const config = { headers: { 'X-API-KEY': apiKey } };

  try {
    const worksResponse = await axios.get(`https://${serviceDomain}.microcms.io/api/v1/work`, config);
    const works = worksResponse.data.contents;

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${uri}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${works
        .map(
          (work) => `
        <url>
          <loc>${uri}/work/${work.id}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`
        )
        .join('')}
    </urlset>`;
    
    fs.writeFileSync('./static/sitemap.xml', sitemapContent);
    console.log('Sitemap generated!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();