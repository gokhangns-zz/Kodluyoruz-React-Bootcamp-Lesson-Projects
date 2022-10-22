import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Typography,
	Button,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import Layout from "../../components/layout";
import { config } from "../../config";
import { TabWrapper } from "./style";
import FavoriteButton from "../../components/favorite-button";
import { Api } from "../../render-props";

export default function () {
	const [page] = useState(1);
	const [itemsPerPage] = useState(12);
	const [selectedAlbumId, setSelectedAlbumId] = useState(1);

	return (
		<Layout>
			<Box
				sx={{
					bgcolor: "background.paper",
					pt: 8,
					// pb: 6,
				}}
			>
				<Container maxWidth="md">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="text.primary"
						gutterBottom
					>
						{config.applicationTitle}
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="text.secondary"
						paragraph
					>
						Something short and leading about the collection below—its contents,
						the creator, etc. Make it short and sweet, but not too short so
						folks don&apos;t simply skip over it entirely.
					</Typography>
					<Api
						path="/albums"
						loadingText="Albümler Yükleniyor..."
						render={({ data }) => (
							<TabWrapper>
								{data.map((album, index) => (
									<div
										key={index}
										style={{ marginRight: 10, whiteSpace: "nowrap" }}
									>
										<Button
											onClick={() => setSelectedAlbumId(album.id)}
											variant={
												selectedAlbumId === album.id ? "contained" : "outlined"
											}
										>
											{album.title}
										</Button>
									</div>
								))}
							</TabWrapper>
						)}
					/>
				</Container>
			</Box>
			<Container sx={{ py: 8 }} maxWidth="md">
				{/* End hero unit */}
				<Grid container spacing={4}>
					<Api
						path="/photos"
						paramaters={{}}
						loadingText="Fotoğraflar yükleniyor..."
						render={({ data }) => {
							return (
								<Fragment>
									{data
										.filter((x) => x.albumId === selectedAlbumId)
										.slice(page, page * itemsPerPage + 1)
										.map((item) => (
											<Grid item key={item.id} xs={12} sm={6} md={4}>
												<Card
													sx={{
														height: "100%",
														display: "flex",
														flexDirection: "column",
													}}
												>
													<CardMedia
														component="img"
														image={item.thumbnailUrl}
														alt="random"
													/>
													<CardContent sx={{ flexGrow: 1 }}>
														<Typography
															gutterBottom
															variant="h5"
															component="h2"
														>
															{item.title}
														</Typography>
													</CardContent>
													<CardActions>
														<FavoriteButton item={item} />
													</CardActions>
												</Card>
											</Grid>
										))}
								</Fragment>
							);
						}}
					/>
				</Grid>
			</Container>
		</Layout>
	);
}
