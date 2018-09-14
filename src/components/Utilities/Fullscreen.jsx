import React, { Component } from "react";

const Fullscreen = (props) => {

    var children = props.children,
        color = props.color;

    var styles = {
        backgroundColor: color,
        width: '100%',
        minHeight: '100%',
    };

    return (
        <div style={styles}>
            {children}
        </div>
    );
};

export default Fullscreen