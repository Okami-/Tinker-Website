import React, { Component } from "react";
import bigGear from '../../assets/images/bigGear.svg';

class Banner extends Component {
    render() {
        return (
            <div className="banner">
                <h1>MOCK UP TO SETUP</h1>
                <div className="banner-picture">
                    <div className="big-gear"></div>
                    <div className="small-gear"></div>
                </div>
                <p>We are a UI and full-stack development consulting team based in the bay area and southern california.</p>
                
            </div>
        );
    }
}

export default Banner;