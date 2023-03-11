import React, { Component } from 'react'

export class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="index.html">NewsZzy</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarsExample05">
                            <ul className="navbar-nav ml-auto pl-lg-5 pl-0">
                                <li className="nav-item">
                                    <a className="nav-link active" href="index.html">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/about">About</a>
                                </li>
                                {/* <li className="nav-item">
                                    <a className="nav-link" href="/">News</a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar
