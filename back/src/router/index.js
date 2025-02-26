import express from 'express';
import { Router } from "express";
import { catchErrors } from "../middlewares/catchErrors.js";
import { projectControllers } from "../controllers/projectControllers.js";
import multer from 'multer'


const router = Router();
const upload = multer({ dest: 'uploads/' }); 

router.use('/uploads', express.static('uploads'));

router.get("/projects", catchErrors(projectControllers.index));
router.get("/projects/:slug", catchErrors(projectControllers.show));
router.post("/projects",  upload.single('image'),catchErrors(projectControllers.store));
router.patch("/projects/:slug", catchErrors(projectControllers.update));
router.delete("/projects/:slug", catchErrors(projectControllers.destroy));


export { router };
