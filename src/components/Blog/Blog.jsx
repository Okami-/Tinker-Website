import React, { Component } from "react";
import { fetchPosts, fetchPostsSuccess } from '../../store/blog/actions.js'
import { connect } from 'react-redux';
import PostsList from "./PostsList"

class Blog extends Component {

    render() {
        return (
            <div className="blog-posts">
                <PostsList />
            </div>
        )
    }
}


export default Blog;

