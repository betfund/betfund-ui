import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import { betfundApi } from '../../../api'


class CreateFunds extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      message: null,
      fundName: null,
      fundDescription: null,
      fundLeages: [],
      fundCapitalAllocation: {},
      fundPicksAvailable: [],
      fundWageringDays: []
    };
  }

  /**
   * Handles updating state.
   */
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   * Creates a fund via API.
   */
  createFund = (e) => {
    e.preventDefault();

    var now = new Date();
    var data = {
      name: this.state.fundName,
      description: this.state.fundDescription,
      timestamp: now.toJSON(),
      details: {}
    };
    betfundApi.createFund(data).then(
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
              this.props.history.push(`/funds/view/${data.id}`)
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
    return (
      <Row>
        <Col xs="12" md="12">
          {this.errorAlert()}
          <Card>
            <Form onSubmit={this.createFund} className="form-horizontal">
              <CardHeader>
                <strong>Create Fund</strong>
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="fund-name-input">Fund Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="fundName"
                      name="fund-name-input"
                      placeholder="Name of the fund..."
                      value={this.state.fundName}
                      onChange={this.handleChange}
                      required={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="textarea-input">Fund Description</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="textarea"
                      name="textarea-input"
                      id="fundDescription"
                      rows="9"
                      placeholder="Description of the fund..."
                      value={this.state.fundDescription}
                      onChange={this.handleChange}
                      required={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3"><Label>Leagues</Label></Col>
                  <Col md="9">
                    <FormGroup check className="checkbox">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="fund-sport-input1"
                        name="fund-sport-input1"
                        value="fund-sport-input-nfl"
                      />
                      <Label check className="form-check-label" htmlFor="fund-sport-input1">National Football League (NFL)</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-sport-input2" name="fund-sport-input2" value="fund-sport-input-mlb" />
                      <Label check className="form-check-label" htmlFor="fund-sport-input2">Major League Baseball (MLB)</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-sport-input3" name="fund-sport-input3" value="fund-sport-input-nba" />
                      <Label check className="form-check-label" htmlFor="fund-sport-input3">National Basketball Association (NBA)</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-sport-input4" name="fund-sport-input4" value="fund-sport-input-nhl" />
                      <Label check className="form-check-label" htmlFor="fund-sport-input4">National Hockey League (NHL)</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-sport-input5" name="fund-sport-input5" value="fund-sport-input-ncaambb" />
                      <Label check className="form-check-label" htmlFor="fund-sport-input5">NCAA Men's Basketball (NCAA MBB)</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-sport-input6" name="fund-sport-input6" value="fund-sport-input-ncaacfb" />
                      <Label check className="form-check-label" htmlFor="fund-sport-input6">NCAA College Football (NCAA CFB)</Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3"><Label>Capital Allocation</Label></Col>
                  <Col md="9">
                    <Row>
                      <Col md="2">
                        <Input type="select" name="selectSm" id="SelectLm" bsSize="sm">
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="10">10%</option>
                          <option value="15">15%</option>
                          <option value="20">20%</option>
                          <option value="25">25%</option>
                          <option value="30">30%</option>
                        </Input>
                      </Col>
                      <Col md="10">
                        <Label className="form-check-label">Straight Up (1)</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="2">
                        <Input type="select" name="selectSm" id="SelectLm" bsSize="sm">
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="10">10%</option>
                          <option value="15">15%</option>
                          <option value="20">20%</option>
                          <option value="25">25%</option>
                          <option value="30">30%</option>
                        </Input>
                      </Col>
                      <Col md="10">
                        <Label className="form-check-label">Straight Up (2)</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="2">
                        <Input type="select" name="selectSm" id="SelectLm" bsSize="sm">
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="10">10%</option>
                          <option value="15">15%</option>
                          <option value="20">20%</option>
                          <option value="25">25%</option>
                          <option value="30">30%</option>
                        </Input>
                      </Col>
                      <Col md="10">
                        <Label className="form-check-label">Straight Up (3)</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="2">
                        <Input type="select" name="selectSm" id="SelectLm" bsSize="sm">
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="10">10%</option>
                          <option value="15">15%</option>
                          <option value="20">20%</option>
                          <option value="25">25%</option>
                          <option value="30">30%</option>
                        </Input>
                      </Col>
                      <Col md="10">
                        <Label className="form-check-label">Two Team Parlay (1/2)</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="2">
                        <Input type="select" name="selectSm" id="SelectLm" bsSize="sm">
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="10">10%</option>
                          <option value="15">15%</option>
                          <option value="20">20%</option>
                          <option value="25">25%</option>
                          <option value="30">30%</option>
                        </Input>
                      </Col>
                      <Col md="10">
                        <Label className="form-check-label">Two Team Parlay (2/3)</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="2">
                        <Input type="select" name="selectSm" id="SelectLm" bsSize="sm">
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="10">10%</option>
                          <option value="15">15%</option>
                          <option value="20">20%</option>
                          <option value="25">25%</option>
                          <option value="30">30%</option>
                        </Input>
                      </Col>
                      <Col md="10">
                        <Label className="form-check-label">Two Team Parlay (1/3)</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="2">
                        <Input type="select" name="selectSm" id="SelectLm" bsSize="sm">
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="10">10%</option>
                          <option value="15">15%</option>
                          <option value="20">20%</option>
                          <option value="25">25%</option>
                          <option value="30">30%</option>
                        </Input>
                      </Col>
                      <Col md="10">
                        <Label className="form-check-label">Three Team Parlay (1/2/3)</Label>
                      </Col>
                    </Row>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3"><Label>Picks Available</Label></Col>
                  <Col md="9">
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-pick-input1" name="fund-pick-input1" value="fund-pick-input-to" />
                      <Label check className="form-check-label" htmlFor="fund-pick-input1">Total Over</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-pick-input2" name="fund-pick-input2" value="fund-pick-input-tu" />
                      <Label check className="form-check-label" htmlFor="fund-pick-input1">Total Under</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-pick-input3" name="fund-pick-input3" value="fund-pick-input-fhats" />
                      <Label check className="form-check-label" htmlFor="checkbox3">Favorite/Home ATS</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-pick-input4" name="fund-pick-input4" value="fund-pick-input-faats" />
                      <Label check className="form-check-label" htmlFor="checkbox4">Favorite/Away ATS</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-pick-input5" name="fund-pick-input5" value="fund-pick-input-fhml" />
                      <Label check className="form-check-label" htmlFor="checkbox5">Favorite/Home Money Line</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-pick-input6" name="fund-pick-input6" value="fund-pick-input-faml" />
                      <Label check className="form-check-label" htmlFor="fund-pick-input6">Favorite/Away Money Line</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-pick-input7" name="fund-pick-input7" value="fund-pick-input-uhats" />
                      <Label check className="form-check-label" htmlFor="fund-pick-input7">Underdog/Home ATS</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-pick-input8" name="fund-pick-input8" value="fund-pick-input-uaats" />
                      <Label check className="form-check-label" htmlFor="fund-pick-input8">Underdog/Away ATS</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-pick-input9" name="fund-pick-input9" value="fund-pick-input-uhml" />
                      <Label check className="form-check-label" htmlFor="fund-pick-input9">Underdog/Home Money Line</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-pick-input10" name="fund-pick-input10" value="fund-pick-input-uaml" />
                      <Label check className="form-check-label" htmlFor="fund-pick-input10">Underdog/Away Money Line</Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3"><Label>Wagering Days</Label></Col>
                  <Col md="9">
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-day-input1" name="fund-day-input1" value="fund-day-input-monday" />
                      <Label check className="form-check-label" htmlFor="fund-day-input1">Monday</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-day-input2" name="fund-day-input2" value="fund-day-input-tuesday" />
                      <Label check className="form-check-label" htmlFor="fund-day-input2">Tuesday</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-day-input3" name="fund-day-input3" value="fund-day-input-wednesday" />
                      <Label check className="form-check-label" htmlFor="fund-day-input3">Wednesday</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-day-input4" name="fund-day-input4" value="fund-day-input-thursday" />
                      <Label check className="form-check-label" htmlFor="fund-day-input4">Thursday</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-day-input5" name="fund-day-input5" value="fund-day-input-friday" />
                      <Label check className="form-check-label" htmlFor="fund-day-input5">Friday</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-day-input6" name="fund-day-input6" value="fund-day-input-saturday" />
                      <Label check className="form-check-label" htmlFor="fund-day-input6">Saturday</Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input className="form-check-input" type="checkbox" id="fund-day-input7" name="fund-day-input7" value="fund-day-input-sunday" />
                      <Label check className="form-check-label" htmlFor="fund-day-input7">Sunday</Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              </CardFooter>
            </Form>

          </Card>
        </Col>
      </Row>
    )
  }
}

export default CreateFunds;
