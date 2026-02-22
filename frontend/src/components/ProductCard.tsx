import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const img_url = import.meta.env.VITE_IMAGE_URL;

interface Props {
	// id: string;
	title: string;
	image: string;
	price: number;
}

const ProductCard = ({ title, image, price }: Props) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				sx={{ height: 240 }}
				image={`${img_url}${image}`}
				title={title}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					{price} EGP
				</Typography>
			</CardContent>
			<CardActions>
				<Button variant="contained" size="small">
					Add to cart
				</Button>
			</CardActions>
		</Card>
	);
};

export default ProductCard;
