import { create } from "@mui/material/styles/createTransitions"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import api from "../apiService"
export const fetchBook = createAsyncThunk(
	"books/fetchBooks",
	async ({ pageNum, limit, query }) => {
		try {
			let url = `/books?_page=${pageNum}&_limit=${limit}`
			if (query) url += `&q=${query}`
			const response = await api.get(url)
			return response.data
		} catch (error) {
			throw error
		}
	}
)

export const fetchBookDetail = createAsyncThunk(
	"books/fetchBookDetail",
	async (bookID) => {
		try {
			const response = await api.get(`/books/${bookID}`)
			return response.data
		} catch (error) {
			throw error
		}
	}
)

export const fetchFavoriteBooks = createAsyncThunk(
	"favoriteBooks/fetchFavoriteBooks",
	async () => {
		try {
			const response = await api.get(`/favorites`)
			return response.data
		} catch (error) {
			throw error
		}
	}
)

export const addFavoriteBook = createAsyncThunk(
	"favoriteBooks/addFavoriteBook",
	async (book) => {
		try {
			await api.post(`/favorites`, book)
		} catch (error) {
			throw error
		}
	}
)

export const removeFavoriteBook = createAsyncThunk(
	"favoriteBooks/removeFavoriteBook",
	async (removedBookId) => {
		try {
			await api.delete(`/favorites/${removedBookId}`)
			return removedBookId
		} catch (error) {
			throw error
		}
	}
)
// not done

const initialState = {
	books: [],
	favoriteBooks: { books: [], removedBookId: "" },
	bookDetail: [],
	loading: false,
	error: "",
}

const booksSlice = createSlice({
	name: "books",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchBook.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchBook.fulfilled, (state, action) => {
			state.loading = false
			state.books = action.payload
		})
		builder.addCase(fetchBook.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})

		builder.addCase(fetchFavoriteBooks.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchFavoriteBooks.fulfilled, (state, action) => {
			state.loading = false
			state.favoriteBooks.books = action.payload
		})
		builder.addCase(fetchFavoriteBooks.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})

		builder.addCase(fetchBookDetail.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchBookDetail.fulfilled, (state, action) => {
			state.loading = false
			state.bookDetail = action.payload
		})
		builder.addCase(fetchBookDetail.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})

		builder.addCase(removeFavoriteBook.pending, (state) => {
			state.loading = true
		})
		builder.addCase(removeFavoriteBook.fulfilled, (state) => {
			state.loading = false
			toast.success("The book has been removed")
		})
		builder.addCase(removeFavoriteBook.rejected, (state, action) => {
			state.loading = false
			toast.error(action.error.message)
		})

		builder.addCase(addFavoriteBook.pending, (state) => {
			state.loading = true
		})
		builder.addCase(addFavoriteBook.fulfilled, (state, action) => {
			state.loading = false
			toast.success("The book has been added to the reading list!")
		})
		builder.addCase(addFavoriteBook.rejected, (state, action) => {
			state.loading = false
			toast.error(action.error.message)
		})
	},
})

export const { getBooks } = booksSlice.actions
export const getAllBooks = (state) => state.books.books
export const getBookDetail = (state) => state.books.bookDetail
export const getFavoriteBooks = (state) => state.books.favoriteBooks.books
export const selectErrorMessage = (state) => state.books.error
export const selectIsLoading = (state) => state.books.loading

export default booksSlice.reducer
