import React,{useEffect,useState,useRef} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SimpleReactValidator from 'simple-react-validator';
import Alert from '@mui/material/Alert';


export default function AddUser() {
    const [value, setValue] = useState({
        username:'',
        email:"",
        password:""
    });

    //const validator = new SimpleReactValidator();
    const validator = useRef(new SimpleReactValidator({
        element: message => <Alert style={{width:"50%"}} severity="error">{message}</Alert>
    }))
    const [, forceUpdate] = useState();

    useEffect(() => {
        
    });

    function handleChange(e){
        const formData={...value}
        formData[e.currentTarget.name]=e.currentTarget.value
        setValue(formData)
    }

    function submitForm(e) {
        e.preventDefault()
        validator.current.showMessages();
        if (validator.current.allValid()) {
          alert('You submitted the form and stuff!');
        } else {
          validator.current.showMessages();
          // rerender to show messages for the first time
          // you can use the autoForceUpdate option to do this automatically`
          forceUpdate(1);
        }
      }

    return (
        <div>

            <Card sx={{ minWidth: 275}}  >
                <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                    Add User
                </Typography> <br />

                <form onSubmit={submitForm}>
                <TextField  value={value.username} onChange={handleChange} 
                name="username" label="User Name" variant="outlined" style={{width:"50%"}} /> <br />
                {validator.current.message('Username', value.username, 'required')}
                 <br />
                
                <TextField  value={value.email}  onChange={handleChange} label="Email" variant="outlined" name="email" style={{width:"50%"}} /> <br />
                {validator.current.message('Email', value.email, 'required|email')}<br />

                <TextField  value={value.password}  onChange={handleChange} label="Password" name="password" variant="outlined" style={{width:"50%"}} /> <br />
                {validator.current.message('password', value.password, 'required')}
                <br />

                <Button type='submit' variant="contained">ADD USER</Button>
                </form>
                

                    
                </CardContent>
                
            </Card>

            
        </div>
    )
}
