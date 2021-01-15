import services from '../../helpers/services';
import qs from 'qs';

export default {
  getAllArticles: (search = '') => ({
    type: 'GET_ALL_ARTICLES',
    payload: services().get(
      'public/article/all?' + qs.stringify({search: {title: search}}),
    ),
  }),
  getArticleById: (id) => ({
    type: 'GET_ARTICLE_ID',
    payload: services().get('public/article/read/' + id),
  }),
  deleteArticle: (token, id) => ({
    type: 'DELETE_ARTICLE',
    payload: services(token).delete('user/article/delete' + id),
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE_DELETE',
  }),
};
