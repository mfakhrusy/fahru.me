import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type GuestbookEntry = {
  name: string;
  message: string;
  website?: string;
  verified: boolean;
  deleted: boolean;
  created_at: string;
  id: number;
};

type GuestbookState = {
  guestbookEntries: GuestbookEntry[];
  loading: boolean;
  error: string | null;
};

// Async thunk to fetch guestbook entries
export const fetchGuestbook = createAsyncThunk(
  "guestbook/fetchGuestbook",
  async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/guestbook/list`
    );
    if (!response.ok) throw new Error("Failed to fetch guestbook data");
    const data = await response.json();

    return data as GuestbookEntry[];
  }
);

const guestbookSlice = createSlice({
  name: "guestbook",
  initialState: {
    guestbookEntries: [],
    loading: false,
    error: null,
  } as GuestbookState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuestbook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuestbook.fulfilled, (state, action) => {
        state.loading = false;
        state.guestbookEntries = action.payload;
      })
      .addCase(fetchGuestbook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export default guestbookSlice.reducer;
