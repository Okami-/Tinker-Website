import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost, fetchPostFailure, fetchPostSuccess } from '../../store/blog/actions.js';

class PostsShow extends Component {
  componentDidMount() {
    // Comment 1, 7
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }
  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, ()=>{
      this.props.history.push('/');
    });
  }
  render() {
    const { post, loading, error } = this.props.activePost;
    console.log(this.props.activePost)
    // Comment 8 (on Caching)
    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link className="btn btn-secondary btn-sm" to="/">Back to Posts</Link>
        <button
          className="btn btn-danger float-right"
          onClick={this.onDeleteClick.bind(this)}>Delete</button>
        <h2>{post.title}</h2>
        <h6>Categories: {post.categories}</h6>
        <div>{post.content}</div>
      </div>
    );
  };
}

// comment 2, 3, 4, 5, 6
const mapStateToProps = state => ({
  activePost: state.posts.activePost
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (id) => {
      dispatch(fetchPost(id))
        .then((result) => {
          // Note: Error's "data" is in result.payload.response.data (inside "response")
          // success's "data" is in result.payload.data
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchPostFailure(result.payload.response.data));
          } else {
            dispatch(fetchPostSuccess(result.payload.data))
          }
        })
    },
    // resetMe: () => {
    //   //clean up both activePost(currrently open) and deletedPost(open and being deleted) states
    //   dispatch(resetActivePost());
    //   dispatch(resetDeletedPost());
    // }
  }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);