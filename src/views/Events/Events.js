import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { betfundApi } from '../../api'
import sportIdMap from '../../mappings'
import { Link } from 'react-router-dom';

class Events extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  epochConvert(epoch) {
    var date = new Date(epoch * 1000);
    return date.toLocaleString();
  }

  getEvents() {
    var now = new Date()
    var asOf = Math.round(now.getTime() / 1000)

    betfundApi.upcomingEvents(asOf)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result.upcomingEvents
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

  componentDidMount() {
    this.getEvents()
    // this.timer = setInterval(() => this.getEvents(), 20000)
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
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Upcoming Events
              </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Sport</th>
                        <th>Home</th>
                        <th>Away</th>
                        <th>Event</th>
                        <th>Status</th>
                        <th>Odds</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        items.map(item => (
                          <tr key={item._id}>
                            <td>{this.epochConvert(item.data.time)}</td>
                            <td>{sportIdMap[item.data.sport_id]}</td>
                            <td>{item.data.home.name}</td>
                            <td>{item.data.away.name}</td>
                            <td>{item.data.league.name}</td>
                            <td>{item.data.time_status}</td>
                            <td>
                              <Link to={{
                                pathname: `/events/${item._id}`,
                                state: {
                                  item: item
                                }
                              }}><Button block color="success" disabled={!item.data.odds}>View Odds</Button>
                              </Link>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink previous tag="button"></PaginationLink>
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink next tag="button"></PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default Events;
