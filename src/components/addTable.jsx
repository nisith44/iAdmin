import React,{useEffect,useState,useRef} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SimpleReactValidator from 'simple-react-validator';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import sqlService from '../services/sqlService';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';



export default function AddTable() {
    const [columns, setColumns] = useState([{
        columnName:'',
        length:50
    }]);
    const [tableName, setTableName] = useState('');


    const validator = useRef(new SimpleReactValidator({
        element: message => <Alert style={{width:"50%"}} severity="error">{message}</Alert>
    }))

    useEffect(() => {
        
    });

    function handleChange(e,i){
        console.log(e.target.value);
        let table=[...columns];
        table[i][e.target.name]=e.target.value;
        setColumns(table)
    }

    function addColumn(){
        let table=[...columns]
        table.push({
            columnName:'',
            length:50
        })
        setColumns(table)
    }

    function removeCol(i){
        let table=[...columns]
        table.splice(i,1)
        setColumns(table)
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


    //create table
    async function createTable(){
        console.log(columns);
        let table=[...columns]
        let colStr=""
        table.forEach(col => {
            colStr=colStr+`${col.columnName} VARCHAR(${col.length}),`
        });
        colStr=colStr.substring(0, colStr.length - 1);
        let sqlString="CREATE TABLE "+tableName+" ("+colStr+");"
        console.log(sqlString);

        let body={
            sql:sqlString
          }
          try {
            let result=await sqlService.create(body);
            if(result.data.status=='OK'){
                addToTablesTable();
            }else{
                showAlert('error',result.data.error.sqlMessage);
            }
            console.log(result)
          } catch (error) {
            console.log(error)
          }
    }

    //add to DB tables table
    async function addToTablesTable(){
        const sqlString=`INSERT INTO tables (name) VALUES ('${tableName}');`
        let body={
            sql:sqlString
        }
        try {
            let result=await sqlService.insert(body);
            console.log(result);
            if(result.data.status=='OK'){
                showAlert('success',"Table Successfully Created");
            }
            else{
                showAlert('error',result.data.error.sqlMessage);
            }
        } catch (error) {
            
        }
    }

    function submitForm(e) {
        
    }

    function titleChange(e) {
        setTableName(e.target.value)
    }

      const testBox={
          width:"25%",
          margin:"5px",
      }
      const btnAddCol={
          marginLeft:"5px",
      }

    return (
        <div>            

            <Card sx={{ minWidth: 275}}  >
                <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                    Add New Table
                </Typography> <br />

                <TextField className='text-box' style={testBox}  value={tableName} onChange={titleChange} 
                            name="tableName" label="Table Name" variant="outlined"  />

                <form onSubmit={submitForm}>

                {columns.map((column, index) => (
                    <div key={index}>
                        <TextField className='text-box' style={testBox}  value={column.columnName} onChange={(e)=>handleChange(e,index)} 
                            name="columnName" label="Column Name" variant="outlined"  /> 

                        <TextField  value={column.length} onChange={(e)=>handleChange(e,index)} 
                        name="length" label="Length" variant="outlined" style={testBox} />

                        <IconButton onClick={()=>removeCol(index)} color="error" aria-label="add to shopping cart">
                                <DeleteOutlineIcon />
                        </IconButton>
                    </div>
                ))}

                <br />
                <Button style={btnAddCol} onClick={addColumn} variant="contained">Add New Column</Button>
                <Button style={btnAddCol} onClick={createTable} color='success' variant="contained">Create Table</Button>
                </form>

                    
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
