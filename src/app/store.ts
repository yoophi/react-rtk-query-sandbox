import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer, { counterSlice } from "../features/counter/counterSlice";
import { pokemonApi } from '../services/pokemon';
import type { PreloadedState } from '@reduxjs/toolkit'
import configurationSlice from '../features/configuration/configurationSlice';

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  [counterSlice.name]: counterSlice.reducer,
  [configurationSlice.name]: configurationSlice.reducer,
})
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
    preloadedState,
  });
  return store
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
