import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, fetchPostsSuccess } from '../../store/blog/actions.js';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }
  renderPosts(posts) {
    return _.map(posts.posts, post => {
      return (
        <li className="list-group-item" key={post._id}>
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </li>
      );
    });
  }
  render() {
    const { posts, loading, error } = this.props.postsList;
    console.log(posts)
    return (
       <div className="posts-listing">
            <h1>hello</h1>
            <ul className="posts-list">
                {this.renderPosts(posts)}
            </ul>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  postsList: state.posts.postsList
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts()).then((response) => {
            !response.error ? dispatch(fetchPostsSuccess(response.payload.data)) : dispatch(fetchPostsFailure(response.payload.data));
          });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);