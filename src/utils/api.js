const axios = require('axios');

const callMatchesApi = async () => {

	const res = await axios.get('http://localhost:3000/matches');
	const { data } = await res;
	return data;
}

const postMatches = (matches) => {

	axios.post('http://localhost:3000/matches', {
		
		"standings": matches
	    
	  })
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });


}

module.exports = {callMatchesApi , postMatches}