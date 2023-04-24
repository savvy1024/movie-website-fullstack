import express from 'express';
import {body } from 'express-validator';
import favoriteController from '../controllers/favorite.controller';
import userController from '../controllers/user.controller';
import requestHandler from '../middlewares/request.handler';
import userModel from '../models/user.model';
import tokenMiddleware from '../middlewares/token.middleware';