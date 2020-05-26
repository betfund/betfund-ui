import React, { Component } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardGroup,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Table
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Widget01 from '../../Widgets/Widget01';
import { betfundApi } from '../../../api'


class ViewFunds extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);

    this.state = {
      error: null,
      isLoaded: false,
      userData: {},
      userLedgerData: [],
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  /**
   * Handles updating state.
   */
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  getMe() {
    betfundApi.getMe()
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            userData: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  getUserLedger() {
    betfundApi.getUserLedger()
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            userLedgerData: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  /**
   * Creates a user deposit via API.
   */
  submitDeposit = (e) => {
    e.preventDefault();

    var now = new Date();
    var data = {
      amount: parseInt(this.state.depositAmount),
      timestamp: now.toJSON(),
    };

    betfundApi.createUserLedger(data).then(
      (response) => {
        this.setState({ loading: true });
        // === is equivalent to ==, ESLint prefers ===
        if (response.status === 400) {
          // Bad information passed
          this.setState({ error: "Something went wrong." });
          this.setState({ loading: false });
        } else if (response.status > 400) {
          // If anything greater than 400, something is wrong
          this.setState({ error: "Something went wrong, please try again." });
          this.setState({ loading: false });
        } else {
          response.json().then(
            (data) => {
              // If succesfully created a fund, push to fund page
              window.location.reload();
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
   * Creates a user withdrawal via API.
   */
  submitWithdrawal = (e) => {
    e.preventDefault();

    var now = new Date();
    var data = {
      amount: -parseInt(this.state.withdrawAmount),
      timestamp: now.toJSON(),
    };

    betfundApi.createUserLedger(data).then(
      (response) => {
        this.setState({ loading: true });
        // === is equivalent to ==, ESLint prefers ===
        if (response.status === 400) {
          // Bad information passed
          this.setState({ error: "Something went wrong." });
          this.setState({ loading: false });
        } else if (response.status > 400) {
          // If anything greater than 400, something is wrong
          this.setState({ error: "Something went wrong, please try again." });
          this.setState({ loading: false });
        } else {
          response.json().then(
            (data) => {
              // If succesfully created a fund, push to fund page
              window.location.reload();
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

  timeConvert(timestring) {
    var date = new Date(timestring);
    return date.toLocaleString();
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  componentDidMount() {
    this.getMe()
    this.getUserLedger()
  }

  /**
   * Function to display error alert for bad form submission attempt.
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
    const {
      error,
      isLoaded,
      userData,
      userLedgerData,
      depositAmount,
      withdrawAmount
    } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <CardGroup className="mb-4">
                <Widget01
                  color="info"
                  header={userData.first_name + ' ' + userData.last_name}
                  smallText={'User ID: ' + userData.id}
                >
                </Widget01>
              </CardGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.errorAlert()}
              <Card>
                <CardHeader>
                  Deposit Money
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.submitDeposit}>
                    <FormGroup>
                      <InputGroup>
                        <Input
                          type="number"
                          id="depositAmount"
                          name="deposit-amount-input"
                          placeholder="Amount"
                          value={depositAmount}
                          onChange={this.handleChange}
                          required={true}
                        />
                        <InputGroupAddon addonType="append">
                          <Button type="submit" color="success">Deposit</Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardHeader>
                  Withdraw Money
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.submitWithdrawal}>
                    <FormGroup>
                      <InputGroup>
                        <Input
                          type="number"
                          id="withdrawAmount"
                          name="withdraw-amount-input"
                          placeholder="Amount"
                          value={withdrawAmount}
                          onChange={this.handleChange}
                          required={true}
                        />
                        <InputGroupAddon addonType="append">
                          <Button type="submit" color="danger">Withdraw</Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardHeader>
                  Create Fund
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Link to="/funds/create">
                      <Button type="button" color="primary">Start your own fund!</Button>
                    </Link>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  Account
                </CardHeader>
                <CardBody>
                  <Table>
                    <thead>
                      <tr>
                        <th>TransactionID</th>
                        <th>Timestamp</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        userLedgerData.map(item => (
                          <tr>
                            <td>{item.id}</td>
                            <td>{item.timestamp}</td>
                            <td>{item.amount}</td>
                            <td>Approved</td>
                          </tr>
                        ))
                      }
                    </tbody>
                    <tfoot>
                      <tr>
                        <td></td>
                        <td></td>
                        <td><strong>{
                          userLedgerData.reduce(
                            (a, b) => a + (b['amount'] || 0), 0)
                        }
                        </strong></td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )
    }
  }
}

export default ViewFunds;
