import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import { betfundApi } from '../../../api'

/**
 * Subclass of `React.Component` handling User forgetting password.
 */
class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      message: null,
      username: '',
    };
  }

  /**
   * Handles updating state. Updates `username`.
   */
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   * Handles forgotten password action.
   */
  handleForgotPassword = () => {
    // Set state of current action
    this.setState({ error: null });
    this.setState({ loading: true });

    // Get reset password information sent to email
    betfundApi.passwordRecovery(this.state.username).then(
      (response) => {
        this.setState({ loading: true });
        // === is equivalent to ==, ESLint prefers ===
        if (response.status > 400) {
          this.setState({ error: response.msg });
          this.setState({ loading: false });
        } else{
          response.json().then(
            (data) => {
              this.setState({ message: data.msg });
            }
          )
        }
      },
      (error) => {
        // This happens if the API resource is not active
        this.props.history.push('/500')
      }
    )
  }

  /**
   * Function to display error alert for bad login attempt.
   */
  errorAlert = () => {
    if (this.state.error) {
      return (
        <Alert color="danger">
          { this.state.error }
        </Alert>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.state.message) {
      // If user has successfully request a new password, render email has been sent
      return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <h1>Forgot password</h1>
                      <p className="text-muted">{ this.state.message }</p>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      // Return forgot password page
      return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                { this.errorAlert() }
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form onSubmit={this.handleForgotPassword}>
                        <h1>Forgot password</h1>
                        <p className="text-muted">Enter your email to begin password recovery</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="email"
                            placeholder="Email"
                            autoComplete="username"
                            id="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required={true}
                          />
                        </InputGroup>
                        <Row>
                          <Col xs="4">
                            <Button color="primary" className="px-4" disabled={this.state.loading}>
                              {this.state.loading ? 'Loading...' : 'Submit'}
                            </Button>
                          </Col>
                          <Col xs="8" className="text-right">
                            <Link to="/login" color="link" className="px-0">Remember your password?</Link>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default ForgotPassword;
