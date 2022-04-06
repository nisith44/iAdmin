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



export default function AddTable() {
    const [columns, setColumns] = useState([{
        columnName:'',
        length:50
    }]);
    const [tableName, setTableName] = useState('');

    //const validator = new SimpleReactValidator();
    const validator = useRef(new SimpleReactValidator({
        element: message => <Alert style={{width:"50%"}} severity="error">{message}</Alert>
    }))
    //const [, forceUpdate] = useState();

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
            let result=await sqlService.runSQL(body);
            //rows=users.data.data
            console.log(result)
            //setRows(users.data.data)
          } catch (error) {
            console.log(error)
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

            
        </div>
    )
}
