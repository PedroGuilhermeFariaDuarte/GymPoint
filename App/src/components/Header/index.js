import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Assets
import LogoHeader from '../../assets/LogoHeader.png';

// Style
import { Container, Logo, List, User } from './styles';

function Header() {
    const [admnistrador, setAdmnistrador] = useState({});
    const { nome, email, token } = useSelector(state => state.Auth);
    useEffect(() => {
        setAdmnistrador({ nome, email, token });
    }, []);
    return (
        <Container>
            <Logo>
                <img src={LogoHeader} alt="Logo Gympont" />
            </Logo>
            <List>
                <li>
                    <Link to="/home">ALUNOS</Link>
                </li>
                <li>
                    <Link to="/plan">PLANOS</Link>
                </li>
                <li>
                    <Link to="/enrollment">MATRÍCULAS</Link>
                </li>
                <li>
                    <Link to="/help">PEDIDOS DE AUXÍLIO</Link>
                </li>
            </List>
            <User>
                <strong>{admnistrador.nome}</strong>
                <span>Sair do sistema</span>
            </User>
        </Container>
    );
}

export default Header;
