"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
router.get('/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find();
        console.log('Products fetched:', products);
        const templatePath = path_1.default.join(__dirname, '../templates/invoiceTemplate.html');
        console.log('Template path:', templatePath);
        const templateContent = fs_1.default.readFileSync(templatePath, 'utf8');
        console.log('Template content read');
        const htmlContent = templateContent.replace('<!-- Product rows will be inserted here -->', products.map(product => `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>${product.rate}</td>
                    <td>${product.quantity * product.rate}</td>
                    <td>${(product.quantity * product.rate * 0.18).toFixed(2)}</td>
                </tr>
            `).join(''));
        console.log('HTML content generated');
        const browser = yield puppeteer_1.default.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
            timeout: 60000 });
        console.log('Browser launched');
        const page = yield browser.newPage();
        console.log('New page created');
        yield page.setContent(htmlContent, { waitUntil: 'networkidle2' });
        console.log('Page content set in Puppeteer');
        // Wait for table element to be fully loaded
        yield page.waitForSelector('table');
        console.log('Content fully loaded');
        const pdfBuffer = yield page.pdf({ format: 'A4', timeout: 600000 });
        console.log('PDF generated');
        yield browser.close();
        console.log('Browser closed');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    }
    catch (err) {
        console.error('Error generating PDF:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
