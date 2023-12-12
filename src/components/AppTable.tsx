import styled from "@emotion/styled";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	tableCellClasses,
} from "@mui/material";
import { Fragment } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "black",
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: "#b2cee9",
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

interface GradeData {
	grade: string;
	value: number;
}

interface Grade {
	Diversity: {
		data: GradeData;
	};
	Value: {
		data: GradeData;
	};
	Outcome: {
		data: GradeData;
	};
}

const AppTable = ({ grade }: { grade: Grade }) => {
	return (
		<Table size="small" sx={{ width: 700 }} aria-label="customized table">
			<TableBody>
				{Object.entries(grade).map(([key, value]) => (
					<Fragment>
						{value.data.map((item: GradeData) => (
							<StyledTableRow
								style={{
									border: "1px solid black",
								}}
							>
								{item.grade === "A" && (
									<StyledTableCell
										component="th"
										scope="row"
										rowSpan={5}
										style={{
											border: "1px solid black",
										}}
									>
										{key}
									</StyledTableCell>
								)}
								<StyledTableCell
									component="th"
									scope="row"
									style={{
										border: "1px solid black",
									}}
								>
									{item.grade}
								</StyledTableCell>
								<StyledTableCell
									component="th"
									scope="row"
									style={{
										border: "1px solid black",
									}}
								>
									{item.value}
								</StyledTableCell>
							</StyledTableRow>
						))}
					</Fragment>
				))}
			</TableBody>
		</Table>
	);
};

export default AppTable;
