import React from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    state = {
        books: [],
    }

    async componentDidMount() {
        if(this.props.logged === false) return await this.props.history.push('/');

        const response = await api.get('books');

        if (!response) return alert('Erro de conexão com a API.');

        this.setState({ books: response.data })
    }

    reservingBook = (user_id, book_id) => {
        console.log(user_id);
    }

    render() {
        const { books } = this.state;
        const { bookcard} = this.props;
        return (
            <div className="grid-home">
                {books.map(book => (
                    <article key={book._id}>
                        <h2>{book.name}</h2>
                        (imagem do livro)
                        <span>Autor: {book.author}</span>
                        <span>Categoria: {book.category}</span>
                        <Link to={"/books/" + book._id} ><button>Ver Mais</button></Link>
                    </article>
                ))}
            </div>
        );
    }
}