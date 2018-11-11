import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost, fetchPostFailure, fetchPostSuccess, deletePostSuccess, resetActivePost, resetDeletedPost} from '../../store/blog/actions.js';
import Moment from 'react-moment'
class PostsShow extends Component {
  componentDidMount() {
    // id is created from the server than assigned to a url link that leads to the single post which is then 
    // extracted from this.props.match.params which is a prop created from react router
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

   componentWillReceiveProps(nextProps) {
    if(nextProps.deletedPost.error && nextProps.deletedPost.error.message) {//delete failure
      alert(nextProps.deletedPost.error.message || 'Could not delete. Please try again.');
    } else if(nextProps.deletedPost.post && !nextProps.deletedPost.error) {//delete success
      this.props.history.push('/posts');
    }
  }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, ()=>{
      history.push('/')
    });
  }
  render() {
    const { post, loading, error } = this.props.activePost;
    console.log(post);
    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <div className="post-listing">
        <h2>{post.post.title}</h2>
        <button
          className="btn btn-danger float-right"
          onClick={this.onDeleteClick.bind(this)}>Delete</button>
        <h6>Categories: {post.post.categories}</h6>
        <div>{post.post.body}</div>
        <Link className="btn btn-secondary btn-sm" to="/posts">Back to Posts</Link>
        <div className="post-date-created">
          <Moment format="MMMM DD, YYYY">{post.post.createdAt}</Moment>
        </div>
      </div>
    );
  };
}

function mapStateToProps(globalState, ownProps) {
  return {
    activePost: globalState.posts.activePost,
    postId: ownProps.id,
    deletedPost: globalState.posts.deletedPost
  };
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (id) => {
      dispatch(fetchPost(id))
        .then((result) => {
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchPostFailure(result.payload.response.data));
          } else {
            dispatch(fetchPostSuccess(result.payload.data))
          }
        })
    },
    deletePost: (id) => {
      dispatch(deletePost(id))
        .then((result) => {
          dispatch(deletePostSuccess(result.payload.data));
        })
    },
    resetMe: () => {
      //clean up both activePost(currrently open) and deletedPost(open and being deleted) states
      dispatch(resetActivePost());
      dispatch(resetDeletedPost());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsShow);
