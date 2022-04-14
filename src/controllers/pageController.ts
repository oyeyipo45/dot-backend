import { Request, Response, NextFunction } from 'express';
import  PageModel, { Page, PageDocument, User }  from '../models/PageModel';

interface ReqObject  {
  id: string;
  created_at: Date;
  page: Page;
  user: User;
};

export const registerPage = async (req: Request, res: Response) => {
  const { id, page, user, created_at } = req.body as ReqObject;
  
  
  try {
    if ((!id || !user || !page || !created_at)) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    
    const data = await PageModel.create({ id, page, user, created_at });

    res.status(200).json({ data: data, message: 'page details saved successfully' });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};


export const getPages = async (req: Request, res: Response) => {
  try {
    const pages = await PageModel.find().sort({created_at : -1})

    res.status(200).json({ data: pages, message: 'Pages fetched successfully' });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};