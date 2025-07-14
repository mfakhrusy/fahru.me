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

type LocalGuestbookEntry = {
  name: string;
  message: string;
  website?: string;
};

type GuestbookState = {
  guestbookEntries: GuestbookEntry[];
  loading: boolean;
  error: string | null;
  pendingGuestbookEntrySubmission: LocalGuestbookEntry | null;
};

type ActionSetupPendingGuestbookEntrySubmission = {
  type: "guestbook/setupPendingGuestbookEntrySubmission";
  payload: LocalGuestbookEntry;
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
    pendingGuestbookEntrySubmission: null,
  } as GuestbookState,
  reducers: {
    getPendingGuestbookEntrySubmission: (state) => {
      const localStorageData = localStorage.getItem("guestbookForm");
      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        state.pendingGuestbookEntrySubmission = {
          name: parsedData.name || "",
          message: parsedData.message || "",
          website: parsedData.website || null,
        };
      }
    },
    setPendingGuestbookEntrySubmission: (
      state,
      action: ActionSetupPendingGuestbookEntrySubmission
    ) => {
      localStorage.setItem(
        "guestbookForm",
        JSON.stringify({
          name: action.payload.name,
          message: action.payload.message,
          website: action.payload.website || "",
        })
      );
      state.pendingGuestbookEntrySubmission = action.payload;
    },
    removePendingGuestbookEntrySubmission: (state) => {
      localStorage.removeItem("guestbookForm");
      state.pendingGuestbookEntrySubmission = null;
    },
  },
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

export const {
  getPendingGuestbookEntrySubmission,
  setPendingGuestbookEntrySubmission,
  removePendingGuestbookEntrySubmission,
} = guestbookSlice.actions;

export default guestbookSlice.reducer;
