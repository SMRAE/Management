import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCustModal} from './AddCustModal';
import {EditCustModal} from './EditCustModal';
import AppBarDrawer from './AppBarDrawer';
export class Customer extends Component{

    constructor(props){
        super(props);
        this.state={custs:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'customer')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(custid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'employee/'+custid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {custs, custid,custname,depmt,photofilename,doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <AppBarDrawer />
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>CustomerId</th>
                        <th>CustomerName</th>
                        <th>Department</th>
                        <th>DOJ</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {custs.map(cust=>
                            <tr key={cust.CustomerId}>
                                <td>{cust.EmployeeId}</td>
                                <td>{cust.EmployeeName}</td>
                                <td>{cust.Department}</td>
                                <td>{cust.DateOfJoining}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        empid:cust.CustomerId,custname:cust.CustomerName,depmt:cust.Department,
        photofilename:cust.PhotoFileName,doj:cust.DateOfJoining})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(cust.CustomerId)}>
            Delete
        </Button>

        <EditCustModal show={this.state.editModalShow}
        onHide={editModalClose}
        custid={custid}
        custname={custname}
        depmt={depmt}
        photofilename={photofilename}
        doj={doj}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Customer</Button>

                    <AddCustModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}