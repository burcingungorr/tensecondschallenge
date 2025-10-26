import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  uid: string;
  email: string;
  displayName: string;
  avatarUrl?: string | null; 
}

const initialState: UserState = {
  uid: '',
  email: '',
  displayName: '',
  avatarUrl: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.avatarUrl = action.payload.avatarUrl || null;
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => {
      state.uid = '';
      state.email = '';
      state.displayName = '';
      state.avatarUrl = null;
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;