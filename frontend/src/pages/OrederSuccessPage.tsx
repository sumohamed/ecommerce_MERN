import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrederSuccessPage = () => {
	const navigate = useNavigate();
	const handleHome = () => {
		navigate("/");
	};

	return (
		<Container
			fixed
			sx={{
				mt: 2,
				display: "flex",
				flexDirection: "column",
				gap: 2,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CheckCircleOutline sx={{ color: "green", fontSize: "80px" }} />
			<Typography variant="h4">Thanks for your order.</Typography>
			<Typography>
				Thanks for your order. we started processing it, and we will get
				back to you soon
			</Typography>

			<Button variant="contained" onClick={handleHome}>
				Back to Home
			</Button>
		</Container>
	);
};

export default OrederSuccessPage;
