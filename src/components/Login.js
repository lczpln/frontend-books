import React from 'react';
import { Link } from 'react-router-dom';

import api from '../services/api';

const Spinner = require('react-spinkit');

export default class Login extends React.Component {
    state = {
        loging: false,
        error: false,
        errormsg: '',
    }

    async componentDidMount() {
        if(this.props.logged === true) return await this.props.history.push('/home');
    }

    loginButton = async () => {
        this.setState({ loging: !this.state.loging });
        const response = await api.get('users/' + this.props.username);
        await setTimeout(() => { this.setState({ loging: !this.state.loging }) }, 2000)
        if (response.data === '' || response.data.password !== this.props.password) {
            return this.setState({
                error: true,
                errormsg: 'ocorreu um erro ao logar, verifique seus dados.',
            });
        }
        await this.props.userSetBookCard();
        await this.props.userSetLogged();
        return this.props.history.push('/home');
    }

    handlerKeyPress = (e) => {
        if (e.keyCode !== 13 || this.props.username === '') return false;

        this.loginButton();
    }

    render() {
        const { username } = this.props;
        const { loging, error, errormsg } = this.state;
        return (
            <div className="login-div" onKeyDown={(e) => this.handlerKeyPress(e)}>
                <span>BookCard</span>
                <input type="number" placeholder="Número do seu cartão" onChange={(e) => this.props.handleChangeUsername(e)} />
                <span>Senha</span>
                <input type="password" placeholder="Sua senha" onChange={(e) => this.props.handleChangePassword(e)} />
                <button disabled={loging === true || username === ''} onClick={() => this.loginButton()}>Login</button>
                <p>Ainda não tem cadastro ?  <Link to={'/home'}>Clica aqui</Link>, é rapidinho!</p>
                {loging
                    ? <Spinner name="ball-clip-rotate" color="white" />
                    : null
                }
                {error && !loging
                    ? <p>{errormsg}</p>
                    : null
                }
            </div>
        );
    }
}