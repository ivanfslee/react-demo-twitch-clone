import React from 'react';
import { Field, reduxForm } from 'redux-form'; //reduxForm is like connect function, Field is a component

class StreamForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => { //input is from Field redux-form component - it passes in a bunch of properties. meta property contains the errors from validate function
        //console.log(meta);
        //console.log(input);
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    //if user input into form is valid - onSubmit will run , that will run createStream action creator which will make an axios post request to api server 
    onSubmit = formValues => {
        //event.preventDefault();
        console.log(formValues);
        this.props.onSubmit(formValues);
    }

    render() {
        console.log(this.props);
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}className="ui error form">
                <Field name="title" component={this.renderInput} label="Enter Title" /> 
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

//form validation - basic 
const validate = (formValues) => { //formValues contains all the values inside our form
    const errors = {};

    if (!formValues.title) { //if user did not enter a title
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
};

export default reduxForm({ 
    form: 'streamForm', 
    validate: validate 
})(StreamForm);
