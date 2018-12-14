import axios from 'axios';

export const fetchRepos = () =>
  axios.get('http://localhost:8080/repos')
    .then((response) => {
      return { repositories: response.data }
    })

