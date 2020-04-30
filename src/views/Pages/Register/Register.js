import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { betfundApi } from '../../../api'

/**
 * Subclass of `React.Component` handling User registration.
 */
class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    };
  }

  /**
   * Handles updating state. Updates `email`, `password`, `passwordRepeat`, `firstName`, `lastName`.
   */
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   * Handles registration action.
   */
  handleRegister = () => {
    // Set state of current action
    this.setState({ error: null });
    this.setState({ loading: true });

    // Check if `password` and `passwordRepeat` are the same
    if (this.state.password !== this.state.passwordRepeat) {
      this.setState({ error: 'The passwords do not match.' });
      return;
    }

    // Get access token from auth endpoint
    betfundApi.createUser(
      this.state.email,
      this.state.password,
      this.state.firstName,
      this.state.lastName
    ).then(
      (response) => {
        this.setState({ loading: true });
        // === is equivalent to ==, ESLint prefers ===
        if (response.status === 400) {
          // Bad credentials passed
          // TODO: Change this to read the message from API
          this.setState({ error: 'A user with this email already exists.' });
          this.setState({ loading: false });
        } else if (response.status > 400) {
          // If anything greater than 400, something is wrong
          this.setState({ error: 'Unknown error occurred.' });
          this.setState({ loading: false });
        } else{
          response.json().then(
            (data) => {
              // If we haven't hit any response issues, we should be good
              // Redirect them to login
              this.props.history.push('/login')
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
   * Function to display error alert for bad registration attempt.
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
            <Col md="9" lg="7" xl="6">
              { this.errorAlert() }
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleRegister}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="First name"
                        autoComplete="first-name"
                        id="firstName"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                        required={true}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Last name"
                        autoComplete="last-name"
                        id="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                        required={true}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required={true}
                      />
                    </InputGroup>
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
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
