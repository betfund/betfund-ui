import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://google.com">StreetCred</a> &copy; 2020. All rights reserved.</span>
        <span className="ml-auto">
          <i className="fa fa-twitter" style={{margin: '8px', color: 'gray'}}></i>
          <i className="fa fa-instagram" style={{margin: '8px', color: 'gray'}}></i>
          <i className="fa fa-youtube" style={{margin: '8px', color: 'gray'}}></i>
          <i className="fa fa-facebook" style={{margin: '8px', color: 'gray'}}></i>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
