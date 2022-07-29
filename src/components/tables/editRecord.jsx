import React,{useEffect,useState,useRef} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SimpleReactValidator from 'simple-react-validator';
import Alert from '@mui/material/Alert';
import sqlService from '../../services/sqlService';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';


export default function EditRecord(props) {
    let [textBoxs, setTextBoxs] = useState([]);
    let [feilds, setfeilds] = useState();

    useEffect(() => {
        console.log(props);
        getRecords();
    },[]);

    async function getRecords(){
        let body={
            table:props.match.params.tableName,
            id:props.match.params.recordId
        }
        try {
            let result=await sqlService.getSingle(body);
            let rows=result.data.output;            
            setfeilds(rows[0])
            let columns=Object.keys(rows[0]);            
            setTextBoxs(columns)
            console.log(textBoxs);
            console.log(feilds) ;        
        } catch (error) {
          console.log(error)
        }
    }

    const testBox={
        width:"100%",
        margin:"5px",
    }
    const btnSave={
        marginLeft:"5px",
    }

    function handleChange(e){
        let temp={...feilds}
        temp[e.target.name]=e.target.value
        setfeilds(temp)
    }

    async function saveRecord(){
        console.log(feilds);
        let cols= Object.keys(feilds)
        let vals= Object.values(feilds)
        let columns={}
        cols.forEach((col,i)=>{
            columns[col]=vals[i]
        }) 

        let body={
            table:props.match.params.tableName,
            id:props.match.params.recordId,
            columns:columns
        }
        let result=await sqlService.update(body);
        console.log(result);
        console.log(result.data.status);
        if(result.data.status=="OK"){
            showAlert('success',"Record Successfully Updated")
        }else{
            showAlert('error',result.data.error.sqlMessage);
        }
    }

    //alert functions
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
    const [alertType, setAlertType] = React.useState('success');
    function showAlert(type,text){
        setAlertText(text);
        setAlertType(type);
        setOpenAlert(true);
    } 
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
    };    


    return (
        <div>

            <Card sx={{ minWidth: 275}}  >
                <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                    Edit {props.match.params.tableName}
                </Typography> <br />

                <Grid container spacing={2}>
                    {textBoxs.map((column, index) => (
                        <Grid item md={6} key={index}>
                        <TextField className='text-box' style={testBox}   
                        onChange={(e)=>handleChange(e,index)}
                        value={feilds[column]}
                                name={column} label={column} variant="outlined"  /> 
                        </Grid>
                    ))}
                </Grid>

                <br />
                <Button style={btnSave} onClick={saveRecord} color='success' variant="contained">Save Record</Button>

                </CardContent>
                
            </Card>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertType} variant='filled' sx={{ width: '100%' }}>
                {alertText}
                </Alert>
            </Snackbar>

            

            
        </div>
    )
}
