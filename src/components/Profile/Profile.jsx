import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {

    render() {
        const { userObj } = this.props;
        console.log(userObj);
        return (
            <div className="profile-page">
                <div className="profile-photo">
                    <img src="" alt="" />
                    <button className="upload-profile">Upload Photo</button>
                </div>
                <div className="profile-user-info">
                    <span className="profile-name">Name:</span>
                    <br />
                    <div className="profile-email-user">Email: {userObj.loggedUserObj.email}</div>
                </div>
                <div className="profile-password-change">
                    <button className="password-change">Change Password</button>
                </div>
                <div className="profile-post-list">
                    <span className="profile-post-title">Posts</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userObj: state.access.user,
        error: state.access.error,
    }
}

export default connect(mapStateToProps)(Profile);

