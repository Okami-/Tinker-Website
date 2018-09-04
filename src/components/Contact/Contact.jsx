import React, { Component } from 'react';
import ScrollableAnchor from 'react-scrollable-anchor';
class Contact extends Component {
    render() {
        return (
            <div className="contact">
                <ScrollableAnchor id={'section3'}>
                    <h2>CONTACT</h2>
                </ScrollableAnchor>
            </div>
        )
    }
}

export default Contact;