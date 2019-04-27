import React from 'react';
import axios from 'axios';
import LandingPage from './components/LandingPage.jsx';
import ConfigPage from './components/ConfigPage.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      teacherId: 1,
      teacherName: '...',
      page: 'landingPage'
    }
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    //axios call to get teacher's name from hardcoded id
    axios.get('/teacherInfo', {
        params: {
          id: this.state.teacherId
        }
      })
      .then(response => {
        let name = response.data.name;
        this.setState({
          teacherName: name
        });
      })
      .catch(error => {
        console.log('error from teacherInfo: ', error);
      });
  }

  changePage(event) {
    var page = event.target.name;
    this.setState({
      page: page
    });
  }

  render() {
    var displayed;
    if (this.state.page === 'landingPage') {
      displayed = <LandingPage teacherName={this.state.teacherName} changePage={this.changePage} />;
    } else if (this.state.page === 'config') {
      displayed = <ConfigPage teacherId={this.state.teacherId}/>;
    }
    return (
      <div>
        {displayed}
      </div>
    );
  }
}

export default App;
