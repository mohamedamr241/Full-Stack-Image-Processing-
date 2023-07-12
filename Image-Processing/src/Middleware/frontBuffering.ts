import express from 'express';
import fs from 'fs';
import path from 'path';

const checkFrontBuffer = (
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
    if (
      modifiedImages.includes(
        `${req.body.name}-${req.body.width}-${req.body.height}.jpg`,
      )
    ) {
      let arr:string[]=[];
      arr.push(path.resolve(
        `./images/buffer/${req.body.name}-${req.body.width}-${req.body.height}.jpg`,
      ))
      res.send(arr);
    } else {
      next();
    }
  } else {
    next();
  }
};
export { checkFrontBuffer };
