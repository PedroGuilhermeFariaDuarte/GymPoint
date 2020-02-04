import styled, { css } from 'styled-components';
import { darken } from 'polished';
export const Container = styled.div`
    width: 60%;
    height: 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 15px;

    strong.titleSubHeader {
        margin: 0px;
    }
`;

export const UserGroup = styled.div`
    width: 250px;
    height: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    button {
        width: 200px;
        height: 100%;
        border-radius: 4px;
        background-color: #ee4d64;
        color: #fff;
        font-size: 9px;
        font-weight: bold;
        margin-right: 5px;

        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            width: 13px;
            height: 27px;
            justify-self: flex-start;
            align-self: baseline;
            color: #fff;
        }

        strong {
            margin: 0px;
        }

        transition: background 0.2s;

        &:hover {
            transition: background 0.1s;
            background: ${darken(0.02, '#ee4d64')};
        }
    }
`;

export const SearchContainer = styled.div`
    width: 237px;
    height: 100%;
    border: 1px solid #dddddd;
    background: #fff;
    border-radius: 4px;
    padding: 2px;

    ${props =>
        props.show
            ? css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
              `
            : css`
                  display: none;
              `}

    svg {
        width: 10;
        height: 21;
        color: #dddddd;
        align-self: center;
    }

    input {
        height: 100%;
        background: none;
        padding: 5px;
        font-size: 12px;
        &::placeholder {
            font-size: 12px;
            color: #999999;
        }
    }
`;
