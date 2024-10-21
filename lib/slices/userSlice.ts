import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  hotelName: string | null;
  isAuthenticated: boolean;
  isMaster: boolean;
  qrCode: string | null;
  affiliateLink: string | null;
  pendingCollaborators: Array<{id: string, name: string, email: string}>;
  newMessages: number;
  selectedPlan: string | null;
  roomCount: number;
}

const initialState: UserState = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  hotelName: null,
  isAuthenticated: false,
  isMaster: false,
  qrCode: null,
  affiliateLink: null,
  pendingCollaborators: [],
  newMessages: 0,
  selectedPlan: null,
  roomCount: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload, isAuthenticated: true };
    },
    setMasterUser: (state, action: PayloadAction<{ qrCode: string, affiliateLink: string }>) => {
      state.isMaster = true;
      state.qrCode = action.payload.qrCode;
      state.affiliateLink = action.payload.affiliateLink;
    },
    addPendingCollaborator: (state, action: PayloadAction<{id: string, name: string, email: string}>) => {
      state.pendingCollaborators.push(action.payload);
    },
    removePendingCollaborator: (state, action: PayloadAction<string>) => {
      state.pendingCollaborators = state.pendingCollaborators.filter(c => c.id !== action.payload);
    },
    setNewMessages: (state, action: PayloadAction<number>) => {
      state.newMessages = action.payload;
    },
    setSelectedPlan: (state, action: PayloadAction<string>) => {
      state.selectedPlan = action.payload;
    },
    setRoomCount: (state, action: PayloadAction<number>) => {
      state.roomCount = action.payload;
    },
    clearUser: () => initialState,
  },
});

export const {
  setUser,
  setMasterUser,
  addPendingCollaborator,
  removePendingCollaborator,
  setNewMessages,
  setSelectedPlan,
  setRoomCount,
  clearUser
} = userSlice.actions;
export default userSlice.reducer;