import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { List } from "../components/List";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Saved extends Component {
    state = {
        books: []
    };

    componentDidMount() {
        API.getBook(this.props.match.params.id)
            .then(res => this.setState({ book: res.data }))
            .catch(err => console.log(err));
    }

    getSavedBooks = () => {
        API.getSavedBooks()
            .then(res =>
                this.setState({
                    books: res.data
                })
            )
            .catch(err => console.log(err));
    };

    handleBookDelete = id => {
        API.deleteBook(id).then(res => this.getSavedBooks());
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1 className="text-center">
                                <strong>(React) Google Books Search</strong>
                            </h1>
                            <h2 className="text-center">Search for and Save Books of Interest.</h2>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                        {this.state.books.length ? (
                            <List>
                                {this.state.books.map(book => (
                                    <Form
                                        key={book._id}
                                        title={book.title}
                                        subtitle={book.subtitle}
                                        link={book.link}
                                        authors={book.authors.join(", ")}
                                        description={book.description}
                                        image={book.image}
                                        Button={() => (
                                            <button
                                                onClick={() => this.handleBookDelete(book._id)}
                                                className="btn btn-danger ml-2"
                                            >
                                                Delete
                          </button>
                                        )}
                                    />
                                ))}
                            </List>
                        ) : (
                                <h2 className="text-center">No Saved Books</h2>
                            )}
                    </Col>
                </Row>
                <Footer />
            </Container >
        );
    }
}

export default Saved;

