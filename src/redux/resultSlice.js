import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	result: [],
};

export const resultSlice = createSlice({
	name: "result",
	initialState,
	reducers: {
		init(state, action) {
			state.result = action.payload;
		},
	},
});

export const { init } = resultSlice.actions;

export default resultSlice.reducer;
