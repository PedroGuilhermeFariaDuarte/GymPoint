import styled from 'styled-components';

export const Container = styled.header`
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #dddddd;
    background: #fff;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    /* border: 1px solid pink; */
`;

export const Logo = styled.div`
    width: 100px;
    height: 90%;
    padding: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 100px;
    }
`;

export const List = styled.ul`
    flex: 1;
    height: 50%;
    list-style: none;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 10px;
    border-left: 1px solid #dddddd;
    /* border: 1px solid green; */
    margin-left: 10px;

    li {
        font-size: 11px;
        font-weight: bold;
        color: #dddddd;
        cursor: pointer;
        margin: 10px;

        a {
            text-decoration: none;
            color: #dddddd;

            &::visited {
                color: #dddddd;
            }

            &:hover {
                color: #444444;
            }
        }
    }
`;

export const User = styled.div`
    width: 100px;
    height: 100%;
    /* border: 1px solid red; */
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    gap: 2px;
    /* border: 1px solid #458ee8; */
    text-align: right;
    padding: 10px;
    font-size: 10px;
    span {
        font-size: 10px;
        color: #ee4d64;
    }
`;
