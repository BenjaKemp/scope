import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import backendApi from './utils/api'
import  Graph  from './components/Graphs';
import  Landing  from './components/Landing';
import  Player  from './components/Player';
import  CenterPlayer  from './components/CenterPlayer';
import TestRenderer from "react-test-renderer";
import playerData from './mocks/player.json'
import races from './mocks/races.json'


const playerObject = playerData[0]


describe('call made to back end and data returned', () => {
  it('should load user data', () => {
    return backendApi.callMatchesApi()
    .then(data => {
      expect(data).toBeDefined()
    })
  })
})

describe('Player', () => {
  test('snapshot renders', () => {
    const component = TestRenderer.create(<Player player={playerObject} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});







