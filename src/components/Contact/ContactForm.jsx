import React, { Component } from 'react'
import axios from 'axios';

class ContactForm extends Component {

    handleSubmit(e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        axios({
            method: 'POST',
            url: "/api/send",
            data: {
                name: name,
                email: email,
                message: message
            },
        }).then((response) => {
            if (response.data.msg === 'success') {
                //  TODO: replace this with a class added to the form id that will update styles
                alert("Message Sent.");
                this.resetForm()
            } else if (response.data.msg === 'fail') {
                alert("Message failed to send.")
            }
        })
    }


    resetForm() {
        document.getElementById('contact-form').reset();
    }

    render() {
        return (
            <div className="container">
                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" name="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail">Email Address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="email" name="email" aria-label="email-message" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea className="form-control" rows="5" id="message" name="message"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default ContactForm;