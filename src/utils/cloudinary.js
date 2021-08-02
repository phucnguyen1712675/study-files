require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dqstbfcdu',
  api_key: '977987614351525',
  api_secret: 'K_lJTNWd-xc0IPX5e6Nd2bkRLxk',
});

module.exports = { cloudinary };
