import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const ContainerOwner = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    strong {
        margin: 0px;
    }

    form {
        width: 500px;
        height: 400px;
        border-radius: 4px;
        padding: 20px;
        background: #fff;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        text-align: left;

        strong {
            align-self: flex-start;
            font-size: 10px;
            font-weight: bold;
            color: #444444;
            margin-bottom: 20px;
        }

        p {
            align-self: flex-start;
            color: #666666;
            margin-bottom: 20px;
        }

        textarea {
            width: 100%;
            height: 190px;
            margin-bottom: 20px;
            outline: none;
            border: 1px solid #dddddd;
            border-radius: 4px;
            padding: 10px;
            resize: none;
        }

        button {
            width: 100%;
            height: 45px;
            text-align: center;
            font-weight: bold;
            color: #fff;
            border-radius: 4px;
            background: #ee4d64;
        }
    }
`;

export const ContainerAlert = styled.div`
    width: 500px;
    height: 150px;
    border-radius: 4px;
    padding: 10px 20px 20px;

    background: #fff;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;

    strong {
        align-self: flex-start;
        font-size: 10px;
        font-weight: bold;
        color: #444444;
        margin-bottom: 20px;
    }

    p {
        align-self: flex-start;
        color: #666666;
        margin-bottom: 20px;
        font-size: 10px;
    }

    button {
        width: 20%;
        height: 100%;
        text-align: center;
        font-weight: bold;
        color: #fff;
        border-radius: 4px;
        background: #ee4d64;
    }
    strong {
        margin: 0;
    }
`;

export const AlertHeader = styled.div`
    width: 100%;
    height: 30px;
    text-align: left;

    strong {
        font-size: 13px;
    }
`;

export const GroupButton = styled.div`
    width: 100%;
    height: 25px;
    margin-top: 30px;

    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: flex-start;

    button {
        font-size: 11px;
        margin: 5px;
        transition: background 0.2s;

        &:hover {
            transition: background 0.1s;
            background: ${darken(0.07, '#ee4d64')};
        }
    }

    button + button {
        background: none;
        border: 1px solid #dddddd;
        color: #999999;

        & {
            transition: none;

            &:hover {
                transition: none;
                background: none;
            }
        }
    }
`;
