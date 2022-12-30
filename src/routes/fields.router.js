import { Router } from 'express';
import { CATEGORY, FULLNAMES, SUBCATEGORY } from '../controllers/fields.controller.js'


const fields = Router();

fields.get('/category', CATEGORY)

fields.get('/subcategory', SUBCATEGORY)

fields.get('/fullname', FULLNAMES)

export default fields;
