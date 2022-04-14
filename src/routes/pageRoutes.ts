import express from 'express';
import { registerPage, getPages } from '../controllers/pageController';

const router = express.Router();

router.post('/register', registerPage);
router.get('/', getPages);



export default router;
