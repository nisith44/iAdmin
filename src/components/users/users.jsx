import React, {useEffect,useState } from 'react'
import { useHistory } from 'react-router';
import EnhancedTable from '../table';
import Button from '@mui/material/Button';
import userService from '../../services/userService';
const axios = require('axios');


export default function Users(props) {
  let [rows, setRows] = useState([]);

    const history = useHistory();
    const goto=()=>{
        console.log('object');
        history.push('/mother')
    }

    useEffect(() => {
      console.log("kkkkkkkkkkkkkkkkkk")
      getUsers();
      
    },[]);

    async function getUsers(){
      let body={
        sql:"SELECT * FROM users"
      }
      try {
        let users=await userService.getUsers(body);
        rows=users.data.data
        console.log(users.data.data)
        setRows(users.data.data)
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

      const headCells = [
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

      const addUser=()=>{
        history.push("/dashboard/add-users")
      }

    return (
        <div >
            <div>
            <Button style={{float:"left"}} onClick={addUser} variant="contained">ADD USER</Button>
            </div>

            <div style={{float:"left",width:"100%",marginTop:"15px"}}>
            <EnhancedTable  rows={rows} headCells={headCells} />
            </div>
        </div>
    )
}
