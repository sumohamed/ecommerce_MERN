import { Container, Grid, Box } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { api_url } from "../constants/api_url";

const HomePage = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [err, setErr] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${api_url}/products`);
				const data = await response.json();
				setProducts(data);
			} catch {
				setErr(true);
			}
		};
		fetchData();
	}, []);

	if (err) {
		return <Box>Something went wrong please try again</Box>;
	}

	return (
		<Container sx={{ mt: 2 }}>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{products.map((p) => (
					<Grid size={4} key={p._id}>
						<ProductCard {...p} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default HomePage;
