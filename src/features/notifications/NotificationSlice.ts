import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Notification from "../../interfaces/Notification";
import { getUnreadedNotifications, setNotificationMarkAsRead } from "../../services/notificationService";

interface NotificationState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
    }

const initialState: NotificationState = {
    notifications: [],
    loading: false,
    error: null
}

export const notificationGetAll = createAsyncThunk<Notification[], void>(
    'notification/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await getUnreadedNotifications();
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all notifications failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const notificationSetMarkAsRead = createAsyncThunk<any, number>(
    'notification/setMarkAsRead',
    async (id, thunkAPI) => {
        try {
            const response = await setNotificationMarkAsRead(id);
            if(response){
                return id;
            }
            return thunkAPI.rejectWithValue({ error: 'Mark as read failed' });
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNewNotification: (state, action) => {
            state.notifications.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(notificationGetAll.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(notificationGetAll.fulfilled, (state, action) => {
                state.notifications = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(notificationGetAll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(notificationSetMarkAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(notificationSetMarkAsRead.fulfilled, (state, action) => {
                // remove the notification from the list
                state.notifications = state.notifications.filter(n => n.id !== action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(notificationSetMarkAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { addNewNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
