import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FeedBack from "../../interfaces/FeedBack";
import { createFeedback, deleteFeedback, getAllFeedbacks } from "../../services/FeedBackService";

interface FeedBackState {
    feedBacks: FeedBack[],
    loading: boolean,
    error: string |null,
};

const initialState: FeedBackState = {
    feedBacks: [],
    loading: false,
    error: null,
};

export const feedBackCreate = createAsyncThunk<FeedBack, FormData>(
    'feedback/create',
    async (data, thunkAPI) => {
        try {
            const response = await createFeedback(data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Registration failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const feedBackGetAll = createAsyncThunk<FeedBack[], void>(
    'feedback/getAllFeedbacks',
    async (_, thunkAPI) => {
        try {
            const response = await getAllFeedbacks();
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all users failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);  

export const feedBackDelete = createAsyncThunk<void, number>(
    'feedback/delete',
    async (id, thunkAPI) => {
        try {
            await deleteFeedback(id);
            return;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const feedBackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(feedBackCreate.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(feedBackCreate.fulfilled, (state, action) => {
                state.loading = false;
                state.feedBacks.push(action.payload);
            })
            .addCase(feedBackCreate.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { error: string })?.error || 'Failed to create feedback';
            })
            .addCase(feedBackGetAll.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(feedBackGetAll.fulfilled, (state, action) => {
                state.loading = false;
                state.feedBacks = action.payload;
            })
            .addCase(feedBackGetAll.rejected, (state, action) => {
                state.loading = false;
                state.error =  (action.payload as { error: string })?.error || 'Failed to fetch feedbacks';
            })
            .addCase(feedBackDelete.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(feedBackDelete.fulfilled, (state, action) => {
                state.loading = false;
                state.feedBacks = state.feedBacks.filter(feedback => feedback.id !== action.meta.arg);
            })
            .addCase(feedBackDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { error: string })?.error || 'Failed to delete feedback';
            });
    }
});

export default feedBackSlice.reducer;