import React, { Component } from 'react';
import socket from 'socket.io-client';

import api from '../services/api';

export default class Livro extends Component {
    state = {
        book: [],
        userInfo: false,
    }

    async componentDidMount() {
        this.subscribeToEvents();

        const book = await api.get('books/' + this.props.match.params.id)

        let user = await api.get('users/' + this.props.bookcard);

        let haveBook = false;

        if (user) if (user.data) if (user.data[0]) if (user.data[0].books) haveBook = true;

        this.setState({
            book: book.data,
            userInfo: haveBook
        });
    }

    subscribeToEvents = () => {
        const io = socket('http://localhost:3001');

        io.on('reservedBook', data => {
            console.log(data);
            this.setState({ book_avaliable: data })
        });

        io.on('bookAvaliable', data => {
            console.log(data);
            this.setState({ book_avaliable: data })
        });
    }

    reservingBook = async (user, book) => {
        try {
            const response = await api.put('users/' + user + '/' + book);

            if (!response) return alert('Ocorreu um erro ao reservar o livro.');

            await alert('Livro reservado com sucesso!');

            return this.props.history.push('/home');
        } catch (e) {
            return alert('Ocorreu um erro ao reservar o livro => ' + e);
        }
    }

    render() {
        const { book, userInfo } = this.state;
        const { bookcard } = this.props;
        return (
            <div className="flex-livroInfo">
                <h2>{book.name}</h2>
                <span>{book.author}</span>
                <span>{book.category}</span>
                {book.avaliable && userInfo === false 
                    ? <button disabled={book.avaliable === false || userInfo === true} onClick={() => this.reservingBook(bookcard, book._id)}>Reservar</button>
                    : userInfo === true
                        ? <button disabled={book.avaliable === false || userInfo === true}>Você já reservou um livro.</button>
                        : <button disabled={book.avaliable === false || userInfo === true}>Livro reservado :(</button>
                }
            </div>
        );
    }
}
