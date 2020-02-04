import React from 'react';
import { MdClose, MdSend } from 'react-icons/md';

// Styles
import { ContainerChat, Chat, InputMessage, Message } from './styles';
function BoxChat() {
    return (
        <ContainerChat>
            <div className="header">
                <span>Pedro Guilherme</span>
                <MdClose size={12} color="#fff" />
            </div>
            <Chat>
                <Message>
                    <p>Olá!, seja bem-vindo ao chatGym</p>
                </Message>
                <Message send>Oi, muito obrigado</Message>
                <Message>chatGym, ainda em desenvolvimento!</Message>
            </Chat>
            <InputMessage>
                <input type="text" placeholder="digite sua mensagem" />
                <MdSend size={12} color="#EE4D64" />
            </InputMessage>
        </ContainerChat>
    );
}

export default BoxChat;
