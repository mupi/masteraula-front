require('@babel/register'); // 1.

const Sitemap = require('react-router-sitemap').default;
const router = require('./sitemap-routes').default;

// 2.
(
  new Sitemap(router)
    .build('https://masteraula.com.br/#/')
    .save('./sitemap.xml')
);

console.log("The sitemap was built."); // Only shows this message after everything works well.
