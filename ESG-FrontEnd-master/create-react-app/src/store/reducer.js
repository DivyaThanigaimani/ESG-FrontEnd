import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import  cardSlice from '../slice/cardSlice';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  cardSlice:cardSlice.reducer
  

});

export default reducer;
