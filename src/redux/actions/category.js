import services from '../../helpers/services';
import qs from 'qs';

export default {
  getAllCategories: (search = '') => ({
    type: 'GET_ALL_CATEGORIES',
    payload: services().get(
      'public/category/all?' + qs.stringify({search: {categoryName: search}}),
    ),
  }),
  getCategoryById: (id) => ({
    type: 'GET_CATEGORY_ID',
    payload: services().get('public/category/detail/' + id),
  }),
};
