import styled from 'styled-components';
export const HelperChat = styled.div`
    width: 200px;
    height: 30px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid #dddddd;
    text-align: left;
    padding: 10px;
    color: #666666;
    margin-right: 10px;
    position: absolute;
    bottom: 5px;
    transition: all 0.2s;

    display: flex;
    justify-content: start;
    align-items: center;
    align-self: flex-end;

    strong {
        margin: 0px;
        font-weight: bold;
        color: #ee4d64;
    }
    cursor: pointer;

    &:hover {
        transition: all 0.2s;
        box-shadow: 0 0 5px rgba(221, 221, 221, 0.5);
    }
`;

export const ListChat = styled.nav`
    width: 200px;
    height: 500px;
    overflow: auto;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid #dddddd;
    text-align: left;
    padding: 10px 5px;
    color: #666666;
    margin-right: 10px;
    position: absolute;
    bottom: 35px;
    transition: all 0.2s;

    display: flex;
    flex-direction: column;

    align-items: flex-start;
    align-self: flex-end;

    ul {
        width: 100%;
        height: 100%;
        li {
            width: 100%;
            padding: 5px;
            font-size: 10px;
            cursor: pointer;
            span {
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background: #4dee58;
                display: inline-block;
                margin-left: 90px;
                cursor: default;
            }

            & + li {
                margin-top: 5px;
                border-top: 1px solid #dddddd;
            }
        }
    }
`;
