import React, {useEffect,useState } from 'react'
import { useHistory } from 'react-router';
import EnhancedTable from './table';
import Button from '@mui/material/Button';
import sqlService from '../../services/sqlService';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import Tooltip from '@mui/material/Tooltip';


export default function TableRecords(props) {
  let [rows, setRows] = useState([]);
  let [headCells, setHeadCells] = useState([]);

    const history = useHistory();
    const goto=()=>{
        console.log('object');
        history.push('/mother')
    }

    useEffect(() => {
      console.log(props);
      getRecords();
      
    },[props.match.params.tableName]);

    async function getRecords(){
      let body={
        table:props.match.params.tableName
      }
      try {
        let result=await sqlService.select(body);
        rows=result.data.output;
        setRows(result.data.output);
        console.log(rows);
        createHeadCells();
      } catch (error) {
        console.log(error)
      }
      
    }

  
    
    

    function createData(name, calories, fat, carbs, protein) {
        return {
          name,
          calories,
          fat,
          carbs,
          protein,
        };
      }
      
      // const rows = [
      //   createData('Cupcake', 305, 3.7, 67, 4.3),
      //   createData('Donut', 452, 25.0, 51, 4.9),
      //   createData('Eclair', 262, 16.0, 24, 6.0),
      //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      //   createData('Gingerbread', 356, 16.0, 49, 3.9),
      //   createData('Honeycomb', 408, 3.2, 87, 6.5),
      //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      //   createData('Jelly Bean', 375, 0.0, 94, 0.0),
      //   createData('KitKat', 518, 26.0, 65, 7.0),
      //   createData('Lollipop', 392, 0.2, 98, 0.0),
      //   createData('Marshmallow', 318, 0, 81, 2.0),
      //   createData('Nougat', 360, 19.0, 9, 37.0),
      //   createData('Oreo', 437, 18.0, 63, 4.0),
      // ];

      console.log(rows)

      function createHeadCells(){
        let columns=Object.keys(rows[1]);
        let temp=[]
        console.log(columns);
        columns.forEach((col)=>{
          temp.push({
            id: col,
            numeric: false,
            disablePadding: false,
            label: col
          })
        })
        setHeadCells(temp)
      }

      const headCells1 = [
        {
          id: 'id',
          numeric: false,
          disablePadding: false,
          label: 'Id',
        },
        {
          id: 'username',
          numeric: false,
          disablePadding: false,
          label: 'Username',
        },
        {
          id: 'email',
          numeric: false,
          disablePadding: false,
          label: 'Email',
        },
        {
          id: 'password',
          numeric: false,
          disablePadding: false,
          label: 'Password',
        },
        {
          id: 'actions',
          numeric: false,
          disablePadding: false,
          label: 'Actions',
        }
        
      ];

      const addRecord=()=>{ 
        history.push("/dashboard/add-record/"+props.match.params.tableName)
      }
      

    return (
        <div >
            <div>
            <Button style={{float:"left",marginRight:"20px"}} onClick={addRecord} variant="contained">ADD {props.match.params.tableName}</Button>
            <Tooltip title="Refresh Table">
              <IconButton  >
                <RefreshIcon/>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Filters">
              <IconButton  >
                <FilterAltOutlinedIcon/>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Print">
            <IconButton  >
              <PrintOutlinedIcon/>
            </IconButton>
            </Tooltip>
            
            <Tooltip title="Download Exel">
            <IconButton  >
              <BackupTableOutlinedIcon/>
            </IconButton>
            </Tooltip>
            
            <Tooltip title="Import Table">
            <IconButton  >
              <CloudUploadOutlinedIcon/>
            </IconButton>
            </Tooltip>
            
            <Tooltip title="Download SQL File">
            <IconButton  >
              <CloudDownloadOutlinedIcon/>
            </IconButton>
            </Tooltip>
            
            <Tooltip title="Download PDF">
            <IconButton  >
              <PictureAsPdfOutlinedIcon/>
            </IconButton>
            </Tooltip>
            
            </div>

            <div style={{float:"left",width:"100%",marginTop:"15px"}}>
            <EnhancedTable  rows={rows} headCells={headCells} tableName={props.match.params.tableName} />
            </div>
        </div>
    )
}
