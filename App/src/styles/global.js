import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

    *,*::before,*::after{
        border:none;
        outline:none;
        padding:0;
        margin:0;
        box-sizing:border-box;
    }

    *:focus {outline:none;}

    html,body,#root {
        height:100%;
    }

    body {
        -webkit-font-smoothing: antiliased;
    }

    body,input,button{
        font-family: Roboto, sans-serif;
        font-size:14px;
    }

    a {
        text-decoration:none;
    }

    ul {
        list-style:none;
    }

    button{
        cursor:pointer;
    }

    #select {
        width:250px;
        svg {
            margin:0px;
            animation:none;
        }
    }
`;
