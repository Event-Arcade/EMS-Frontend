import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from '../../interfaces/User';
import { login, register, getCurrentUserByToken, update, getAccounts } from '../../services/authService';


interface UserAccountState {
    loading : boolean;
    user: User | null;
    users: User[]| null;
    isLoggedIn: boolean;
    error: string | null;
}

const initialState: UserAccountState = {
    loading: false,
    user:null,
    users: null,
    isLoggedIn: false,
    error: null
}

export const signupUser = createAsyncThunk<void, FormData>(
    'useraccount/signupUser',
    async (data, thunkAPI) => {
        try {
            const response = await register(data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Registration failed' });
            }
            thunkAPI.dispatch(setLoggedIn(true));
            thunkAPI.dispatch(getCurrentUser());
            return;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const loginUser = createAsyncThunk<void, FormData>(
    'useraccount/loginUser',
    async (data, thunkAPI) => {
        try {
            const response = await login(data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Login failed' });
            }
            thunkAPI.dispatch(setLoggedIn(true));
            thunkAPI.dispatch(getCurrentUser());
            return;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const getCurrentUser = createAsyncThunk<User| null>(
    'useraccount/getCurrentUser',
    async (_, thunkAPI) => {
        try {
            const response: User| null = await getCurrentUserByToken(); // Await the getCurrentUser() function
            if (response == null) {
                return thunkAPI.rejectWithValue({ error: 'User not found' });
            }
            return response; // Return the response value
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const updateUser = createAsyncThunk<User, FormData>(
    'useraccount/updateUser',
    async (data, thunkAPI) => {
        try {
            const response = await update(data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Update failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const getAllUsers = createAsyncThunk<User[], void>(
    'useraccount/getAllUsers',
    async (_, thunkAPI) => {
        try {
            const response = await getAccounts();
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all users failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

const userAccountSlice = createSlice({
    name: 'useraccount',
    initialState,
    reducers: {
        setLoggedIn : (state, action) =>{
            state.isLoggedIn = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signupUser.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.user = null;
            state.isLoggedIn = false;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(getCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.user = null;
            state.isLoggedIn = false;
        });
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.users = null;
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export const { setLoggedIn, setUser, setLogout } = userAccountSlice.actions;
export default userAccountSlice.reducer;