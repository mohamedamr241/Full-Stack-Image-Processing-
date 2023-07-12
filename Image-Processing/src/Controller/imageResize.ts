import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

export async function ImageProcessing(
  imageName: string,
  width: number,
  height: number,
): Promise<string> {
  // ==> first creating the buffer directory if it does not exist
  let images: string[] = [];
  const files = fs.readdirSync('./images');
  files.forEach((img) => {
    const nameWithouExtension = path.parse(img).name;
    images.push(nameWithouExtension);
  });
  if (!images.includes('buffer')) {
    fs.mkdir('./images/buffer', (err) => {
      if (err) {
        console.error('Error creating directory:', err);
      } else {
        console.log('Directory created successfully.');
      }
    });
  }

  // pathes of source and destination
  const inputImagePath = `./images/${imageName}.jpg`;
  const outputImagePath = `./images/buffer/${imageName}-${width}-${height}.jpg`;

  await sharp(inputImagePath)
    .resize(
      parseInt(width as unknown as string),
      parseInt(height as unknown as string),
    )
    .toFile(outputImagePath);
  console.log("done");
  return outputImagePath;
}
