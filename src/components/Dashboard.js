import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {
  Link
} from "react-router-dom";

const Dashboard = ( {player} ) => {
	return(
		
	  <Container className="dashboard_container d-none d-lg-block">
			<Nav fill variant="tabs" defaultActiveKey="/home">
			<Nav.Item>
			  <Nav.Link className="nav_link" as={Link}   to='/' >Home</Nav.Link>
		
			</Nav.Item>
					    {player.map((el,i) => {
			              return (
			                   <Nav.Item key={i}>
			                     <Nav.Link className="nav_link" as={Link}  to={`/playerdetails/${el.id}`} key={i}>{el.name}</Nav.Link>
			                   </Nav.Item>
			                ) 
			            })}
			            <Nav.Item>
			            	<Nav.Link className="nav_link" as={Link}  to='/newgame' >New</Nav.Link>
			            </Nav.Item>
			</Nav>
		  </Container>
		)
}
export default Dashboard;