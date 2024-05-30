import { createSlice } from "@reduxjs/toolkit";
import ChatMessage from "../../interfaces/ChatMessage";

interface ChatSliceState {
    isVisibleChat: boolean;
    senderId: string;
    messages: ChatMessage[];
    }

const initialState: ChatSliceState = {
    isVisibleChat: false,
    senderId: "",
    messages: [],
};

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
            state.messages.push(action.payload);
        },
    },
});

export const { toggleChat, setSenderId, addMessage } = chatSlice.actions;
export default chatSlice.reducer;