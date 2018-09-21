import React, { Component } from "react";
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure } from '../../store/blog/actions.js'
import { connect } from 'react-redux';

class PostsList extends Component {

    componentWillMount() {
        this.props.fetchPosts();
    }

    renderPosts(posts) {
        return posts.map((post) => {
            return (
                <li className="list-group-item" key={post._id}>
                    <h3 className="list-group-heading">{post.title}</h3>
                </li>
            )
        })
    }

    render() {
        const { posts, loading, error } = this.props.postsList;

        if (loading) {
            return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
        } else if (error) {
            return <div className="alert alert-danger">Error: {error.message}</div>
        }
        return (
            <div className="posts-listing">
                <h1>hello</h1>
                <ul className="posts-list">
                    {this.renderPosts(posts)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        //postsList: state.posts.postsList
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // fetchPosts: () => {
        //     dispatch(fetchPosts()).then((response) => {
        //         !response.error ? dispatch(fetchPostsSuccess(response.payload.data)) : dispatch(fetchPostsFailure(response.payload.data));
        //     });
        // }
        fetchPosts: (posts) => dispatch(fetchPosts(posts))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);

