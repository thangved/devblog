import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Location } from "../../providers/LocationProvider";

export default function Weather() {
	const [currentWeather, setCurrentWeather] = useState({ weather: [{}] });
	const { location } = useContext(Location);

	useEffect(() => {
		if (!location.latitude) return;
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=cc9c78a1d267dda8e6a8a16aa3cabf8d&lang=vi`
			)
			.then(({ data }) => {
				setCurrentWeather(data);
			})
			.catch((error) => toast.error(error.toString()));
	}, [location]);

	return (
		<StatGroup
			border="1px solid #ddd"
			padding="2"
			borderRadius="10px"
			mb="2"
		>
			<Stat>
				<StatLabel>Thời tiết</StatLabel>
				<StatNumber>{currentWeather.weather[0].description}</StatNumber>
			</Stat>

			<Stat>
				<StatLabel>Vị trí</StatLabel>
				<StatNumber>{currentWeather.name}</StatNumber>
			</Stat>
		</StatGroup>
	);
}
