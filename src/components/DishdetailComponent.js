import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, ModalBody, ModalHeader,
Modal, Row, Label} from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
  constructor (props){
    super(props);
    this.state = {
      isModalOpen: false
  };
  this.toggleModal = this.toggleModal.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);


  }
  toggleModal(){
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    // event.preventDefault();
}
 
  render() {
    return(
      <>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil" /> Submit Comment
        </Button>
          <Modal isOpen={this.state.isModalOpen} toggle = {this.toggleModal} >
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody >
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" id="rating" name="rating"
                                      className="form-control"
                                      validators={{
                                          required, minLength: minLength(3), maxLength: maxLength(15)
                                      }}
                                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        </Control.select>
                                      <Errors 
                                          className="text-danger"
                                          model=".firstname"
                                          show="touched"
                                          messages={{
                                              required: 'Required '
                                          }}
                                      />
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="author">Your Name</Label>
                        <Control.text model=".author" id="author" name="author"
                                      placeholder="Your Name"
                                      className="form-control"
                                      validators={{
                                          required, minLength: minLength(3), maxLength: maxLength(15)
                                      }}
                                      />
                                      <Errors 
                                          className="text-danger"
                                          model=".firstname"
                                          show="touched"
                                          messages={{
                                              required: 'Required ',
                                              minLength: 'Must be greater than 2 characters',
                                              maxLength: 'Must be 15 characters or less'
                                          }}
                                      />
                    </Row>
                    <Row className="form-group" >
                        <Label check>Comment</Label>
                        <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control"  
                                        validators={{
                                            required
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".message"
                                        show="touched"
                                        messages={{
                                            required: 'Digite sua mensagem. ',
                                        }}
                                    />
                    </Row>
                    <Button type="submit" color="primary">Submit</Button>
                </LocalForm>
            </ModalBody>
        </Modal>
      </>
    );
  } 
}
  

function RenderComments({comments}){
    if (comments !== null)
      return (
        <div className="col-12 col-md-6 m-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {comments.map((comment) => {  
              return(
                  <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, 
                    {new Intl.DateTimeFormat('en-US', 
                                    { year: 'numeric', 
                                      month: 'short', 
                                      day: '2-digit'}).format(new Date(Date.parse(comment.date)
                                          )
                                        )
                    }
                    </p>
                  </li>
              );
            })
            }
          <CommentForm />
          </ul>
          
        </div>
      );

  }
  function RenderDish({ dish }) {
      return (
        <div className="col-12 col-md-5 m-1">
           <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
          </Card>
          
        </div>
        
      );
    
  }
     

  const DishDetail = (props) => { 
    if (props.dish != null) { 
      return ( 
        <div className="container">
         
        <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to='/menu'>Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                {props.dish.name}
              </BreadcrumbItem>
            </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
          </div>
        </div>
          <div className="row">

            <RenderDish dish={ props.dish }/>
            <RenderComments comments={ props.comments }/>
            
          </div>
        </div>
        
      );
  }
  else{
      return (
        <div></div>
      );
    }
  }
  


export default DishDetail;