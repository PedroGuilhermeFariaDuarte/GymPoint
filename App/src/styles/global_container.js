import styled, { keyframes, css } from 'styled-components';

const loading = keyframes`
  from{
  transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
`;

export default styled.div`
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;

    strong {
        margin: 150px;
    }

    svg {
        animation: ${loading} 0.2s infinite;
    }
`;
