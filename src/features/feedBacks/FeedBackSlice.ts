import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FeedBack from "../../interfaces/FeedBack";
import { createFeedback, deleteFeedback, getAllFeedbacks, getFeedbackById } from "../../services/FeedBackService";

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

export const feedBackDelete = createAsyncThunk<number, number>(
    'feedback/delete',
    async (id, thunkAPI) => {
        try {
           const response = await deleteFeedback(id);
           if(response){
            return id;
           }else{
            return thunkAPI.rejectWithValue({ error: 'Error occured!' });
           }
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const feedBackGetById = createAsyncThunk<FeedBack, number>(
    'feedback/getById',
    async (id, thunkAPI) => {
        try {
            const response = await getFeedbackById(id);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all users failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const feedBackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        feedBackRemoveEntity: (state, action) => {
            state.feedBacks = state.feedBacks.filter(feedback => feedback.id != action.payload);
        }
    },
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
                state.feedBacks = state.feedBacks.filter(feedback => feedback.id !== action.payload);
            })
            .addCase(feedBackDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { error: string })?.error || 'Failed to delete feedback';
            })
            .addCase(feedBackGetById.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(feedBackGetById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.feedBacks.findIndex(feedback => feedback.id === action.payload.id);
                if (index !== -1) {
                    state.feedBacks[index] = action.payload;
                }else{
                    state.feedBacks.push(action.payload);
                }
            })
            .addCase(feedBackGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { error: string })?.error || 'Failed to fetch feedback';
            });
    }
});

export const { feedBackRemoveEntity } = feedBackSlice.actions;
export default feedBackSlice.reducer;