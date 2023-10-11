import React, { useContext, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
width:400px;
margin:auto;
box-shadow:5px 2px 5px 2px rgb(0 0 0 /0.6)
`;

const Images = styled('img')({
    display: 'flex',
    margin: 'auto',
    width: '100px',
    padding: '50px 0 0 0',
});

const Wrapper = styled(Box)`
display:flex;
flex-direction:column;
flex:1;
padding:25px 35px;
& >div,& >button,&>p{
    margin-top:20px
}
`;

const LoginButton = styled(Button)`
text-transform:none;
background:#FB641B;
height:40px;
border-radius:2px;
`;
const Signup = styled(Button)`
text-transform:none;
background:#ffffff;
color:#2887f0;
height:40px;
border-radius:2px;
box-shadow:0 2px 5px 0 rgb(0 0 0/ 20%)
`;

const Error = styled(Typography)`
font-size:10px;
color:#ff6161;
line-height:0;
margin-top:10px;
font-weight:600;
`;

const loginInitialvalue = {
    username: '',
    password: ''
}

const signupInitialvalue = {
    name: '',
    username: '',
    password: ''
}
const Login = () => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account, setAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialvalue);
    const [login, setLogin] = useState(loginInitialvalue)
    const [error, setError] = useState('')

    const {setAccounts}=useContext(DataContext)
    const navigate=useNavigate();


    const toggleSignUp = () => {
        account === 'signup' ? setAccount('login') : setAccount('signup');
    }

    const handleChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        console.log("signup user", response);
        if (response.isSuccess) {
            setError('')
            setSignup(signupInitialvalue);
            setAccount('login')
        } else {
            setError('Somthing went wrong! plase try again later ')
        }
    }

    // Login field 
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    };

    const loginUser =async () => {
      let response=await API.userLogin(login);
    //   console.log(response)
    if(response.isSuccess){
        setError('');
        sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
        setAccounts({username:response.data.username, name:response.data,name});
        navigate('/')
    }else{
        setError('Something went wrong! pleace try again')
    }
    }
    return (
        <>
            <Component>
                <Box>
                    <Images src={imageURL} alt='logo' />
                    {
                        account === 'login' ?
                            <Wrapper>
                                <TextField variant='standard' value={login.username} onChange={(e) => onValueChange(e)} name='username' label='Enter Username' />
                                <TextField variant='standard' value={login.password} onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />
                                {error && <Error>{error}</Error>}
                                <LoginButton variant='contained' onClick={() => loginUser()}>Login</LoginButton>
                                <Typography style={{ textAlign: 'center', color: '#878787' }}>OR</Typography>
                                <Signup onClick={() => toggleSignUp()} >Create an account</Signup>
                            </Wrapper> :
                            <Wrapper>
                                <TextField variant='standard' onChange={(e) => handleChange(e)} name='name' label='Enter Name' />
                                <TextField variant='standard' onChange={(e) => handleChange(e)} name='username' label='Enter Username' />
                                <TextField variant='standard' onChange={(e) => handleChange(e)} name='password' label='Enter Password' />
                                {error && <Error>{error}</Error>}
                                <Signup onClick={() => signupUser()}>Signup</Signup>
                                <Typography style={{ textAlign: 'center', color: '#878787' }}>OR</Typography>
                                <LoginButton variant='contained' onClick={() => toggleSignUp()}>Already hane an account</LoginButton>
                            </Wrapper>
                    }


                </Box>
            </Component>
        </>
    )
}

export default Login