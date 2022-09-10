import { Component } from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch = ({ message }) => {
    this.setState({ error: true, message });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage message={this.state.message} />;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
