import { Router } from 'express';
import { POST } from '../middleware/post.middelware.js';
import { checkToken } from '../utils/tokens.js';
import { ACTIVATE, GETACTIVE, GETPENDING, GETREJECTED, REJECT, USERSIGN } from '../controllers/admin.controller.js';

const admin = Router();

admin.post('/sign', POST, USERSIGN);

admin.get("/getpending", checkToken, GETPENDING)

admin.get("/getrejected", checkToken, GETREJECTED)

admin.get("/getactive", checkToken, GETACTIVE)

admin.get("/usersapply/:postId", checkToken, ACTIVATE)

admin.get("/usersreject/:postId", checkToken, REJECT)


export default admin;
