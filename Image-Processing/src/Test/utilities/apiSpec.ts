import supertest from "supertest";
import app from '../../server';
import {ImageProcessing} from '../../Controller/imageResize';
import path from 'path';
const request = supertest(app);

describe('Testing endpoints',async()=>{
  it('testing image endpoint which will respond', async ()=>{
        const req = await request.get('/main/image?filename=fjord&width=200&height=200')
        expect(req.status).toBe(200);
  });
  it('testing image endpoint which will not respond', async ()=>{
    const req = await request.get('/main/image')
    expect(req.status).toBe(400);
  });
});
describe('Testing image processing',()=>{
  it('testing imageResize controller',async()=>{
      const Imagepath=await ImageProcessing('fjord', 200, 200);
      expect(path.resolve(Imagepath)).toEqual(path.resolve('./images/buffer/fjord-200-200.jpg'));
  });
});