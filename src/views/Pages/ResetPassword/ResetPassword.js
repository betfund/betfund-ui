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
 * Subclass of `React.Component` handling User resetting their password.
 */
class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      message: null,
      newPassword: '',
      newPasswordRepeat: '',
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
  handlePasswordReset = () => {
    // Set state of current action
    this.setState({ error: null });
    this.setState({ loading: true });

    // Check if `password` and `passwordRepeat` are the same
    if (this.state.newPassword !== this.state.newPasswordRepeat) {
      this.setState({ error: 'The passwords do not match.' });
      return;
    }

    // Get reset password information sent to email
    betfundApi.resetPassword(
      this.state.newPassword,
      this.props.match.params.token
    ).then(
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
        <Alert color="danger">{this.state.error}</Alert>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.state.message) {
      debugger;
      // If user has successfully set a new password, display message
      // and prompt redirect
      return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <h1>Reset password</h1>
                      <p className="text-muted">{this.state.message}</p>
                      <Link to="/login" color="link" className="px-0">Login in to continue &rarr;</Link>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      // Return reset password page
      return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                {this.errorAlert()}
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form onSubmit={this.handlePasswordReset}>
                        <h1>Reset password</h1>
                        <p className="text-muted">Enter your new password</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required={true}
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Repeat password"
                            autoComplete="new-password"
                            id="passwordRepeat"
                            value={this.state.passwordRepeat}
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
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      )
    };
  }
}

export default ResetPassword;
