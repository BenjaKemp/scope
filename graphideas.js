
import React, { PureComponent, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';



const Graph = ({player , matches, races, opponents}) => {

	const [shownLines, setCurrentShownLines] = useState([player.id]);


	const [allGraph, setAllGraph] = useState([]);


	const [graphData, setGraphData] = useState([]);

	// console.log('this is currentMatches    ',currentMatches)
	// console.log('this is currentRaces       ',currentRaces)
	// console.log('this is currectOpponents       ',currentOpponents)


	useEffect(() => {

	let eloGraphData = opponents.map( (elBody, i) => {
		let  newArray = elBody.eloData.scorearray.map((score, i) => {
		return(
				{
					race: i, name: elBody.name, ELO: score, 
				}
			)
		})
		return  {id : elBody.id, array : newArray}

	});
	setAllGraph(...allGraph, eloGraphData)
	let filtered = eloGraphData.filter(el => shownLines.includes(el.id))
	},[])



	const handleChange = (event) => {

		event.persist()


		let newId = event.target.id
		console.log('shownLines    before    ',shownLines)
		console.log('shownLines       ',newId)
		if(shownLines.includes(newId)){
			setCurrentShownLines([...shownLines.filter(el => el !== newId)])
		} else {
			setCurrentShownLines([...shownLines, newId])
		}

		renderLines()
	}

	const renderLines = () => {

	let toShow = allGraph.filter(el => shownLines.includes(el.id))
	let data = []
	toShow.forEach(opponent =>{
		opponent.array.forEach(race => {
			let id = opponent.id + '-name' ;
			let scoreid = opponent.id + '-score' ;
			let score = { [id]: race.name, [scoreid]: race.ELO}

			if(!data[race.race]){
				data[race.race] = score

				console.log('this is reach race    ',race )
			} else {
				data[race.race] = Object.assign(data[race.race], score)
			}
		})
	})

	setGraphData(...graphData, data)
	// <Line name="# Apples" type="monotone" dataKey="series1" stroke="#FF0000" />
	console.log('data    ',data)
	console.log('graphData  ',graphData)

	}






		if (!allGraph) {
		  return (
		    <Container fluid>
		      <Spinner animation="border" role="status">
		       <span className="sr-only">Loading...</span>
		      </Spinner>
		    </Container>
		  )
		}


    return (
    	<Container>
			<LineChart
			width={800}
			height={300}
			data={graphData}
			baseValue={{
				dataMin: 1000,
				dataMax:2000
			}}
			margin={{
			  top: 5, right: 30, left: 20, bottom: 5,
			}}

			>
			<CartesianGrid  />
			<XAxis 
			dataKey="race"
			domain={[0, 170]}
			interval={9}
			 />
			<YAxis type="number" dtype="number" domain={[1000, 2000]} />
			<Tooltip />
			<Legend />
			<Line  type="monotone" dataKey="ELO"  dot={false} />
			</LineChart>
			<Form>
				 <div className="mb-3 form-group-row">
			{opponents.map( opponent => {
				return(
						<Form.Check 
						custom
						inline
						type="checkbox"
						id={opponent.id}
						label={opponent.name}
						onChange={handleChange}
						/>
				)
			})}
				</div>		
			</Form>
			</Container>
			);
}

export default Graph
