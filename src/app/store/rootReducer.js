import { combineReducers } from '@reduxjs/toolkit';
import fuse from './fuse';
import i18n from './i18nSlice';
import user from './userSlice';
import prevail from './prevailSlice';
import detail from './detailSlice';
import member from './memberSlice';
import NewApplicationSlice from './NewApplicationSlice';
import MainPageSlice from './MainPageSlice';

const createReducer = (asyncReducers) => (state, action) => {
  if (action.type === 'user/userLoggedOut') {
    // Reset the state when the user logs out
    state = undefined;
  }

  const combinedReducer = combineReducers({
    fuse,
    i18n,
    user,
    prevail,
    detail,
    member,
    NewApplicationSlice,
    MainPageSlice,
    ...asyncReducers,
  });

  return combinedReducer(state, action);
};

export default createReducer;
