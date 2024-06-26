import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import { pupsReducer } from '../features/pups/pupsSlice';
import { ordersReducer } from '../features/orders/ordersSlice';
import { warehousesReducer } from '../features/warehouses/warehousesSlice';
import { pricesReducer } from '../features/prices/pricesSlice';
import { regionsReducer } from '../features/regions/regionsSlice';
import { shipmentsReducer } from '../features/shipments/shipmentsSlice';
import { companyAddressReducer } from '../features/companyAddress/companyAddressesSlice';
import { priceListsReducer } from '../features/priceLists/priceListsSlice';
import { socialReducer } from '../features/socials/socialsSlice';
import { bannedReducer } from '../features/banned/bannedSlice';

const usersPersistConfig = {
  key: 'techGear:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  pups: pupsReducer,
  orders: ordersReducer,
  warehouses: warehousesReducer,
  prices: pricesReducer,
  regions: regionsReducer,
  shipments: shipmentsReducer,
  companyAddress: companyAddressReducer,
  priceLists: priceListsReducer,
  socials: socialReducer,
  banned: bannedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
