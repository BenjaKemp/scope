import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

const Player  =  ({key,  player})  => {

	return(
		<Card className="card_wrapper">
		  <Card.Img variant="top" src={require(`../assets/${player.name.replace(/\s/g,"")}.png`)}  />
		  <Card.Body>
		    <Card.Title>{player.name}</Card.Title>
			    <Link  to={`/playerdetails/${player.id}`}>
			    	<Button  className="player_button" variant="primary">Details</Button>
			    </Link>
		  </Card.Body>
		</Card>
		)
}
export default Player;