import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import booksReducer from "../reducer/booksSlice"
const store = configureStore({
	reducer: {
		books: booksReducer,
	},
	// middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk],
})

export default store
