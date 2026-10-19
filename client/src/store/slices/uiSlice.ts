import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Itinerary, TravelStyle } from '../../types/travel';

export type PageState = 'home' | 'itinerary' | 'experience' | 'admin';

interface UIState {
  pageState: PageState;
  selectedItinerary: Itinerary | null;
  categoryTitle: string;
  categorySubtitle: string;
  selectedMonth: string | undefined;

  // Modals
  plannerOpen: boolean;
  plannerFeeling: string;
  previewModalItinerary: Itinerary | null;
  videoOpen: boolean;
  destinationsOpen: boolean;
  searchInitialQuery: string;
}

const initialState: UIState = {
  pageState: 'home',
  selectedItinerary: null,
  categoryTitle: 'LUXURY HONEYMOONS',
  categorySubtitle:
    'Your honeymoon should be as unique as you are. Use these suggested honeymoon itineraries as a prompt and get in touch to plan something that’s truly yours.',
  selectedMonth: undefined,

  plannerOpen: false,
  plannerFeeling: '',
  previewModalItinerary: null,
  videoOpen: false,
  destinationsOpen: false,
  searchInitialQuery: '',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setPageState: (state, action: PayloadAction<PageState>) => {
      state.pageState = action.payload;
    },
    navigateHome: (state) => {
      state.pageState = 'home';
    },
    openPlanner: (state, action: PayloadAction<string | undefined>) => {
      state.plannerFeeling = action.payload || '';
      state.plannerOpen = true;
    },
    closePlanner: (state) => {
      state.plannerOpen = false;
      state.plannerFeeling = '';
    },
    openSearch: (state, action: PayloadAction<string | undefined>) => {
      state.searchInitialQuery = action.payload || '';
      state.destinationsOpen = true;
    },
    closeSearch: (state) => {
      state.destinationsOpen = false;
      state.searchInitialQuery = '';
    },
    openVideoModal: (state) => {
      state.videoOpen = true;
    },
    closeVideoModal: (state) => {
      state.videoOpen = false;
    },
    openPreviewModal: (state, action: PayloadAction<Itinerary>) => {
      state.previewModalItinerary = action.payload;
    },
    closePreviewModal: (state) => {
      state.previewModalItinerary = null;
    },
    selectItineraryDetail: (state, action: PayloadAction<Itinerary>) => {
      state.selectedItinerary = action.payload;
      state.pageState = 'itinerary';
    },
    selectExperienceStyle: (state, action: PayloadAction<TravelStyle>) => {
      const style = action.payload;
      state.categoryTitle =
        style.id === 'honeymoon' ? 'LUXURY HONEYMOONS' : `LUXURY ${style.title} ADVENTURES`;
      state.categorySubtitle =
        style.focus ||
        `Each and every ${style.title} trip is tailored exactly to who you are and what you want to do.`;
      state.selectedMonth = undefined;
      state.pageState = 'experience';
    },
    selectExperienceMonth: (state, action: PayloadAction<string>) => {
      state.categoryTitle = 'LUXURY HONEYMOONS';
      state.selectedMonth = action.payload;
      state.pageState = 'experience';
    },
  },
});

export const {
  setPageState,
  navigateHome,
  openPlanner,
  closePlanner,
  openSearch,
  closeSearch,
  openVideoModal,
  closeVideoModal,
  openPreviewModal,
  closePreviewModal,
  selectItineraryDetail,
  selectExperienceStyle,
  selectExperienceMonth,
} = uiSlice.actions;

export default uiSlice.reducer;
