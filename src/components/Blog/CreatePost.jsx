import React, { Component } from "react";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { connect } from 'react-redux';
import { createPost, resetNewPost } from '../../store/blog/actions.js'
import { withRouter } from "react-router-dom";


class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            title: ''
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmitPost = this.handleSubmitPost.bind(this);
    }

    static defaultProps = {
        createPost: () => null,
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    editorChange = (editorState) => {
        this.setState({ editorState })
    }

    handleSubmitPost(e) {
        e.preventDefault();
        var convertedData = convertToRaw(this.state.editorState.getCurrentContent())
        this.props.createPost(
            {
                userId: this.props.userObj.loggedUserObj.id,
                title: this.state.title,
                content: convertedData,
            }
        )
        this.props.history.push('/blog');
    }

    render() {
        const { postTitle } = this.state;
        const { userObj } = this.props;
        return (
            <div>
                <div id="create-post-wysiwyg">
                    <h1>Write Something Good</h1>
                    <span className="title-title">Title</span>
                    <input
                        type="text"
                        className="create-post-title"
                        name="title"
                        value={postTitle}
                        onChange={this.onChange}>
                    </input>
                    <span className="body-body">Body</span>
                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.editorChange}
                    />
                    <button className="create-post-submit" onClick={this.handleSubmitPost}>Submit</button>
                </div>
            </div >
        )
    }
}


const mapStateToProps = state => {
    return {
        userObj: state.access.user
    }
}

const mapDispatchToProps = dispatch => ({
    createPost: (props) => dispatch(createPost(props))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePost));

