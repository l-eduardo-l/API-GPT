import { Router } from 'express';

import IndexController from '../controllers/indexController.js'

const router = new Router();

router.get('/', IndexController.indexGET);
router.post('/', IndexController.indexPOST);
router.post('/logout', IndexController.indexLogout);



export default router;