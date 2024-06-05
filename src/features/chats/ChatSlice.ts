import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChatMessage from "../../interfaces/ChatMessage";
import {  getChatUser, getChatUserInbox, getChatUsers, getNewChatInbox, sendNewMessage, setChatAsReaded } from "../../services/chatService";
import ChatInbox from '../../interfaces/ChatInbox';

interface ChatSliceState {
    chatBarVisibility: boolean;
    chatInboxVisibility: boolean;
    loading: boolean;
    senderId: string;
    myChatInbox: ChatMessage[];
    myChatInboxs : ChatInbox[];
    error: string| null;
    }

const initialState: ChatSliceState = {
    chatBarVisibility: false,
    chatInboxVisibility: false,
    loading: false,
    senderId: "",
    myChatInbox: [],
    myChatInboxs: [],
    error: null,
};

export const chatSendMessage = createAsyncThunk<ChatMessage, any>(
    'chat/sendChatMessage',
    async (data, thunkAPI) => {
        try {
            const response = await sendNewMessage(data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Send message failed' });
            }
            // after send the message check if the receiver inbox is in the list of myChatInboxs
            // if it is update the last message and last message date
            // if not add it to the list
            const currentState = (thunkAPI.getState() as { chat: { myChatInboxs: ChatInbox[] } }).chat.myChatInboxs;
            const index = currentState.findIndex((cht) => cht.id === data.receiverId);
            if (index === -1) {
                thunkAPI.dispatch(chatGetUserInbox(data.receiverId));
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const chatGetUserInbox = createAsyncThunk<ChatInbox, string>(
    'chat/getChatUserInbox',
    async (id, thunkAPI) => {
        try {
            const response = await getChatUser(id);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all messages failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const chatGetUserInboxMessages = createAsyncThunk<ChatMessage[], string>(
    'chat/getChatUserInboxMessages',
    async (id, thunkAPI) => {
        try {
            const response = await getChatUserInbox(id);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all messages failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const chatGetUsersInboxs = createAsyncThunk<ChatInbox[], void>(
    'chat/getChatUsersInboxes',
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

export const chatSetChatAsReaded = createAsyncThunk<ChatInbox, string>(
    'chat/setChatAsReaded',
    async (id, thunkAPI) => {
        try {
            const response = await setChatAsReaded(id);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all messages failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const chatSetMarkAsReaded = createAsyncThunk<ChatInbox, string>(
    'chat/setMarkAsReaded',
    async (id, thunkAPI) => {
        try {
            const response = await setChatAsReaded(id);
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
        setChatBarVisibility: (state, action) => {
            state.chatBarVisibility = action.payload;
            if(!action.payload) {
               state.chatInboxVisibility= action.payload;
            state.senderId = "";
            state.myChatInbox = [];}
        },
        setChatInboxVisibility: (state, action) => {
            state.chatInboxVisibility = action.payload;
           if(!action.payload) {state.senderId = "";
            state.myChatInbox = [];}
        },
        setSenderId: (state, action) => {
            state.senderId = action.payload;
        },
        toggleUserActiveState: (state, action) => {
            state.myChatInboxs = state.myChatInboxs.map((cht) => {
                if (cht.id === action.payload) {
                    cht.isActive = !cht.isActive;
                }
                return cht;
            });
        },
        resetUserInbox: (state) => {
            state.senderId = "";
            state.myChatInbox = [];
        },
        pushNewMessage: (state, action) => {
            state.myChatInbox = [...state.myChatInbox, action.payload];
            state.myChatInboxs = state.myChatInboxs.map((cht) => {
                if (cht.id === action.payload.senderId) {
                    cht.lastMessage = action.payload.message;
                    cht.lastMessageDate = action.payload.date;
                }
                return cht;

            });
        }
    
    },
    extraReducers: (builder) => {
        builder.addCase(chatGetUsersInboxs.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(chatGetUsersInboxs.fulfilled, (state, action) => {
            state.loading = false;
            state.myChatInboxs = action.payload;
            // sort the list by last message date
            state.myChatInboxs.sort((a, b) => {
                const dateA = a.lastMessageDate ? new Date(a.lastMessageDate) : new Date();
                const dateB = b.lastMessageDate ? new Date(b.lastMessageDate) : new Date();
                return dateB.getTime() - dateA.getTime();
            });
            
        });
        builder.addCase(chatGetUsersInboxs.rejected, (state) => {
            state.loading = false;
            state.myChatInboxs=[];
        });
        builder.addCase(chatSendMessage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(chatSendMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.myChatInbox = [...state.myChatInbox, action.payload];
            state.myChatInboxs = state.myChatInboxs.map((cht) => {
                if (cht.id === action.payload.receiverId) {
                    cht.lastMessage = action.payload.message;
                    cht.lastMessageDate = action.payload.date;
                }
                return cht;
        });
        });
        builder.addCase(chatSendMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(chatGetUserInbox.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(chatGetUserInbox.fulfilled, (state, action) => {
            state.loading = false;
            // find the chat inbox and update it if it not exist add it
            const index = state.myChatInboxs.findIndex((cht) => cht.id === action.payload.id);
            if (index !== -1) {
                state.myChatInboxs[index] = action.payload;
                // sort the list by last message date
                state.myChatInboxs.sort((a, b) => {
                    const dateA = a.lastMessageDate ? new Date(a.lastMessageDate) : new Date();
                    const dateB = b.lastMessageDate ? new Date(b.lastMessageDate) : new Date();
                    return dateB.getTime() - dateA.getTime();
                });
            } else {
                state.myChatInboxs = [ action.payload, ...state.myChatInboxs];
            }
        });
        builder.addCase(chatGetUserInbox.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(chatGetUserInboxMessages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(chatGetUserInboxMessages.fulfilled, (state, action) => {
            state.loading = false;
            state.myChatInbox = action.payload;
        });
        builder.addCase(chatGetUserInboxMessages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.myChatInbox = [];
        });
        builder.addCase(chatSetChatAsReaded.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(chatSetChatAsReaded.fulfilled, (state, action) => {
            state.loading = false;
            state.myChatInboxs = state.myChatInboxs.map((cht) => {
                if (cht.id === action.payload.id) {
                    cht.unreadMessages = 0;
                }
                return cht;
            });
        });
        builder.addCase(chatSetChatAsReaded.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(chatSetMarkAsReaded.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(chatSetMarkAsReaded.fulfilled, (state, action) => {
            state.loading = false;
            // replacing the chat inbox with the updated one
            const index = state.myChatInboxs.findIndex((cht) => cht.id === action.payload.id);
            if (index !== -1) {
                state.myChatInboxs[index] = action.payload;
            }

        });
        builder.addCase(chatSetMarkAsReaded.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export const { setChatBarVisibility, setChatInboxVisibility, 
    setSenderId, toggleUserActiveState, resetUserInbox , pushNewMessage} = chatSlice.actions;
export default chatSlice.reducer;