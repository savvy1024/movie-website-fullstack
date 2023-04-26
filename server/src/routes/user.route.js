import express from 'express';
import { body } from 'express-validator';
import favoriteController from '../controllers/favorite.controller';
import userController from '../controllers/user.controller';
import tokenMiddleware from '../middlewares/token.middleware';
import responseHandler from '../handlers/response.handler';
import userModel from '../models/user.model';

const router = express.Router();

router.post(
  '/signup',
  body('username')
    .exists()
    .withMessage('username is required')
    .isLength({ min: 8 })
    .withMessage('username must be at least 8  characters long')
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) {
        return Promise.reject('username already exists');
      }
    }),
  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8  characters long'),
  body('confirmPassword')
    .exists()
    .withMessage('confirm password is required')
    .isLength({ min: 8 })
    .withMessage('confirmpassword must be at least 8  characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error('confirmpassword does not match');
      return true;
    }),
  body('displayName')
    .exists()
    .withMessage('display name is required')
    .isLength({ min: 8 })
    .withMessage('display name must be at least 8  characters long'),
  requestHandler.validate,
  userController.signin

);

router.put(
    "/update-password",
    tokenMiddleware.auth,
    body("password")
     .exists().withMessage("password is required")
     .isLength({ min: 8 }).withMessage("password must be at least 8 characters long"),
    body("newPassword")
     .exists().withMessage("new password is required")
     .isLength({ min: 8 }).withMessage("new password must be at least 8 characters long"),,
    body("confirmNewPassword")
    .exists().withMessage("confirm new password is required")
    .isLength({ min: 8 }).withMessage("confirm new password must be at least 8 characters long"),
    .custom((value, { req }) => {
      if (value !== req.body.newPassword)
        throw new Error("confirm new password does not match");
      return true;      
    }),
    requestHandler.validate,
    userController.updatePassword
);

router.get(
    "/favorites",
    tokenMiddleware.auth,
    favoriteController.getFavoritesOfUser
);

router.post(
    "/favorites",
    tokenMiddleware.auth,
    body("mediaType")
      .exists().withMessage("media type is required")
      .custom(type => ["movie", "tv"].includes(type).withMessage("media type must be movie or tv")),
    body("mediaId")
     .exists().withMessage("media id is required")
     .isLength({ min: 1 }).withMessage("media id can not be empty"),
    body("mediaTitle")
     .exists().withMessage("media title is required")
    body("mediaPoster")
     .exists().withMessage("media poster is required")
    body("mediaRate")
     .exists().withMessage("media rate is required"),
    requestHandler.validate,
    favoriteController.addFavorite


);

router.delete(
    "/favorites/:favoriteId",
    tokenMiddleware.auth,
    favoriteController.removeFavorite
);

export default router;