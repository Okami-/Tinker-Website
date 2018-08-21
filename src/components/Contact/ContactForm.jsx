import React, { Component } from 'react'
import axios from 'axios';

class ContactForm extends Component {

    handleSubmit(e){
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        axios({
            method: "POST",
            url: "http://localhost:3000/send",
            data: (
                name: name,
                email: email,
                message: message
            )
        }).then((response)=>{
            if(response.data.msg === 'success'){
                //  TODO: replace this with a class added to the form id that will update styles
                alert("Message Sent.");
                this.resetForm()
            } else if(response.data.msg === 'fail'){
                alert("Message failed to send.")
            }
        })
    }


    resetForm() {
        document.getElementById('contact-form').reset();
    }

    render() {
        return(
            <div>
            <form id="contact-form" action="/send" actiononSubmit={this.handleSubmit.bind(this)} method="POST">
                <div className="form-group">
                    <label for="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail">Email Address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="email" aria-label="email-message"/>
                </div>
                <div className="form-group">
                    <label for="message">Message</label>
                    <textarea className="form-control" rows="5" id="message" name="message" ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        )
    }
}

export default ContactForm;