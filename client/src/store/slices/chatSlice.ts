import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { API_BASE } from '../../config/api';
import type { ChatMessage, ChatPackage, ChatState } from '../../types/chat';

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'msg-welcome',
  sender: 'assistant',
  text: 'Welcome to Endlesscape. I am Aura, your Senior Bespoke Travel Concierge.\n\nWhether you desire private palace suites in Rajasthan, starlit desert camps in Morocco, or secluded yacht charters along the Amalfi Coast, I am here to guide you through our rarefied world of travel.\n\nHow may I inspire your next bespoke expedition today?',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestedQuestions: [
    'What packages do you have in Italy & Amalfi?',
    'Best destinations for honeymoon in October',
    'Do you have safari expeditions in Africa?',
    'What is the price of the Japan expedition?'
  ]
};

const initialState: ChatState = {
  isOpen: false,
  isMinimized: false,
  messages: [INITIAL_WELCOME_MESSAGE],
  isLoading: false,
  error: null,
  activeSuggestions: INITIAL_WELCOME_MESSAGE.suggestedQuestions || [],
  hasUnread: false,
};

interface SendMessageResponse {
  success: boolean;
  reply: string;
  relevantPackages: ChatPackage[];
  suggestedQuestions: string[];
}

export const sendChatMessage = createAsyncThunk<
  SendMessageResponse,
  string,
  { state: { chat: ChatState } }
>('chat/sendChatMessage', async (messageText, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const history = state.chat.messages.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: messageText,
        history
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data: SendMessageResponse = await response.json();
    return data;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to consult travel concierge';
    return rejectWithValue(errorMsg);
  }
});

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
      if (state.isOpen) {
        state.isMinimized = false;
        state.hasUnread = false;
      }
    },
    openChat: (state) => {
      state.isOpen = true;
      state.isMinimized = false;
      state.hasUnread = false;
    },
    closeChat: (state) => {
      state.isOpen = false;
      state.isMinimized = false;
    },
    minimizeChat: (state) => {
      state.isMinimized = !state.isMinimized;
    },
    markAsRead: (state) => {
      state.hasUnread = false;
    },
    clearChat: (state) => {
      state.messages = [INITIAL_WELCOME_MESSAGE];
      state.activeSuggestions = INITIAL_WELCOME_MESSAGE.suggestedQuestions || [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatMessage.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        // Append user message immediately
        state.messages.push({
          id: `msg-user-${Date.now()}`,
          sender: 'user',
          text: action.meta.arg,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      })
      .addCase(sendChatMessage.fulfilled, (state, action: PayloadAction<SendMessageResponse>) => {
        state.isLoading = false;
        const { reply, relevantPackages, suggestedQuestions } = action.payload;

        state.messages.push({
          id: `msg-aura-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          relevantPackages: relevantPackages || [],
          suggestedQuestions: suggestedQuestions || [],
        });

        if (suggestedQuestions && suggestedQuestions.length > 0) {
          state.activeSuggestions = suggestedQuestions;
        }

        if (!state.isOpen) {
          state.hasUnread = true;
        }
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Unable to reach the concierge';

        // Provide refined fallback assistant response rather than a dead-end error
        state.messages.push({
          id: `msg-aura-fallback-${Date.now()}`,
          sender: 'assistant',
          text: 'I apologize for the brief pause. At Endlesscape, every journey is 100% tailor-made by our private curators. Please let me know your preferred dates and destination, or you may use our bespoke trip planner to submit your desires directly.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          error: true,
          suggestedQuestions: [
            'What packages do you have in Italy & Amalfi?',
            'What is the price of the Rajasthan expedition?',
            'How can I speak to a private travel curator?'
          ]
        });
      });
  },
});

export const {
  toggleChat,
  openChat,
  closeChat,
  minimizeChat,
  markAsRead,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
