import React, { Component } from "react";
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure } from '../../store/blog/actions.js'
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';

class PostsList extends Component {

    componentDidMount() {
        this.props.dispatch(fetchPosts());
    }

    renderPosts(posts) {

        return posts.map((post) => {
            const markup = draftToHtml(
                post.content
            );
            console.log(markup)
            return (
                <li className="list-group-item" key={post.userId}>
                    <h3 className="list-group-heading">{post.title}</h3>
                    <div className="content">
                        {markup}
                    </div>
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

const mapStateToProps = state => ({
    postsList: state.blog.postsList
});

export default connect(mapStateToProps)(PostsList);

