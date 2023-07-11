import express from 'express';
import fs from 'fs';
import path from 'path';
const validate = (
  req: express.Request,
  res: express.Response,
  next: Function,
) => {
  const name = req.query.filename;
  let images: string[] = [];
  const files = fs.readdirSync('./images');
  files.forEach((img) => {
    const nameWithouExtension = path.parse(img).name;
    images.push(nameWithouExtension);
  });
  if (
    images.includes(name as unknown as string) &&
    !isNaN(req.query.width as unknown as number) &&
    !isNaN(req.query.height as unknown as number)
  ) {
    next();
  } else {
    return res.status(400).json({
      error:
        'This image does not exist or width and height must be integers, please write a valid data',
    });
  }
};

export { validate };
