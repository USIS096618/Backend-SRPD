'use strict'

const path = require('path')
const global = require('../Service/Global')
const puppeteer = require('puppeteer');
const hbs = require('handlebars')
var helpers = require('handlebars-helpers')();
const fs = require('fs-extra');
const moment = require('moment');
// const Mongoose = require('mongoose');

const data = {Hola: "Que pedo we",
date: new Date()}

const PDFS = {
    getPDF: async (req, res) => {
        try {
            const browser = await puppeteer.launch({
                args: ['--no-sandbox'],
                headless: true
            });
            const page = await browser.newPage();
    
            const content = await global.compile('shot-list', data)
        
            await page.setContent(content);
            await page.emulateMediaType('screen')
            await page.pdf({ path: __dirname + '/PDF/Curriculum.pdf', format: "A4", printBackground: true});
            await browser.close();

            res.download(__dirname + '/PDF/Curriculum.pdf', 'Curriculum', (err) => {
                if (err) {
                    console.log(err);
                }
            })
            
        } catch (error) {
            res.status(200).send({
                status: 'error'
            })
        }
    }
}

module.exports = PDFS