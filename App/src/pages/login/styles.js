import styled, { keyframes } from 'styled-components';
import { darken, lighten } from 'polished';

const loading = keyframes`
  from{
  transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
`;
export const Container = styled.div`
    width: 100%;
    height: 100%;
    background: #ee4d64;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FormContainer = styled.div`
    width: 315px;
    height: 348px;
    border-radius: 4px;
    box-shadow: 0 0 14px rgba(0, 0, 0, 0.2);
    background: #fff;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid green; */

    img {
        max-width: 120px;
        /* border: 1px solid red; */
    }

    form {
        width: 100%;
        height: auto;
        margin-top: 10px;
        /* border: 1px solid blue; */
        display: flex;
        flex-direction: column;

        label {
            font-size: 12px;
            color: #444444;
            font-weight: bold;
            align-self: flex-start;
        }

        input {
            width: 100%;
            height: 38px;
            padding: 5px 10px;
            border: 1px solid #dddddd;
            border-radius: 2px;
            font-size: 12px;
            color: #444444;
            &::placeholder {
                color: #dddddd;
            }

            margin-top: 5px;
        }

        input + label {
            margin-top: 10px;
        }

        span {
            font-size: 10px;
            font-weight: bold;
            color: ${lighten(0.2, '#ee4d64')};
            margin-left: 2px;
            align-self: flex-start;
        }

        button {
            width: 100%;
            height: 45px;
            background: #ee4d64;
            border-radius: 4px;
            margin-top: 15px;
            font-size: 12px;
            font-weight: bold;
            color: #fff;
            text-align: center;
            transition: background 0.2s;

            &:hover {
                transition: background 0.1s;
                background: ${darken(0.02, '#ee4d64')};
            }

            svg {
                animation: ${loading} 0.2s infinite;
            }
        }
    }
`;
