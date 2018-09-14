import React, { Component } from "react";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <div id="create-post-wysiwyg">
                    <h1>Write Something Good</h1>
                    <span class="title-title">Title</span>
                    <input
                        type="text"
                        className="create-post-title"
                        placeholder="TITLE">
                    </input>
                    <span className="body-body">Body</span>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                    <button className="create-post-submit">Submit</button>
                </div>
            </div >
        )
    }
}

export default CreatePost;
