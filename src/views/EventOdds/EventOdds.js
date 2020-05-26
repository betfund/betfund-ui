import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, CardHeader, Col, Row, Table } from 'reactstrap';
import sportIdMap from '../../mappings'
import Widget04 from '../Widgets/Widget04'
import { Link } from 'react-router-dom';


class EventOdds extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      hasOdds: false,
      item: props.location.state.item,
      odds: []
    };
  }

  oddsController() {
    var odds = this.state.item.data.odds;
    var oddsArray = []

    if (typeof odds != 'undefined') {
      for (let [key, value] of Object.entries(odds)) {
        console.log(`${key}: ${value}`)
        oddsArray.push(value)
      };
      this.setState({
        odds: oddsArray
      })
    } else {
      this.setState({
        odds: oddsArray
      })
    }
  }

  epochConvert(epoch) {
    var date = new Date(epoch * 1000);
    return date.toLocaleString();
  }

  componentDidMount() {
    this.oddsController()
  }

  render() {
    const { error, isLoaded, hasOdds, item, odds } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Event
              </CardHeader>
              <CardGroup className="mb-4">
                <Widget04 color="info" header={
                  `${item.data.away.name} vs. ${item.data.home.name}`
                } value="100"> {sportIdMap[item.data.sport_id]}: {item.data.league.name} | {this.epochConvert(item.data.time)}
                </Widget04>
              </CardGroup>
            </Card>
          </Row>
          <Row>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Bets
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Bet</th>
                      <th>Lines</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      odds.map(item => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>
                            <Link to={{
                              pathname: `/lines/${item.id}`,
                              state: {
                                item: item
                              }
                            }}><Button block color="success">View Lines</Button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Row>
        </div>
      );
    }
  }
}

export default EventOdds;
