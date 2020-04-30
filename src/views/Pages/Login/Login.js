import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { betfundApi } from '../../../api'

/**
 * Subclass of `React.Component` handling User login.
 */
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      username: '',
      password: ''
    };
  }

  /**
   * Handles updating state. Updates `username` and `password`.
   */
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   * Handles login action.
   */
  handleLogin = () => {
    // Set state of current action
    this.setState({ error: null });
    this.setState({ loading: true });

    // Get access token from auth endpoint
    betfundApi.logInGetToken(this.state.username, this.state.password).then(
      (response) => {
        sessionStorage.removeItem('token');
        this.setState({ loading: true });
        // === is equivalent to ==, ESLint prefers ===
        if (response.status === 400) {
          // Bad credentials passed
          this.setState({ error: 'Incorrect username/password combination. Try again.' });
          this.setState({ loading: false });
        } else if (response.status > 400) {
          // If anything greater than 400, something is wrong with account
          this.setState({ error: 'Unknown error occurred.' });
          this.setState({ loading: false });
        } else{
          response.json().then(
            (data) => {
              // If we haven't hit any response issues, we should be good to save the token
              sessionStorage.setItem('token', data.access_token);
              this.props.history.push('/dashboard')
            }
          )
        }
      },
      (error) => {
        // This happens if the API resource is not active
        this.setState({ loading: false })
        this.setState({ error: 'Something went wrong, please try again later.' });
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
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              { this.errorAlert() }
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleLogin}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="email"
                          placeholder="Username"
                          autoComplete="username"
                          id="username"
                          value={this.state.username}
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
                          placeholder="Password"
                          autoComplete="current-password"
                          id="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" disabled={this.state.loading}>
                            {this.state.loading ? 'Loading...' : 'Login'}
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Link color="link" className="px-0">Forgot password?</Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
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

export default Login;
