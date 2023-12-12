import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import ReactPlayer from "react-player/lazy";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/HighlightOff";

interface FadeProps {
	children: React.ReactElement;
	in?: boolean;
	onClick?: any;
	onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
	onExited?: (node: HTMLElement, isAppearing: boolean) => void;
	ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
	props,
	ref
) {
	const {
		children,
		in: open,
		onClick,
		onEnter,
		onExited,
		ownerState,
		...other
	} = props;
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		onStart: () => {
			if (open && onEnter) {
				onEnter(null as any, true);
			}
		},
		onRest: () => {
			if (!open && onExited) {
				onExited(null as any, true);
			}
		},
	});

	return (
		<animated.div ref={ref} style={style} {...other}>
			{React.cloneElement(children, { onClick })}
		</animated.div>
	);
});

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	boxShadow: 24,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	p: 4,
};

const AppModal = ({
	open,
	handleClose,
	url,
}: {
	open: boolean;
	handleClose: VoidFunction;
	url: string;
}) => {
	return (
		<Modal
			aria-labelledby="spring-modal-title"
			aria-describedby="spring-modal-description"
			open={open}
			onClose={handleClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					TransitionComponent: Fade,
				},
			}}
		>
			<Fade in={open}>
				<Box sx={style}>
					<Box
						width="100%"
						display="flex"
						alignItems="center"
						justifyContent="flex-end"
						mb={4}
					>
						<IconButton size="small" onClick={handleClose}>
							<CloseIcon fontSize="large" />
						</IconButton>
					</Box>
					<ReactPlayer url={url} />
					<Typography id="spring-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor
						ligula.
					</Typography>
				</Box>
			</Fade>
		</Modal>
	);
};

export default AppModal;
