"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./Routes/api"));
const app = (0, express_1.default)();
const port = 8000;
const host = 'localhost';
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// start cors
app.use((0, cors_1.default)());
app.use('/main', api_1.default);
app.listen(port, listening);
function listening() {
    console.log(`server running on localhost: ${port}`);
    console.log(`Server is running on http://${host}:${port}`);
}
exports.default = app;
