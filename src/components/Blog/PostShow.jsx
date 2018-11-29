import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost, fetchPostFailure, fetchPostSuccess, deletePostSuccess, resetActivePost, resetDeletedPost, editPost, editPostSuccess} from '../../store/blog/actions.js';
import Moment from 'react-moment'
import renderHTML from 'react-render-html';
import ReactQuill, { Quill } from 'react-quill'; 

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
  onEditClick() {
    const { id } = this.props.match.params;
    this.props.history.push('/posts/edit/' + id)
  }
  render() {
    const { post, loading, error } = this.props.activePost;
    const author = this.props.userObj.loggedUserObj.userName
    if (!post) {
      return <div>Loading...</div>;
    }
    return (  
      <div className="post-listing">
        <div className="container">
          <div class="post-body">
            <h3>{post.post.title}</h3>
            <button
              className="btn btn-danger float-right"
              onClick={this.onDeleteClick.bind(this)}>Delete</button>
            <button 
            className="btn btn-danger"
            onClick={this.onEditClick.bind(this)}
            >
              Edit
            </button>
            <h6>Categories: {post.post.categories}</h6>
            <div>{renderHTML(post.post.body)}</div>
          </div>
          
          <div className="post-footer">
          <Link className="btn btn-secondary btn-sm" to="/posts">Back to Posts</Link>
            <div className="post-date-created">
              <span className="post-author">{author}</span>
              <span className="cb-separator">
                <i className="fa fa-times"></i>
              </span>
              <span className="post-date"><Moment format="MMMM DD, YYYY">{post.post.createdAt}</Moment></span>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

function mapStateToProps(globalState, ownProps) {
  return {
    activePost: globalState.posts.activePost,
    postId: ownProps.id,
    deletedPost: globalState.posts.deletedPost,
    userObj: globalState.access.user,
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
      dispatch(resetActivePost());
      dispatch(resetDeletedPost());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsShow);
