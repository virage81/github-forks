import { configureStore } from "@reduxjs/toolkit";
import resultReducer from "./resultSlice";
import loadingReducer from "./loadingSlice";

export const store = configureStore({
	reducer: {
		result: resultReducer,
		loading: loadingReducer,
	},
});
