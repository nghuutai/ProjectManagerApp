import React, { Component } from 'react'
import Nav from './Nav';

class Home extends Component {
    render() {
        return (
            <div>
                <Nav />
                <div style={{textAlign: 'center', marginTop: '40px'}}>
                    <h1>Welcome to app Manager projects</h1>
                </div>
            </div>
        )
    }
}

export default Home;