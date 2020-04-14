import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';


const Landing = ({players, races}) => {

	let individualBattles = players.reduce( (total, currentValue) => total + currentValue.eloData.scorearray.length, 0)
	let podium = players.slice(0,3);
	let numberOfMatches = races.length;

	return(
		<Jumbotron className ="container-full-bg landing_background" fluid>
		  <Container>
			  <h3 className="title">We've crunched the numbers on {numberOfMatches} seperate races</h3>
			  <h3 className="title">comprising {individualBattles} individual battles</h3>
			  <h3 className="title">The column on the left shows racer positions in ascending order</h3>
			  <ol className="podium">
			    <li>{podium[0].name}</li>
			    <li>{podium[1].name}</li>
			    <li>{podium[2].name}</li>
			  </ol>
		  </Container>
		</Jumbotron>
		)
}


export default Landing;