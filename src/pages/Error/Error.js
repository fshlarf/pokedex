import React, { Component } from 'react'

class Error extends Component {
  render() {
    return (
      <div className="App" style={styles.mainContainer}>
        <h1>
            Page not found
        </h1>
      </div>
    );
  }
}

export default Error;

const styles = {
    mainContainer: {
        margin: 'auto',
        width: '25%',
        marginTop: '10rem'
    }
}