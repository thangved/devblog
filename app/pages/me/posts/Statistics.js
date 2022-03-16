import React from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { m } from "framer-motion";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
const Statistics = ({ posts = [], loading }) => {
	return (
		<Line
			data={{
				labels: posts.map((post) => post.title),
				datasets: [
					{
						label: "Lượt xem",
						data: posts.map((post) => post.views),
						borderColor: "blue",
						backgroundColor: "blue",
					},
					{
						label: "Lượt thích",
						data: posts.map((post) => post.likes.length),
						borderColor: "red",
						backgroundColor: "red",
					},
				],
			}}
		/>
	);
};

export default Statistics;
