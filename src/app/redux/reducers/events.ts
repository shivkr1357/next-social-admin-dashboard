import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventData } from "@/types/types";

export interface IEventsState {
  events: EventData[];
}

const initialState: IEventsState = {
  events: [],
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setAllEvents: (state, action: PayloadAction<EventData[]>) => {
      state.events = action.payload;
    },
  },
});

export const eventsReducer = eventsSlice.reducer;
export const eventsActions = eventsSlice.actions;
