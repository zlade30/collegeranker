import {
	AppBar,
	Box,
	Button,
	CircularProgress,
	Grid,
	IconButton,
	Popover,
	Toolbar,
	Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import AppModal from "../components/AppModal";
import AppTable from "../components/AppTable";

type University = {
	name: string;
	content: string;
	video: string;
};

function CollegeView() {
	const [universities, setUniversities] = useState<University[]>([]);
	const [currentUniversity, setCurrentUniversity] = useState<University>();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [showModal, setShowModal] = useState(false);
	const handleShowOpen = () => setShowModal(true);
	const handleShowClose = () => setShowModal(false);

	const limit = 5;
	const gradeData = [
		{ grade: "A", value: "90-100" },
		{ grade: "B", value: "80-89" },
		{ grade: "C", value: "70-79" },
		{ grade: "D", value: "60-69" },
		{ grade: "F", value: "0-59" },
	];
	const grade: any = {
		Diversity: {
			data: gradeData,
		},
		Value: {
			data: gradeData,
		},
		Outcome: {
			data: gradeData,
		},
	};
	const videos = [
		"https://www.youtube.com/watch?v=APWy6Pc83gE",
		"https://www.youtube.com/watch?v=SqcY0GlETPk",
		"https://www.youtube.com/watch?v=S2GfjaTbJa4",
		"https://www.youtube.com/watch?v=o06MyVhYte4",
		"https://www.youtube.com/watch?v=89cGQjB5R4M",
	];

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const loadLorems = async () => {
		const numberOfRequests = limit; // Set the number of times you want to make the request
		const fetchPromises = Array.from(
			{ length: numberOfRequests },
			async () => {
				const loremRequest = await fetch(
					"https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=4"
				);

				// Assuming you want to return the JSON data from each request
				return loremRequest.json();
			}
		);

		try {
			const results = await Promise.all(fetchPromises);
			return results;
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const loadUniversities = async () => {
		const lorems = await loadLorems();
		const universityRequest = await fetch(
			`http://universities.hipolabs.com/search?country=United States&limit=${limit}`
		);
		const universities = await universityRequest.json();
		const data = universities.map((item: University, index: number) => ({
			name: item.name,
			content: lorems![index],
			video: videos[index],
		}));
		setUniversities(data);
		setCurrentUniversity(data[0]);
	};

	useEffect(() => {
		loadUniversities();
	}, []);

	return (
		<Fragment>
			{universities.length === 0 ? (
				<Box
					sx={{ display: "flex", width: "100%", height: "100vh" }}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<CircularProgress />
				</Box>
			) : (
				<Box>
					<AppBar position="sticky">
						<Toolbar>
							{universities.map((item) => (
								<Button
									key={item.name}
									variant="text"
									style={{
										color: "white",
										marginLeft: 10,
										marginRight: 10,
										backgroundColor:
											item === currentUniversity
												? "#0d365f"
												: "",
									}}
									onClick={() => setCurrentUniversity(item)}
								>
									{item.name}
								</Button>
							))}
						</Toolbar>
					</AppBar>
					<Box
						display="flex"
						alignItems="center"
						flexDirection="column"
					>
						<Box padding={5}>
							<Grid container columns={16} spacing={2} py={4}>
								<Grid xs={8} px={2}>
									<Typography variant="h4">
										{currentUniversity?.name}
									</Typography>
								</Grid>
								<Grid xs={8} px={2}>
									<Typography variant="h4" textAlign="center">
										Category Grade Range
									</Typography>
								</Grid>
							</Grid>
							<Grid container columns={16} spacing={2} py={4}>
								<Grid xs={8} px={2}>
									<Typography
										variant="body1"
										gutterBottom
										textAlign="justify"
										lineHeight={2}
									>
										{currentUniversity?.content}
									</Typography>
								</Grid>
								<Grid
									xs={8}
									px={2}
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<AppTable grade={grade} />
								</Grid>
							</Grid>
						</Box>
						<Box
							display="flex"
							alignItems="start"
							width="100%"
							p={5}
						>
							<IconButton
								size="small"
								aria-owns={
									open ? "mouse-over-popover" : undefined
								}
								aria-haspopup="true"
								onMouseEnter={(evt) => handlePopoverOpen(evt)}
								onMouseLeave={() => handlePopoverClose()}
								style={{ marginLeft: 20 }}
								onClick={handleShowOpen}
							>
								<HelpIcon fontSize="large" />
							</IconButton>
							<Popover
								id="mouse-over-popover"
								sx={{
									pointerEvents: "none",
								}}
								open={open}
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								onClose={handlePopoverClose}
								disableRestoreFocus
							>
								<Typography sx={{ p: 1 }}>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Sic enim maiores nostri
									labores non fugiendos tristissimo tamen
									verbo aerumnas etiam in deo nominaverunt.
								</Typography>
							</Popover>
							<AppModal
								url={currentUniversity?.video!}
								open={showModal}
								handleClose={handleShowClose}
							/>
						</Box>
					</Box>
				</Box>
			)}
		</Fragment>
	);
}

export default CollegeView;
