import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

const store = configureStore({
    reducer: rootReducer
});

export const useDispatch = () => useAppDispatch();
export const useSelector = useAppSelector;

export default store;