require('@babel-register');
 
const router = require('./sitemap-routes.js').default;
const Sitemap = require('react-router-sitemap').default;
 
(
    new Sitemap(<Route path='/home' />)
        .build('https://masteraula.com.br')
        .save('./sitemap.xml')
);

console.log("The sitemap was built."); // Only shows this message after everything works well.
