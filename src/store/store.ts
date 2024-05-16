import { configureStore } from '@reduxjs/toolkit';
import userAccountSlice from '../features/accounts/UserAccountSlice';
import categorySlice from '../features/categories/CategorySlice';
import shopSlice from '../features/shops/ShopSlice';

export const store = configureStore({
    reducer: {
        account: userAccountSlice,
        category: categorySlice,
        shop: shopSlice,
    },
    });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
