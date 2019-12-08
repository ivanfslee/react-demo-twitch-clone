import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => { //load google api oauth2 after render for the first time. Second arg is a callback function that runs after gapi.load is finished
            window.gapi.client.init({ //init returns a promise
                clientId: '646347048851-9saufr0oillujfujiv2c2jn5sln5gv1f.apps.googleusercontent.com', //this is our apps clientId
                scope: 'email' //we want access to their email
            }).then(() => { //then runs a callback once auth library has loaded
                this.auth = window.gapi.auth2.getAuthInstance(); //this.auth is auth obj that has many different methods for us to manipulate google oauth
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange); //auth's isSignedIn obj has a listen method that we can pass a callback to
            });
        }); 
    }

    onAuthChange = (isSignedIn) => { //arrow function because this will be a callback func, so as to not rebind 'this' keyword
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId()); //argument gets google id number of user who is signing in. currentUser.get().getId() are google auth obj methods to get google id  
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui blue google button">
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);