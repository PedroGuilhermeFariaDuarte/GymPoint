import styled, { keyframes, css } from 'styled-components';
const loading = keyframes`
  from{
  transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
`;

export const TableStudents = styled.table`
    width: 60%;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    thead th {
        height: 10px;
        font-size: 12px;
        text-align: left;
    }

    tbody td {
        font-size: 10px;
        height: 20px;
        text-align: left;
        padding-top: 10px;
        padding-bottom: 15px;
        font-weight: 400;
        color: #666666;

        span {
            color: blue;
            cursor: pointer;
        }

        &.active span {
            color: red;
        }
    }

    svg {
        animation: ${loading} 0.2s infinite;
    }
`;
