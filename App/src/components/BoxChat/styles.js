import styled, { css } from 'styled-components';

export const ContainerChat = styled.div`
    width: 220px;
    height: 300px;
    overflow: hidden;
    border-radius: 4px;
    text-align: left;
    color: #666666;
    right: 220px;
    position: absolute;
    bottom: 5px;
    transition: all 0.2s;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    align-self: flex-end;

    ul {
        width: 100%;
        height: 100%;
    }

    div.header {
        width: 100%;
        height: 30px;
        background: #ee4d64;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        font-size: 10px;
        font-weight: bold;
        text-align: left;
        color: #ffff;
        padding: 5px;

        svg {
            cursor: pointer;
            margin: 0px;
            animation: none;
        }
    }
`;

export const Chat = styled.ul`
    width: 100%;
    flex: 1;
    background: #fff;
    padding: 5px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
export const Message = styled.li`
    width: auto;
    max-width: 150px;
    height: auto;
    padding: 5px;
    font-size: 10px;
    text-align: left;
    color: #666666;
    background-color: #eeeeee;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;

    & + li {
        margin-top: 10px;
    }

    ${props =>
        props.send
            ? css`
                  border-top-right-radius: 0px;
                  border-bottom-right-radius: 0px;
                  border-top-left-radius: 4px;
                  border-bottom-left-radius: 4px;
                  align-self: flex-end;

                  background-color: #ee4d64;
                  /* border: 1px solid #de3b3b; */
                  color: #fff;
              `
            : css``}
`;
export const InputMessage = styled.div`
    width: 100%;
    height: 30px;
    background: #fff;
    overflow: hidden;
    padding: 10px;
    border-top: 1px solid #eeeeee;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    input {
        width: 90%;
        height: 100%;
        padding: 10px;
        font-size: 10px;
        border-radius: 4px;

        &::placeholder {
            font-size: 10px;
        }
    }

    svg {
        cursor: pointer;
        margin: 0px;
        animation: none;
    }
`;
