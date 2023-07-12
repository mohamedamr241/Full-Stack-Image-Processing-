"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const validate = (req, res, next) => {
    const name = req.query.filename;
    let images = [];
    const files = fs_1.default.readdirSync('./images');
    files.forEach((img) => {
        const nameWithouExtension = path_1.default.parse(img).name;
        images.push(nameWithouExtension);
    });
    if (images.includes(name) &&
        !isNaN(req.query.width) &&
        !isNaN(req.query.height)) {
        next();
    }
    else {
        return res.status(400).json({
            error: 'This image does not exist or width and height must be integers, please write a valid data',
        });
    }
};
exports.validate = validate;
