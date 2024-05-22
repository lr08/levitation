import express, { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import Product from '../models/Product';

const router = express.Router();

router.get('/generate', async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        console.log('Products fetched:', products);

        const templatePath = path.join(__dirname, '../templates/invoiceTemplate.html');
        console.log('Template path:', templatePath);

        const templateContent = fs.readFileSync(templatePath, 'utf8');
        console.log('Template content read');

        const htmlContent = templateContent.replace(
            '<!-- Product rows will be inserted here -->',
            products.map(product => `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>${product.rate}</td>
                    <td>${product.quantity * product.rate}</td>
                    <td>${(product.quantity * product.rate * 0.18).toFixed(2)}</td>
                </tr>
            `).join('')
        );
        console.log('HTML content generated');

        const browser = await puppeteer.launch({ headless: true , args: ['--no-sandbox', '--disable-setuid-sandbox'],
        timeout: 60000 });
        console.log('Browser launched');
        const page = await browser.newPage();
        console.log('New page created');

        await page.setContent(htmlContent, { waitUntil: 'networkidle2' });
        console.log('Page content set in Puppeteer');

        // Wait for table element to be fully loaded
        await page.waitForSelector('table');
        console.log('Content fully loaded');

        const pdfBuffer = await page.pdf({ format: 'A4' , timeout: 600000});
        console.log('PDF generated');

        await browser.close();
        console.log('Browser closed');

        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (err) {
        console.error('Error generating PDF:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
