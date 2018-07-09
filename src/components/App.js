import React from 'react';
import MovieList from './movie-list';
import RegistrationForm from './Registration/registration';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { refreshAuthToken } from '../actions/auth';
import LoginForm from './login';
import Dashboard from './dashboard';

export class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            this.startPeriodicRefresh();
        }
        if (prevProps.loggedIn && !this.props.loggedIn) {
            this.stopPeriodicRefresh();
        }
    }

    componentWillMount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            15 * 60 * 1000
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <section>
                <Router>
                    <div>
                        <Route exact path="/" component={LoginForm} />
                        <Route exact path="/register" component={RegistrationForm} />
                        <Route path="/dashboard" component={Dashboard} />
                    </div>
                </Router>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(App);
