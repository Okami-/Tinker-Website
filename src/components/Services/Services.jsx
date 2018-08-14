import React, { Component } from 'react';

class Services extends Component {
    render() {
        return (
            <Service
                serviceLogo="a"
                serviceTitle="b"
                serviceDescription="c"
            /> 
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