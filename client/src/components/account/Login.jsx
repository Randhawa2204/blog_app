import { Box, Button, TextField, Typography, styled } from '@mui/material'
import { useState , useContext } from 'react'
import { DataContext } from '../../context/DataProvider'
import { useNavigate } from 'react-router-dom'

import { API } from '../../service/api'

const Component = styled(Box)`
    width : 400px;
    margin : auto;
    box-shadow : 5px 2px 5px 2px rgb( 0 0 0 / 0.6);
`
 //Styles - ---------------Start--------------------------
const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
})

const Wrapper = styled(Box)`
    padding : 25px 35px;
    display : flex;
    flex : 1;
    flex-direction : column;
    & > div , & > button , & > p{
        margin-top : 20px;
    }
`

const LoginButton = styled(Button)`
    text-transform : none;
    background : #FB641B;
    color : #fff;
    height : 48px;
    border-radius : 2px;
`

const SignupButton = styled(Button)`
    text-transform : none;
    background : #fff;
    color : #2874f0;
    height : 48px;
    border-radius : 2px;
    box-shadow : 0px 2px 4px 0 rgb( 0 0 0 / 20%)
`
const ErrorText = styled(Typography)`
    font-size : 12px;
    font-weight : 600;
    color : #ff6161;
    margin-top : 10px;
`
 //Styles - ---------------End--------------------------

 //States intial Values - --------------Start-----------------
const initialSignupValues = {
    username: '',
    email: '',
    password: ''
}

const initialLoginValues = {
    username : '',
    password : ''
}

//States intial Values - --------------End-----------------

//React Component
const Login = ({setIsAuthenticated}) => {

    const [account, toggleAccount] = useState('login')
    const [signup, setSignup] = useState(initialSignupValues)
    const [error, setError] = useState()
    const [login , setLogin] = useState(initialLoginValues)

    const { setUserAccount} = useContext(DataContext)

    const navigate = useNavigate()

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup')
        setError('')
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }

    const onValueChange = (e) => {
        setLogin({...login , [e.target.name] : e.target.value})
    }

    const signupUser = async () => {
        try {
            let response = await API.userSignup(signup)

            if (response.isSuccess) {
                setError('')
                setSignup(initialSignupValues)
                toggleAccount('login')
            } else if (response.isError) {
                setError('Error signingup. Please try Again later')
            }
        } catch (err) {
            console.log(err)
            setError('Something went wrong. Please Try Again after some time.')
        }
    }

    const loginUser = async () => {
        try{
            let response  = await API.userLogin(login)
            if(response.isSuccess){
                setError('')
                setLogin(initialLoginValues)

                sessionStorage.setItem('accessToken' , `Bearer ${response.data.accessToken}`)
                sessionStorage.setItem('refreshToken' , `Bearer ${response.data.refreshToken}`)

                setUserAccount({username : response.data.username})
                setIsAuthenticated(true)
                navigate("/")

            }else{
                setError('Something went wrong. Please Try Again after some time.')
            }    

        }catch(err){
            setError('Something went wrong. Please Try Again after some time.')
        }
    }

    return (
        <Component>
            <Image src={imageURL} alt="Blog" />
            {
                account === "login" ?
                    <Wrapper>
                        <TextField onChange={onValueChange} variant="standard" /* value={initialLoginValues.username} */name="username" label="Enter username" placeholder='username' />
                        <TextField onChange={onValueChange} variant="standard" /* value={initialLoginValues.password} */ name='password' type="password" label="Enter password" placeholder='password' />
                        {  error && <ErrorText>{error}</ErrorText> }
                        <LoginButton onClick={loginUser} variant='contained'>Login</LoginButton>
                        <Typography style={{ textAlign: 'center', color: '#878787' }}>OR</Typography>
                        <SignupButton variant='standard' onClick={toggleSignup}>Create an account</SignupButton>
                    </Wrapper>
                    :
                    <Wrapper>
                        <TextField onChange={onInputChange} variant="standard" name="username" label="Enter username" placeholder='username' />
                        <TextField onChange={(e) => onInputChange(e)} variant="standard" name="email" label="Enter email" placeholder='email' />
                        <TextField onChange={(e) => onInputChange(e)} variant="standard" name="password" type="password" label="Enter password" placeholder='password' />
                        {
                            error && <ErrorText>{error}</ErrorText>
                        }
                        <SignupButton onClick={signupUser} variant='standard'>SignUp</SignupButton>
                        <Typography style={{ textAlign: 'center', color: '#878787' }}>OR</Typography>
                        <LoginButton variant='contained' onClick={toggleSignup}>Already have an account</LoginButton>
                    </Wrapper>
            }

        </Component>
    )
}

export default Login;