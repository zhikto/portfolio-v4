const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const uri = 'https://taito-hasegawa.com';

async function generateSitemap() {
  const serviceDomain = process.env.SERVICE_DOMAIN;
  const apiKey = process.env.API_KEY;
  const endpoint = `https://${serviceDomain}.microcms.io/api/v1/work?limit=100`;

  try {
    console.log('Requesting data from:', endpoint);
    const response = await axios.get(endpoint, {
      headers: {
        'X-API-KEY': apiKey,
      },
    });

    // microCMSから取得した`work`ページのルートを生成
    const workRoutes = response.data.contents.map((work) => `/work/${work.id}`);

    // 固定ページ（aboutやdiaryページなど）を追加
    const staticRoutes = ['/about'];

    // すべてのルートを結合
    const allRoutes = [...staticRoutes, ...workRoutes];

    // Sitemap XMLを生成
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allRoutes
        .map(
          (route) => `
        <url>
          <loc>${uri}${route}</loc>
          <changefreq>weekly</changefreq>
          <priority>${route === '/' ? 1.0 : 0.8}</priority>
        </url>`
        )
        .join('')}
    </urlset>`;

    // ファイルに書き込み
    fs.writeFileSync('./static/sitemap.xml', sitemapContent);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error(
      'Error generating sitemap:',
      error.response ? error.response.data : error.message
    );
  }
}

generateSitemap();