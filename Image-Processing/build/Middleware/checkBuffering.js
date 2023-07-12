"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBuffer = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const checkBuffer = (req, res, next) => {
    let images = [];
    let modifiedImages = [];
    const files = fs_1.default.readdirSync('./images');
    files.forEach((img) => {
        images.push(img);
    });
    if (images.includes('buffer')) {
        const modFile = fs_1.default.readdirSync(path_1.default.resolve('./images/buffer'));
        modFile.forEach((img) => {
            modifiedImages.push(img);
        });
        if (modifiedImages.includes(`${req.query.filename}-${req.query.width}-${req.query.height}.jpg`)) {
            res.sendFile(path_1.default.resolve(`./images/buffer/${req.query.filename}-${req.query.width}-${req.query.height}.jpg`));
        }
        else {
            next();
        }
    }
    else {
        next();
    }
};
exports.checkBuffer = checkBuffer;
