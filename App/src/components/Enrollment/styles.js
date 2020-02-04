import styled, { css, KeyFrames } from 'styled-components';

export const FormContainer = styled.div`
    width: 60%;
    min-height: 250px;
    height: auto;
    border-radius: 4px;
    background: #fff;
    padding: 20px;

    form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        label {
            font-size: 9px;
            color: #444444;
            font-weight: bold;
        }

        input + label {
            margin-top: 10px;
        }

        label + input {
            margin-top: 10px;
        }

        input {
            width: 100%;
            height: 45px;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #dddddd;
            color: #999999;

            &::placeholder {
                color: #dddddd;
            }
        }
    }
`;

export const GroupOfInput = styled.div`
    width: 100%;
    height: 85;

    margin-top: 10px;

    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;

    div + div {
        margin-top: 0;
        margin-left: 20px;
    }
`;

export const Group = styled.div``;
