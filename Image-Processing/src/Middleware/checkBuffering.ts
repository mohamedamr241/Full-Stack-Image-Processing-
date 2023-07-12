import express from 'express';
import fs from 'fs';
import path from 'path';

const checkBuffer = (
  req: express.Request,
  res: express.Response,
  next: Function,
) => {
  let images: string[] = [];
  let modifiedImages: string[] = [];
  const files = fs.readdirSync('./images');
  files.forEach((img) => {
    images.push(img);
  });
  if (images.includes('buffer')) {
    const modFile = fs.readdirSync(path.resolve('./images/buffer'));
    modFile.forEach((img) => {
      modifiedImages.push(img);
    });
    console.log(modifiedImages);
    if (
      modifiedImages.includes(
        `${req.query.filename}-${req.query.width}-${req.query.height}.jpg`,
      )
    ) {
      console.log('1');
      res.sendFile(
        path.resolve(
          `./images/buffer/${req.query.filename}-${req.query.width}-${req.query.height}.jpg`,
        ),
      );
    } else {
      console.log('2');
      next();
    }
  } else {
    console.log('3');
    next();
  }
};
export { checkBuffer };
