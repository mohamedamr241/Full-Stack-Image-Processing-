import express from 'express';
import fs from 'fs';
import path from 'path';
const validatedata = (
  req: express.Request,
  res: express.Response,
  next: Function,
) => {
    if (!isNaN(req.body.width as unknown as number) && !isNaN(req.body.height as unknown as number)){
        next();
      } 
      else {
        return res.status(400).json({
          error:
            'width and height must be integers, please write a valid data',
        });
      }
}

export {validatedata};