import express from 'express';
import { ImageProcessing } from '../Controller/imageResize';
import { validate } from '../Middleware/validation';
import fs from 'fs';
import path from 'path';
import { checkBuffer } from '../Middleware/checkBuffering';
import {checkFrontBuffer} from '../Middleware/frontBuffering';
import {validatedata} from '../Middleware/frontvalidation';

const route = express.Router();
let projectData = {name:"",width:"",height:""};
let imgpath: string;

route.get('/getData',(req,res)=>{
  let images: string[] = [];
  const files = fs.readdirSync('./images');
  files.forEach((img) => {
    const nameWithouExtension = path.parse(img).name;
    if(nameWithouExtension!="buffer")
      images.push(nameWithouExtension);
  });
  res.send(images);
});


route.post('/saveData',(req,res)=>{
  const data=req.body;
    projectData={
        name:data.name,
        width:data.width,
        height:data.height
    };
  res.send(projectData);
});

route.post('/processImage',validatedata,checkFrontBuffer,async(req,res)=>{
  let img:string[]=[];
  const result = await ImageProcessing(
    projectData.name as unknown as string,
    projectData.width as unknown as number,
    projectData.height as unknown as number,
  );
  imgpath=path.resolve(result);
  img.push(path.resolve(result))
  res.send(img);
});

route.post('/saveImage',(req,res)=>{
  let img:string[]=[];
  imgpath=path.resolve(req.body.name);
  img.push(imgpath);
  res.send(img);
});

route.get('/showImage',(req,res)=>{
  res.sendFile(imgpath);
});

route.get('/image', validate, checkBuffer, async (req, res) => {
  const result = await ImageProcessing(
    projectData.name as unknown as string,
    req.query.width as unknown as number,
    req.query.height as unknown as number,
  );
  res.sendFile(path.resolve(result));
});

export default route;
