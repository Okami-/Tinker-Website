import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../../store/blog/actions';
// Comment 1

export class CreatePost extends Component {
  // Comment 2
  renderField(field) {
    // Comment 14
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? "border border-danger" : ''}`;

    return (
      // Comment 3
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
    // comment 15, 18
    this.props.createPost(values, () => {
      this.props.history.push('/posts');
    });
    // comment 16, 17
    // this.props.history.push('/');
  }
  // comment 8
  render() {
    console.log(this.props);
    const { handleSubmit } = this.props; // comment 13
    return (
      // Comment 9, 10, 11
      // this === component
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

  // If errors is empty; form is fine to submit (redux-forms does this automatically).
  // If errors has any properties, redux form assumes form is invalid; does not submit.
  return errors;
}

// Comment 4, 5, 14
// how do we combine the connect helper for our action creator/reducer AND redux-form? below:
export default reduxForm({
    validate: validate,
    form: 'PostsNewForm',
})(
  connect(null, { createPost })
  (CreatePost));
