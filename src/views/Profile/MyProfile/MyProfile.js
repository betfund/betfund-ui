import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardGroup, CardHeader, Col, Row, Table } from 'reactstrap';
import Widget01 from '../../Widgets/Widget01';
import { betfundApi } from '../../../api'
import baseball1 from '../../../assets/img/sports/baseball1.jpeg'


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

  render() {
    const { error, isLoaded, userData, userLedgerData } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(this.state)
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
              <Card>
                <CardHeader>
                  Account
                </CardHeader>
                <CardBody>
                  <Table>
                    <thead>
                      <th>TransactionID</th>
                      <th>Timestamp</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </thead>
                    <tbody>
                      {
                        userLedgerData.map(item => (
                          <tr>
                            <td>{ item.id }</td>
                            <td>{ item.timestamp }</td>
                            <td>{ item.amount }</td>
                            <td>Approved</td>
                          </tr>
                        ))
                      }
                    </tbody>
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
