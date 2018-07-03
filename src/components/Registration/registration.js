import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from '../input';
import {
    required,
    atLeastEight,
    isValidEmail,
    emailTooLong,
    passwordsMatch
} from './validators';

class RegistrationForm extends React.Component {
    onSubmit(values) {
        console.log(values);
    }

    render() {
        return (
            <form
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}
            >
                <Field
                    name="firstName"
                    type="text"
                    component={Input}
                    label="First Name"
                    validate={[required]}
                />
                <Field
                    name="lastName"
                    type="text"
                    component={Input}
                    label="Last Name"
                    validate={[required]}
                />
                <Field
                    name="username"
                    type="text"
                    component={Input}
                    label="Username"
                    validate={[required, atLeastEight]}
                />
                <Field
                    name="email"
                    type="text"
                    component={Input}
                    label="Email"
                    // // Add an element prop to change the type of input
                    // element="select"
                    validate={[required, isValidEmail]}
                />
                <Field
                    name="password"
                    type="password"
                    component={Input}
                    label="Password"
                    validate={[required, atLeastEight, emailTooLong]}
                />
                <Field
                    name="confirmPassword"
                    type="password"
                    component={Input}
                    label="Confirm Password"
                    validate={[
                        required,
                        atLeastEight,
                        emailTooLong,
                        passwordsMatch
                    ]}
                />
                <button type="submit">Register</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration'
})(RegistrationForm);
