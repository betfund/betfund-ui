import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
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
import baseball1 from '../../../assets/img/sports/baseball1.jpeg'


class CreateFunds extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Create Fund</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="fund-name-input">Fund Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="fund-name-input" name="fund-name-input" placeholder="Name of the fund..." />
                      <FormText color="muted">This will be the name of your fund</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Fund Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                             placeholder="Description of the fund..." />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3"><Label>Leagues</Label></Col>
                    <Col md="9">
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                        <Label check className="form-check-label" htmlFor="checkbox1">National Football League (NFL)</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2" value="option2" />
                        <Label check className="form-check-label" htmlFor="checkbox2">Major League Baseball (MLB)</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox3" name="checkbox3" value="option3" />
                        <Label check className="form-check-label" htmlFor="checkbox3">National Basketball Association (NBA)</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox4" name="checkbox4" value="option4" />
                        <Label check className="form-check-label" htmlFor="checkbox4">National Hockey League (NHL)</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox5" name="checkbox5" value="option5" />
                        <Label check className="form-check-label" htmlFor="checkbox5">NCAA Men's Basketball (NCAA MBB)</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox6" name="checkbox6" value="option6" />
                        <Label check className="form-check-label" htmlFor="checkbox6">NCAA College Football (NCAA CFB)</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3"><Label>Collective Wagers</Label></Col>
                    <Col md="9">
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                        <Label check className="form-check-label" htmlFor="checkbox1">Straight Up (1)</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2" value="option2" />
                        <Label check className="form-check-label" htmlFor="checkbox2">Straight Up (2)</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox3" name="checkbox3" value="option3" />
                        <Label check className="form-check-label" htmlFor="checkbox3">Straight Up (3)</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox4" name="checkbox4" value="option4" />
                        <Label check className="form-check-label" htmlFor="checkbox4">Two Team Parlay (1/2)</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox5" name="checkbox5" value="option5" />
                        <Label check className="form-check-label" htmlFor="checkbox5">Two Team Parlay (2/3)</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox6" name="checkbox6" value="option6" />
                        <Label check className="form-check-label" htmlFor="checkbox6">Two Team Parlay (1/3)</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox7" name="checkbox7" value="option7" />
                        <Label check className="form-check-label" htmlFor="checkbox7">Three Team Parlay (1/2/3)</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
    )
  }
}

export default CreateFunds;
