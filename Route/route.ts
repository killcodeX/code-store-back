const express = require("express");
import { AuthenticateToken } from "../Middlewares/tokenValidate";
import { createUser, loginUser } from "../Controllers/userController";
import {
  createPost,
  getAllPost,
  getEditPost,
  getdeletePost,
  getFilterLang,
  addLanguage,
  getLanguages,
} from "../Controllers/postController";

const router = express.Router();

// User Routes
router.post("/signup", createUser);
router.post("/signin", loginUser);

// Post Routes
router.post("/create-post", AuthenticateToken, createPost);
router.get("/get-all-posts", AuthenticateToken, getAllPost);
router.put("/update-post", AuthenticateToken, getEditPost);
router.delete("/delete-post/:id", AuthenticateToken, getdeletePost);
router.post("/filter-language", AuthenticateToken, getFilterLang);
router.post("/add-language", AuthenticateToken, addLanguage);
router.get("/get-all-languages", AuthenticateToken, getLanguages);

export default router;
