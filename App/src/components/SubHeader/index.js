import React from 'react';
import { Container, UserGroup, SearchContainer } from './styles';

function SubHeader({
    history,
    titlePage,
    nextPageName,
    nextPageRoute,
    callBackPage,
    disabledInputSearch,
}) {
    function handlerLink() {
        history.push(`/${nextPageRoute}`);
    }

    return (
        <Container>
            <strong className="titleSubHeader">{titlePage}</strong>
            <UserGroup>
                <button onClick={handlerLink}>
                    <strong>{nextPageName}</strong>
                </button>
                {callBackPage ? (
                    <button
                        onClick={() => {
                            document
                                .querySelector('button[type="submit"]')
                                .click();
                        }}
                    >
                        <strong>SALVAR</strong>
                    </button>
                ) : (
                    <SearchContainer show={disabledInputSearch}>
                        <input type="text" placeholder="Buscar aluno" />
                    </SearchContainer>
                )}
            </UserGroup>
        </Container>
    );
}

export default SubHeader;
