import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import Nav from "./Component/Nav";
import Book from "./Component/Book";
import Jumbotron from "./Component/Jumbotron";
import Card from "./Component/Card";
import Footer from "./Component/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Container>
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1 className="text-center">
                  <strong>(React) Google Books Search </strong>
                </h1>
                <h2 className="text-center">Here you can Search and Save your Favorite Books!</h2>
              </ Jumbotron>
            </ Col>
            <Col size="md-12">
              <Card title="Book Search" icon="far fa-book">
                <Form
                  handleInputChange={this.handleInputChange}
                  handleFormSubmit={this.handleFormSubmit}
                  q={this.state.q}
                />
              </ Card>
            </ Col>
          </ Row>
          <Row>
            <Col size="md-12">
              <Card title="Results">
                {this.state.books.length ? (
                  <List>
                    {this.state.books.map(book => (
                      <Book
                        key={book.id}
                        title={book.volumeInfo.title}
                        subtitle={book.volumeInfo.subtitle}
                        link={book.volumeInfo.infoLink}
                        authors={book.volumeInfo.authors.join(", ")}
                        description={book.volumeInfo.description}
                        image={book.volumeInfo.imageLinks.thumbnail}
                        Button={() => (
                          <button
                            onClick={() => this.handleBookSave(book.id)}
                            className="btn btn-primary ml-2"
                          >
                            Save
                        </button>
                        )}
                      />
                    ))}
                  </List>
                ) : (
                    <h2 className="text-center">{this.state.message}</h2>
                  )}
              </Card>
            </Col>
          </Row>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default App;