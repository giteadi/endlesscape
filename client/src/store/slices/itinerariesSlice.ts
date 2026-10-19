import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { ITINERARIES } from '../../data/travelData';
import { API_BASE } from '../../config/api';
import type { Itinerary } from '../../types/travel';

interface ItinerariesState {
  items: Itinerary[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ItinerariesState = {
  items: ITINERARIES,
  status: 'idle',
  error: null,
};

export const fetchItineraries = createAsyncThunk<Itinerary[]>(
  'itineraries/fetchItineraries',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/itineraries?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
      return ITINERARIES;
    } catch {
      return rejectWithValue('Backend API unreachable, using cached itineraries');
    }
  }
);

export const itinerariesSlice = createSlice({
  name: 'itineraries',
  initialState,
  reducers: {
    setItineraries: (state, action: PayloadAction<Itinerary[]>) => {
      state.items = action.payload;
    },
    updateItineraryInStore: (state, action: PayloadAction<Itinerary>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      } else {
        state.items.unshift(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItineraries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItineraries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItineraries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to fetch itineraries';
      });
  },
});

export const { setItineraries, updateItineraryInStore } = itinerariesSlice.actions;
export default itinerariesSlice.reducer;
