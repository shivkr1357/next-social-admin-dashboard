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
      setEvents: (state, action: PayloadAction<EventData[]>) => {
         state.events = action.payload; // Replace existing events with new data
      },
      appendEvents: (state, action: PayloadAction<EventData[]>) => {
         state.events = [...state.events, ...action.payload]; // Append new events
      },
   },
});

export const eventsReducer = eventsSlice.reducer;
export const eventsActions = eventsSlice.actions;
