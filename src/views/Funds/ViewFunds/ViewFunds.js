import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
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
      items: [],
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  getFunds() {
    betfundApi.getFunds()
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result
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

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  componentDidMount() {
    this.getFunds()
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            {
              items.map(item => (
                <Col xs="12" sm="6" md="4">
                  <Card>
                    <CardHeader>
                      <b>{item.name}</b> (ID: {item.id})
                    </CardHeader>
                    <CardBody>
                      <img src={baseball1} width="100%" />
                      <br />
                      <br />
                      {item.description}
                      <br />
                      <br />
                      <Table responsive size="sm">
                        <tbody>
                          <tr>
                            <th>Timestamp</th>
                            <td>{item.timestamp}</td>
                          </tr>
                          <tr>
                            <th>Details</th>
                            <td>{JSON.stringify(item.details)}</td>
                          </tr>
                          <tr>
                            <th>Owner</th>
                            <td>{item.owner_id}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </div>
      )
    }
  }
}

export default ViewFunds;
