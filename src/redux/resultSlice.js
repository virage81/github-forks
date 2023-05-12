import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	result: [],
};

export const resultSlice = createSlice({
	name: "result",
	initialState,
	reducers: {
		add(state, action) {
			state.result = action.payload;
		},
	},
});

export const { add } = resultSlice.actions;

export default resultSlice.reducer;
