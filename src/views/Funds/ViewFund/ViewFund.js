import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardGroup, CardHeader, Col, Row, Table } from 'reactstrap';
import Widget01 from '../../Widgets/Widget01';
import { betfundApi } from '../../../api'

class ViewFund extends Component {

  constructor(props) {
    super(props);

    //   this.toggle = this.toggle.bind(this);
    //   this.toggleFade = this.toggleFade.bind(this);

    this.state = {
      error: null,
      isLoaded: false,
      item: {},
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  getFund() {
    var fundId = this.props.match.params.id
    betfundApi.getFund(fundId)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            item: result
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
    this.getFund()
  }

  timeConvert(timestring) {
    var date = new Date(timestring);
    return date.toLocaleString();
  }

  render() {
    console.log(this.state.item)
    const { error, isLoaded, item } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Widget01 color="success" header={item.name} mainText={item.owner_id}/>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget01 color="info" header={this.timeConvert(item.timestamp)} mainText={item.description} />
          </Col>
        </Row>
        </div>
      )
    }
  }
}

export default ViewFund;
