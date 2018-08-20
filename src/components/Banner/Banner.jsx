import React, { Component } from "react";

import ScrollableAnchor from 'react-scrollable-anchor'

class Banner extends Component {
    render() {
        return (
            <div className="banner">
                {/* <div className="video-test">
                    <video id="tess-video" loop autoPlay>
                        <source src="video/liftoff-tess.mp4" type="video/mp4" />
                    </video>
                </div> */}
                <ScrollableAnchor id={'section1'}>
                    <h1>MOCK UP TO SETUP</h1>
                </ScrollableAnchor>
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