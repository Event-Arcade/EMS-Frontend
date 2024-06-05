import { configureStore } from '@reduxjs/toolkit';
import userAccountSlice from '../features/accounts/UserAccountSlice';
import categorySlice from '../features/categories/CategorySlice';
import shopSlice from '../features/shops/ShopSlice';
import serviceSlice from '../features/shopServices/ShopServiceSlice';
import adminStaticResourceSlice from '../features/adminStaticResources/AdminStaticResourceSlice';
import feedBackSlice from '../features/feedBacks/FeedBackSlice';
import packageSlice  from '../features/package/PackageSlice';
import chatSlice from '../features/chats/ChatSlice';
import notificationSlice from '../features/notifications/NotificationSlice';

export const store = configureStore({
    reducer: {
        account: userAccountSlice,
        category: categorySlice,
        shop: shopSlice,
        service: serviceSlice,
        adminStaticResource: adminStaticResourceSlice,
        feedback: feedBackSlice,
        package: packageSlice,
        chat: chatSlice,
        notification: notificationSlice,
    },
    // middleware: to remove the warning of serializableCheck
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false
          },
        ),
    });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
