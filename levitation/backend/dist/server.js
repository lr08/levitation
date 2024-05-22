"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path = require('path');
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path.join(__dirname, '/build')));
// Routes
const auth_1 = __importDefault(require("./routes/auth"));
const product_1 = __importDefault(require("./routes/product"));
const pdf_1 = __importDefault(require("./routes/pdf"));
app.use('/api/auth', auth_1.default);
app.use('/api/products', product_1.default);
app.use('/api/pdf', pdf_1.default);
// MongoDB connection
//const mongoURI: string =  "mongodb://localhost:27017/invoicegenerator";
const mongoURI = process.env.MONGO_URI;
mongoose_1.default.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
// Start server
const PORT = process.env.PORT || 5000;
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build', 'index.html'));
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
