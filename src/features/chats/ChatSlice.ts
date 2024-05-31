import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChatMessage from "../../interfaces/ChatMessage";
import { getChatMessages, getChatUsers, getUnreadMessages, sendNewMessage } from "../../services/chatService";

interface ChatSliceState {
    isVisibleChat: boolean;
    loading: boolean;
    senderId: string;
    myMessages: ChatMessage[];
    myUnReadMessages: ChatMessage[];
    myChatUsersIds : string[];
    }

const initialState: ChatSliceState = {
    isVisibleChat: false,
    loading: false,
    senderId: "",
    myMessages: [],
    myUnReadMessages: [],
    myChatUsersIds: []
};

export const sendChatMessage = createAsyncThunk<ChatMessage, any>(
    'chat/sendChatMessage',
    async (data, thunkAPI) => {
        try {
            const response = await sendNewMessage(data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Send message failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const getAllChatMessages = createAsyncThunk<ChatMessage[], void>(
    'chat/getAllChatMessages',
    async (_, thunkAPI) => {
        try {
            const response = await getChatMessages();
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all messages failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const getAllUnReadChatMessages = createAsyncThunk<ChatMessage[], void>(
    'chat/getUnReadChatMessages',
    async (_, thunkAPI) => {
        try {
            const response = await getUnreadMessages();
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all messages failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const getChatUsersIds = createAsyncThunk<string[], void>(
    'chat/getChatUsersIds',
    async (_, thunkAPI) => {
        try {
            const response = await getChatUsers();
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all messages failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        toggleChat: (state, action) => {
            state.isVisibleChat = action.payload;
        },
        setSenderId: (state, action) => {
            state.senderId = action.payload;
        },
        addMessage: (state, action) => {
            state.myMessages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendChatMessage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(sendChatMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.myMessages.push(action.payload);
        });
        builder.addCase(sendChatMessage.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(getAllChatMessages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllChatMessages.fulfilled, (state, action) => {
            state.loading = false;
            state.myMessages = action.payload;
        });
        builder.addCase(getAllChatMessages.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(getAllUnReadChatMessages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllUnReadChatMessages.fulfilled, (state, action) => {
            state.loading = false;
            state.myUnReadMessages = action.payload;
        });
        builder.addCase(getAllUnReadChatMessages.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(getChatUsersIds.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getChatUsersIds.fulfilled, (state, action) => {
            state.loading = false;
            state.myChatUsersIds = action.payload;
        });
        builder.addCase(getChatUsersIds.rejected, (state) => {
            state.loading = false;
            state.myChatUsersIds=[];
        });
    }
});

export const { toggleChat, setSenderId, addMessage } = chatSlice.actions;
export default chatSlice.reducer;