import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Authenticated: false,
    };
  }
 getJwt = () => {
    return localStorage.getItem('AuthToken');
}
  componentDidMount() {
    const { history } = this.props;
    const jwt =this.getJwt();
    if (!jwt) {
      history.push('/login');
    } else {
      this.setState({ Authenticated: true });
    }
  }

  render() {
    const { children } = this.props;
    const { Authenticated } = this.state;
    if (Authenticated === false) {
      return (
        <div>loading....</div>
      );
    }
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default withRouter(Auth);
