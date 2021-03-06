import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../../store/blog/actions';
import ReactQuill, { Quill } from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'

Quill.register('modules/blotFormatter', BlotFormatter);
import BlotFormatter, { AlignAction, DeleteAction, ImageSpec } from 'quill-blot-formatter';
var BaseImageFormat = Quill.import('formats/image');

const ImageFormatAttributesList = [
    'alt',
    'height',
    'width',
    'style'
];

hljs.configure({ 
  languages: ['javascript', 'ruby', 'python', 'html']
});


class ImageFormat extends BaseImageFormat {
  static formats(domNode) {
    return ImageFormatAttributesList.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name, value) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(ImageFormat, true);
                

export class CreatePost extends Component {
  getActions() {
        return [AlignAction, DeleteAction];
  }
  renderQuill({ input }) {
    return (
      <ReactQuill
        modules={CreatePost.modules} 
        formats={CreatePost.formats}
        {...input}
        onChange={(newValue, delta, source) => {
          if (source === 'user') {
            input.onChange(newValue);
          }
        }}
        onBlur={(range, source, quill) => {
          input.onBlur(quill.getHTML());
        }}
      />
    );  
  }

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
    const { handleSubmit } = this.props;
    const author = this.props.userObj;
    return (
      <div id="create-post-wysiwyg">
        <div className="container">
        <h2 className="create-post-wysiwyg-title">Write Something Good</h2>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="title"
            label="Title"
            component={this.renderField} />
          <Field
            name="categories"
            label="Categories (seperate by commas)"
            component={this.renderField} />
          <Field 
            name="body" 
            label="Body"
            component={this.renderQuill}
          />
          <button type="submit" className="btn btn-primary">Create Post</button>
          <Link className="ml-2 btn btn-danger" to="/">Cancel</Link>
        </form>
        </div>
      </div>
    );
  }
}

CreatePost.modules = {
  blotFormatter: {},
  syntax: true,
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean'],
    ['code-block'],
  ]
}

CreatePost.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video', 'width', 'code-block'
]

function validate(values) {
  let errors = {};

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

const mapStateToProps = state => {
  return {
    userObj: state.access.user,
  };
};

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm',
})(
  connect(mapStateToProps, { createPost })
  (CreatePost));