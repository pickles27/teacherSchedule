import React from 'react';
import LandingPage from './components/LandingPage.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      teacherId: 1,
      teacherName: 'Sally Jones',
      page: 'landingPage'
    }
    this.changePage = this.changePage.bind(this);
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
      displayed = 'insert config component here'
    }
    return (
      <div>
        {displayed}
      </div>
    );
  }
}

export default App;
