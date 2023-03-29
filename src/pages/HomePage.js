import React, { useState, useEffect } from "react"
import { ClipLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import PaginationBar from "../components/PaginationBar"
import SearchForm from "../components/SearchForm"
import api from "../apiService"
import { FormProvider } from "../form"
import { useForm } from "react-hook-form"
import {
	Container,
	Alert,
	Box,
	Card,
	Stack,
	CardMedia,
	CardActionArea,
	Typography,
	CardContent,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {
	fetchBook,
	getAllBooks,
	selectErrorMessage,
	selectIsLoading,
} from "../reducer/booksSlice"

const BACKEND_API = process.env.REACT_APP_BACKEND_API

const HomePage = () => {
	const books = useSelector(getAllBooks)
	const loading = useSelector(selectIsLoading)
	const errorMessage = useSelector(selectErrorMessage)
	const dispatch = useDispatch()
	const [pageNum, setPageNum] = useState(1)
	const totalPage = 10
	const limit = 10
	const [query, setQuery] = useState("")
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(fetchBook({ pageNum, limit, query }))
	}, [dispatch, pageNum, limit, query])
	console.log(loading)

	const handleClickBook = (bookId) => {
		navigate(`/books/${bookId}`)
	}

	//--------------form
	const defaultValues = {
		searchQuery: "",
	}
	const methods = useForm({
		defaultValues,
	})
	const { handleSubmit } = methods
	const onSubmit = (data) => {
		setQuery(data.searchQuery)
	}
	return (
		<Container>
			<Stack sx={{ display: "flex", alignItems: "center", m: "2rem" }}>
				<Typography variant="h3" sx={{ textAlign: "center" }}>
					Book Store
				</Typography>
				{errorMessage && <Alert severity="danger">{errorMessage}</Alert>}
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Stack
						spacing={2}
						direction={{ xs: "column", sm: "row" }}
						alignItems={{ sm: "center" }}
						justifyContent="space-between"
						mb={2}
					>
						<SearchForm />
					</Stack>
				</FormProvider>
				<PaginationBar
					pageNum={pageNum}
					setPageNum={setPageNum}
					totalPageNum={totalPage}
				/>
			</Stack>
			<div>
				{loading ? (
					<Box sx={{ textAlign: "center", color: "primary.main" }}>
						<ClipLoader color="inherit" size={150} loading={true} />
					</Box>
				) : (
					<Stack
						direction="row"
						spacing={2}
						justifyContent="space-around"
						flexWrap="wrap"
					>
						{books.map((book) => (
							<Card
								key={book.id}
								onClick={() => handleClickBook(book.id)}
								sx={{
									width: "12rem",
									height: "27rem",
									marginBottom: "2rem",
								}}
							>
								<CardActionArea>
									<CardMedia
										component="img"
										image={`${BACKEND_API}/${book.imageLink}`}
										alt={`${book.title}`}
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											{`${book.title}`}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						))}
					</Stack>
				)}
			</div>
		</Container>
	)
}

export default HomePage
