import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.handleCreatePost = this.handleCreatePost.bind(this);
    }
    handleChangePassword() {

    }

    handleCreatePost() {
        this.props.history.push('');
    }

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
                <div className="profile-create-new-post">
                    <button onClick="">Create Post</button>
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

