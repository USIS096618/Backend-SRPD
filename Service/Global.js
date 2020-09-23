const path = require('path')
const fs = require('fs-extra');
const hbs = require('handlebars')
var helpers = require('handlebars-helpers')();
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dxmkfwigq', 
    api_key: '151855426665468', 
    api_secret: 'L2jJXjqkz9Otqe1p7ZOce19Xyho' 
});

const Global = {
    compile: async (templateName, data) => {
        const filePath = path.join(process.cwd(), 'Templates', `${templateName}.hbs`);
        const html = await fs.readFile(filePath, 'utf-8');
        return hbs.compile(html)(data)
    },
    UploadFile: (ruta) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload( ruta,
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );
    
        });
    }
}

module.exports = Global