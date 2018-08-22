import React, { Component } from 'react';
import ScrollableAnchor from 'react-scrollable-anchor/lib/ScrollableAnchor';


class Services extends Component {
    render() {
        return (
            <div className="services container">
                <ScrollableAnchor id={'section2'}>
                    <h2>SERVICES</h2>
                </ScrollableAnchor>
                <div className="row">
                <Service
                    className="icon pe-7s-browser pe-4x"
                    serviceTitle="WEB DESIGN"
                    serviceDescription="Fluid, mobile first, and elegant designs from wireframe to finished product. We make your ideas alive."
                />
                <Service
                    className="icon pe-7s-science pe-4x"
                    serviceTitle="WEB DEVELOPMENT"
                    serviceDescription="Our developers are kind of a big thing. Fast load times, elegant code, knowledgable staff, your product is and will always be the smartest kid in town."
                />
                </div>
                <div className="row">
                <Service
                    className="icon pe-7s-phone pe-4x"
                    serviceTitle="MOBILE"
                    serviceDescription="IOS, Android, smart watches. You should be able to take your app anywhere and everywhere you go."
                />
                <Service
                    className="icon pe-7s-smile pe-4x"
                    serviceTitle="SUPPORT"
                    serviceDescription="Testing, maitanance, aka all the work no one wants to do. Well our team enjoys that stuff and we're pretty good at it. Did I mention we want to see you smile and be happy. We're pretty good at that too."
                />
                </div>
            </div>
        )
    }
};

class Service extends Component {
    render() {
        return (
            <div className="service col-sm">
                <div className={this.props.className}></div>
                <h3 className="service-title">{this.props.serviceTitle}</h3>
                <p className="service-description">{this.props.serviceDescription}</p>
            </div>
        )
    }
};


export default Services;