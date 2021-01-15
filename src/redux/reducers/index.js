import {combineReducers} from 'redux';

import auth from './auth/auth';

import getAllArticles from './article/getAllArticles';
import getArticleId from './article/getArticleId';
import deleteArticle from './article/deleteArticle';

import getAllCategories from './category/getAllCategories';

export default combineReducers({
  // auth
  auth,

  // article
  getAllArticles,
  deleteArticle,
  getArticleId,

  // category
  getAllCategories,
});
