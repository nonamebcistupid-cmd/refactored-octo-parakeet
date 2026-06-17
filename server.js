const express = require('express');
const { Sonolus } = require('@sonolus/express');

const app = express();
// Cổng tự động cho Render
const port = process.env.PORT || 3000;

const sonolus = new Sonolus(app, {
    basePath: '', 
    fallbackLocale: 'en'
});

// Load tài nguyên từ thư mục pack
sonolus.load('pack'); 

// Chạy server đón request từ mọi IP
app.listen(port, '0.0.0.0', () => {
    console.log(`Done, wait 1-2s and "sleep.-." is available >_<. `);
});
