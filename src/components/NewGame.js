import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import backendApi from '../utils/api';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
 
class NewGame extends React.Component {

    constructor(props) {
    super(props);

      this.state = {
        racers: null,
        podium: {},
        show: false
      };
  };

  componentDidMount() {
    const racers =  this.props.players.map(player => {
      return {value: player.name, label: player.name }
    })
    this.setState({...this.state.racers, racers})
  };


  handleClose = () => {
    this.setState({...this.state.show, show: false});
  };


  formUpdate = (e) => {

    let id = e.target.id.slice(-1);
    let name = e.target.value
    let newPodium = this.state.podium;
    newPodium[id] = name;
    this.setState({...this.state.podium, podium: newPodium });
  };

  submitForm = (e) =>  {

    e.preventDefault()
    let values = Object.values(this.state.podium)
    let hasDuplicate = values.some((val, i) => values.indexOf(val) !== i);

    if(values.length !== 4 ||  hasDuplicate ){
      alert('please choose 4 unique racers!!!! ')
      return;
    }
    backendApi.postMatches(values)
    this.setState({...this.state.show, show:true})
  };

  render() {
    if (!this.state.racers) {
      return (
        <Container fluid>
          <Spinner animation="border" role="status">
           <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )
    }
 
    return (
      <div>
         <Form>
            <Form.Group controlId="ControlSelect1">
               <Form.Label>First Position</Form.Label>
               <Form.Control
                  as="select"
                  onChange={this.formUpdate}
                  defaultValue={null}
                  >
                  <option>
                     enter first place.....
                  </option>
                  {this.state.racers.map((el,i) => {
                  let values = Object.values(this.state.podium);
                  let isDisabled = values.includes(el.value) ? true : false
                  return (
                    <option key={i} disabled={isDisabled}  value={el.value}>{el.value} </option>
                    )
                  })
                }
               </Form.Control>
            </Form.Group>
            <Form.Group controlId="ControlSelect2">
               <Form.Label>Second Position</Form.Label>
               <Form.Control
                  as="select"
                  onChange={this.formUpdate}
                  defaultValue={null}
                   >
                  <option>
                     enter second place.....
                  </option>
                  {this.state.racers.map((el,i) => {
                  let values = Object.values(this.state.podium);
                  let isDisabled = values.includes(el.value) ? true : false
                  return (
                  <option  key={i}  disabled={isDisabled}  value={el.value}>{el.value}</option>
                  )
                  }
                  )}
               </Form.Control>
            </Form.Group>
            <Form.Group controlId="ControlSelect3">
               <Form.Label>Third Position</Form.Label>
               <Form.Control 
                  as="select"
                  onChange={this.formUpdate}
                  defaultValue={null}
                   >
                  <option>
                     enter third place.....
                  </option>
                  {this.state.racers.map((el,i) => {
                  let values = Object.values(this.state.podium);
                  let isDisabled = values.includes(el.value) ? true : false
                  return (
                  <option  key={i}  disabled={isDisabled}  value={el.value}>{el.value}</option>
                  )
                  })}
               </Form.Control>
            </Form.Group>
            <Form.Group controlId="ControlSelect4">
               <Form.Label>Fourth Position</Form.Label>
               <Form.Control
                  as="select"
                  onChange={this.formUpdate}
                  defaultValue={null}>
                  <option >
                     enter last..... 
                  </option>
                  {this.state.racers.map((el,i) => {
                  let values = Object.values(this.state.podium);
                  let isDisabled = values.includes(el.value) ? true : false
                  return (
                  <option  key={i}  disabled={isDisabled}  value={el.value}>{el.value}</option>
                  )
                  })}
               </Form.Control>
            </Form.Group>
            <button onClick={this.submitForm} className="btn btn-default">Submit</button>
         </Form>
         <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>All Races</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               New Game Added to DataBase
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={this.handleClose}>
               Close
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
    );
    }
}

export default NewGame;