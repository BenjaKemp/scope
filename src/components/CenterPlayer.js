import React from "react";
import { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {useParams } from "react-router-dom";
import  Graph  from './Graphs';
import moment from 'moment';

const CenterPlayer = ({players, races}) => {
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const { id } = useParams();
const player  = players.find(el => el.id === id)
const pos  = players.indexOf(player)+1
const allPlayerRaces = races.filter(el => el.standings.includes(player.name) )

if(!player){
	return (
		<div></div>
		)
}
	return(
		<Jumbotron className ="container-full-bg center_player_background" fluid>
		  	<Container>
			   	<h2>Name: {player.name} - Current Position: {pos}</h2>
			    	<Table striped bordered hover>
						<thead>
							<tr>
								<th>Poition </th>
								<th>Frequency</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1st</td>
								<td>{player.results[1]}</td>
							</tr>
							<tr>
								<td>2nd</td>
								<td>{player.results[2]}</td>
							</tr>
							<tr>
								<td>3rd</td>
								<td>{player.results[3]}</td>
							</tr>
							<tr>
								<td>4th</td>
								<td>{player.results[4]}</td>
							</tr>
						</tbody>
			   		</Table>
			    <Button className ="player_button" onClick={handleShow}>
			      View All Races
			    </Button>
			    <Modal show={show} onHide={handleClose}>
			     	<Modal.Header closeButton>
			       		<Modal.Title>All Races</Modal.Title>
			      	</Modal.Header>
			      	<Modal.Body>{allPlayerRaces.map(race =>{
			      	const parseISOString = (s) => moment(s).format('LLL')
			      	return(
			      		<div className="race_container">
				      		<p>{parseISOString(race.createdAt)}</p>
				      		<p>{race.standings.toString()}</p>
			      		</div>
			      		)
			      	})}
			      	</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
					  		Close
						</Button>
					</Modal.Footer>
			    </Modal>
			    <p>
			      {player.name} finished first {player.results[1]} times. Second {player.results[2]} times, third {player.results[3]}
			        times..... and on {player.results[4]} occasions finished in dead last.
			    </p>
			    <p>Below is the graph to show the players ELO progress after each game</p>
	  		</Container>
		<Graph player={player.eloData.scorearray} />
	</Jumbotron>
		)
}

export default CenterPlayer;