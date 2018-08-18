import React, { Component } from 'react';

class Services extends Component {
    render() {
        return (
            <div className="services">
                <h2>SERVICES</h2>
                <Service
                    serviceLogo="a"
                    serviceTitle="WEB DESIGN"
                    serviceDescription="Fluid, mobile first, and elegant designs from wireframe to finished product. We make your ideas <b>alive</b>."
                />
                <Service
                    serviceLogo="a"
                    serviceTitle="WEB DEVELOPMENT"
                    serviceDescription="Our developers are kind of a big thing. Fast load times, elegant code, knowledgable staff, your product is and will always be the <b>smartest</b> kid in town."
                />
                <Service
                    serviceLogo="a"
                    serviceTitle="MOBILE"
                    serviceDescription="IOS, Android, smart watches. You should be able to take your app anywhere and everywhere you go."
                />
                <Service
                    serviceLogo="a"
                    serviceTitle="SUPPORT"
                    serviceDescription="Testing, maitanance, aka all the work no one wants to do. Well our team enjoys that stuff and we're pretty good at it it. Did I mention we want to see you smile and be happy. We're pretty good at that too."
                />
            </div>
        )
    }
};

class Service extends Component {
    render() {
        return (
            <div className="service">
                <div className="service-logo">{this.props.serviceLogo}</div>
                <h3 className="service-title">{this.props.serviceTitle}</h3>
                <p className="service-description">{this.props.serviceDescription}</p>
            </div>
        )
    }
};


export default Services;