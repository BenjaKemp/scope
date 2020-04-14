import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";


const Graph = ({player}) => {

	const eloData = player.map( (el, i) => {
		return (
			{
				race: i, name: player.name, ELO: el, 
			}
		)
	})

    return (
    	<ResponsiveContainer width={"99%"} height={300}>
			<LineChart
			width={800}
			height={300}
			data={eloData}
			baseValue={{
				dataMin: 1000,
				dataMax:2000
			}}
			margin={{
			  top: 5, right: 30, left: 20, bottom: 5,
			}}
			>
				<CartesianGrid  />
				<XAxis dataKey="race" interval={9} />
				<YAxis  type="number" dtype="number" domain={[1000, 2000]} />
				<Tooltip />
				<Legend />
				<Line  type="monotone" dataKey="ELO"  dot={false} />
			</LineChart>
		</ResponsiveContainer >
			);
}

export default Graph
