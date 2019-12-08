import React from 'react';

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth2', () => { //load google api oauth2 after render for the first time. Second arg is a callback function that runs after gapi.load is finished
            window.gapi.client.init({ //init returns a promise
                clientId: '646347048851-9saufr0oillujfujiv2c2jn5sln5gv1f.apps.googleusercontent.com', //this is our apps clientId
                scope: 'email' //we want access to their email
            }).then(() => { //then runs a callback once auth library has loaded
                this.auth = window.gapi.auth2.getAuthInstance(); //this.auth is auth obj that has many different methods for us to manipulate google oauth
                this.setState( { isSignedIn: this.auth.isSignedIn.get() }) //isSignedIn is an auth obj method that returns boolean if we are signed in or not 
            });
        }); 
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return <div>I dont know if we are signed in</div>
        } else if (this.state.isSignedIn) {
            return <div>I am signed in~</div>
        } else {
            return <div>I am not signed in~</div>
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

export default GoogleAuth;