import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { betfundApi } from '../../api'
import sportIdMap from '../../mappings'

class EventOdds extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      odds: props.location.state.odds
    };
  }

  render() {
    const { error, isLoaded, odds } = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <div>
              <p>
                {odds.match_lines.id}
              </p>
          </div>
      );
    }
  }
}

export default EventOdds;
