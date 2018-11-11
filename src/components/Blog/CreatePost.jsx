import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../../store/blog/actions';

export class CreatePost extends Component {
  renderField(field) {
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? "border border-danger" : ''}`;

    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input type="text" {...field.input} className="form-control"/>
        {
          touched ? <div className="text-danger">{error}</div> : ''
        }
      </div>
    );
  }
  
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/posts');
    });
  }

  render() {
    console.log(this.props);
    const { handleSubmit } = this.props; 
    return (
      <div id="create-post-wysiwyg">
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="title"
          label="Title"
          component={this.renderField} />
        <Field
          name="categories"
          label="Categories"
          component={this.renderField} />
        <Field
          name="body"
          label="body"
          component={this.renderField} />
          {/* Comment 11*/}
        <button type="submit" className="btn btn-primary">Create Post</button>
        <Link className="ml-2 btn btn-danger" to="/">Cancel</Link>
      </form>
      </div>
    );
  }
}

// comment 6
function validate(values) {
  let errors = {};

  // comment 7
  if (!values.title) {
    errors.title = "Title is required."
  } else if (values.title.length < 3) {
    errors.title = "Title must be at least 3 characters long."
  }

  if (!values.categories) {
    errors.categories = "Categories are required."
  }
  if (!values.content) {
    errors.content = "Post must have content."
  }

  return errors;
}

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm',
})(
  connect(null, { createPost })
  (CreatePost));
