import React, { Component } from 'react';
import { Card, CardBody, CardGroup, CardHeader, Col, Row, Table } from 'reactstrap';
import sportIdMap from '../../mappings'
import Widget04 from '../Widgets/Widget04'

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

  hasOdds() {
    if (this.state.item.data.odds !== 'undefined') {
      this.setState({
        hasOdds: false
      })
    } else {
      this.setState({
        hasOdds: true
      })
    }
  }

  oddsController() {
    var odds = this.state.item.data.odds;
    var oddsArray = []

    for (let [key, value] of Object.entries(odds)) {
      console.log(`${key}: ${value}`)
      oddsArray.push(value)
    };

    this.setState({
      odds: oddsArray
    })
  }

  componentDidMount() {
    this.oddsController()
  }

  render() {
    const { error, isLoaded, hasOdds, item, odds } = this.state;
    console.log(item.data.odds)

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <CardGroup className="mb-4">
              <Widget04 color="info" header={
                `${item.data.away.name} vs. ${item.data.home.name}`
              } value="100"> {sportIdMap[item.data.sport_id]} - {item.data.league.name}
              </Widget04>
            </CardGroup>
          </Row>
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
                  </tr>
                </thead>
                <tbody>
                  {
                    odds.map(item => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      );
    }
  }
}

export default EventOdds;
