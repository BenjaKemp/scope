import React from 'react';
import backendApi from './utils/api'
import Player from './components/Player'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import NewGame from './components/NewGame'
import CenterPlayer from './components/CenterPlayer'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import { v4 as uuidv4 } from 'uuid';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const EloRating = require('elo-rating');
const io = require("socket.io-client");
const ioClient = io.connect("http://localhost:8000");

 

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    ioClient.on("updated", (msg) => {
       console.info(msg)
       this.refreshAllData()
    });
  }

  componentDidMount() {
    this.refreshAllData()
    
  }

  refreshAllData(){

    backendApi.callMatchesApi()
    .then(response => {
          let playerObject = {};
          let matches = response.list.map(obj=> ({ ...obj, id: uuidv4() })).sort(function(a,b){return new Date(a.updatedAt) - new Date(b.updatedAt)});
          matches.forEach(el => {
            el.standings.forEach((driver, i) => {
              let position = i +1;
              if(!playerObject[driver]){ 
                playerObject[driver] = {}
              }
              if(!playerObject[driver][position]){ 
                playerObject[driver][position] = 1
              }
              else{
                playerObject[driver][position] += 1
              }
            })
          })

      let keys = Object.keys(playerObject);

      let statePlayer = []

      keys.forEach(el => {
        let ELOViewsObject =  Object.assign(...keys.map(key => ({ [key]: {'ELO':1500, 'games':0, 'scorearray': []} })));

        for (var i = 0; i < matches.length; i++) {
          let gameOrders = matches[i].standings

          for (var j = 0; j < gameOrders.length; j++) {
            for (var k = j+1; k < gameOrders.length; k++) {
              let currentPlayer = gameOrders[j]
              let playerBehind = gameOrders[k]

              var regex = /[.,\s]/g;

              let objectkey = [currentPlayer,playerBehind].sort().toString()
                  objectkey = objectkey.replace(regex, '');

              if(ELOViewsObject[objectkey]){
                ELOViewsObject[objectkey] +=1
              }else{
                ELOViewsObject[objectkey] = 1
              }

              ELOViewsObject[currentPlayer]['games'] += 1
              ELOViewsObject[playerBehind]['games'] += 1 

              let Elo = EloRating.calculate(ELOViewsObject[currentPlayer]['ELO'] , ELOViewsObject[playerBehind]['ELO'], true, ELOViewsObject[currentPlayer]['games']);
     
              let winnerPoints = Elo.playerRating
              let loserPoints =  Elo.opponentRating
              

              ELOViewsObject[currentPlayer]['scorearray'].push(winnerPoints)    
              ELOViewsObject[playerBehind]['scorearray'].push(loserPoints)

              ELOViewsObject[currentPlayer]['pointsscored'] = winnerPoints - ELOViewsObject[currentPlayer]['ELO']
              ELOViewsObject[playerBehind]['pointsscored'] = loserPoints -ELOViewsObject[playerBehind]['ELO']

              ELOViewsObject[currentPlayer]['ELO'] = winnerPoints
              ELOViewsObject[playerBehind]['ELO'] = loserPoints
             
            }
          }
        }
        let playerMatches = matches.filter(match => match.standings.includes(el));

        statePlayer.push(
          { 
            id: uuidv4(),
            name: el,
            matches: playerMatches,
            eloData: ELOViewsObject[el],
            results: playerObject[el]
          })
      })

      statePlayer.sort((a, b) => b.eloData.ELO - a.eloData.ELO)
      this.setState({...this.state, matches, statePlayer})
    })

  }

  renderPlayers(){

    let keys = Object.keys(this.state.statePlayer)
    return (
      <div >
          {keys.map((el, i) =>  <Player player={this.state.statePlayer[el]} />)}
      </div>
      )
  }

  render() {

    if (!this.state.statePlayer) {
      return (
        <Container fluid>
          <Spinner animation="border" role="status">
           <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )
    }
    return (
      <Router>
            <Jumbotron className ="jumbotron_app">
            <h2 className="title">Welcome to MarioKart League!</h2>
            </Jumbotron>
            <Dashboard player={this.state.statePlayer}/>
              <Row className = "container_wrapper landing_background ">
                <Col className="race_rankings_column">{this.renderPlayers()}</Col>
                  <Switch>
                    <Route exact path="/">
                          <Col xs={9}><Landing races={this.state.matches} players={this.state.statePlayer}/></Col>
                    </Route>
                    <Route exact path="/newgame">
                          <Col xs={9}><NewGame players={this.state.statePlayer} /></Col>
                    </Route>
                    <Route exact path="/playerdetails/:id">
                          <Col xs={9}><CenterPlayer players={this.state.statePlayer} races={this.state.matches}/></Col>
                    </Route>
                </Switch>
              </Row>
      </Router>
    );
  }
}