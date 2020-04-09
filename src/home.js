import React,{Component} from 'react';
import axios from 'axios';
import './table.css';


class Home extends Component{
    constructor(){
        super();
        this.state = {employeeData:[]}
        this.resoucesData = [];
        this.servicesData = [];
        this.repositoriesData=[];
        this.totalData=[];
    }

    componentDidMount(){       
      
        var staticJSONdata = {
         "project": {
           "clientname": "compLogo",
           "headerComment": "test",
           "name": "EmployeeManagement",
           "rootPackage": "com.compLogo.emp",
           "projectType": "sculpture"
         },
         entities: [
           {
             "name": "Employee",
             "Resouce": [
               {
                 "functionName": "findEmployeeSalary",
                 "parameters": [
                   {
                     "paramType": "",
                     "paramName": ""
                   }
                 ],
                 "returnType": "",
                 "propagate": true,
                 "autoCreateName": false,
                 "ResourceName": "EmployeeService"
               }
             ],
             "Service": [
               {
                 "functionName": "findEmployeeSalary",
                 "parameters": [
                   {
                     "paramType": "",
                     "paramName": ""
                   }
                 ],
                 "returnType": "",
                 "propagate": true,
                 "autoCreateName": false,
                 "ServiceName": "EmployeeRepository"
               }
             ],
             "Repository": [
               {
                 "functionName": "findEmploeeSalary",
                 "parameters": [
                   {
                     "paramType": "int",
                     "paramName": "empId"
                   },
                   {
                     "paramType": "Entity",
                     "paramName": "deptId",
                     "objEntityName": "Department"
                   }
                 ],
                 "returnType": "int",
                 "propagate": false,
                 "autoCreateName": false,
                 "exception": "customException",
                 "exceptionName": "employeeNotFound",
                 
               },
               {
                 "functionName": "findEmploeeWithHighestSalary",
                 "parameters": [
                   {
                     "paramType": "int",
                     "paramName": "workingDays"
                   },
                   {
                     "paramType": "int",
                     "paramName": "departmentId"
                   }
                 ],
                 "returnType": "Entity",
                 "propagate": false,
                 "autoCreateName": false,
                 "objEntity": "Employee",
                 "exception": "customException",
                 "exceptionName": "EmployeeNotFound"
               }
             ],
             "fields": [
               {
                 "columnname": "empId",
                 "length": "",
                 "datatype": "int",
                 "nullable": false,
                 "pk": true,
                 "relation": "Set"
               },
               {
                 "columnname": "empName",
                 "length": "20",
                 "datatype": "String",
                 "nullable": false,
                 "pk": false,
                 "relation": "Set"
               },
               {
                 "columnname": "Department",
                 "length": "",
                 "datatype": "Object",
                 "nullable": false,
                 "pk": false,
                 "relation": "Set"
               },
               {
                 "columnname": "salary",
                 "length": "",
                 "datatype": "int",
                 "nullable": false,
                 "pk": false
               }
             ],
             "expand": true,
             "editable": true
           },
           {
             "name": "Department",
             "Resouce": [
               {
                 "functionName": "",
                 "parameters": [
                   {
                     "paramType": "",
                     "paramName": ""
                   }
                 ],
                 "returnType": "",
                 "propagate": false,
                 "autoCreateName": false
               }
             ],
             "Service": [
               
             ],
             "Repository": [
               
             ],
             "fields": [
               {
                 "columnname": "Employee",
                 "length": "",
                 "datatype": "Object",
                 "nullable": false,
                 "pk": false,
                 "relation": "Set"
               },
               {
                 "columnname": "departmentId",
                 "length": "20",
                 "datatype": "int",
                 "nullable": false,
                 "pk": true
               }
             ],
             "expand": true,
             "editable": true
           }
         ],
         "resource": [
           {
             "name": "EmployeeRecordsResource",
             "value": [
               {
                 "functionName": "findEmployeeWithHighestSalary",
                 "parameters": [
                   {
                     "paramType": "",
                     "paramName": ""
                   }
                 ],
                 "returnType": "",
                 "propagate": true,
                 "autoCreateName": false,
                 "ResourceName": "EmployeeRecordsService"
               }
             ]
           }
         ],
         "service": [
           {
             "name": "EmployeeRecordsService",
             "value": [
               {
                 "functionName": "findEmployeeWithHighestSalary",
                 "parameters": [
                   {
                     "paramType": "",
                     "paramName": ""
                   }
                 ],
                 "returnType": "",
                 "propagate": true,
                 "autoCreateName": false,
                 "ResourceName": "EmployeeRepository"
               }
             ]
           }
         ]
       }
       

      //Getting resources,services,respositories from entities

       for(var i=0;i<staticJSONdata.entities.length;i++){         
         for(var j=0;j<staticJSONdata.entities[i].Resouce.length;j++){           
            this.resoucesData.push(staticJSONdata.entities[i].Resouce[j].ResourceName);
         }
         for(var j=0;j<staticJSONdata.entities[i].Service.length;j++){           
            this.servicesData.push(staticJSONdata.entities[i].Service[j].ServiceName);
         }
         for(var j=0;j<staticJSONdata.entities[i].Repository.length;j++){           
            this.repositoriesData.push(staticJSONdata.entities[i].Repository[j].functionName);
         }

         this.totalData.push({ "resource": this.resoucesData[i] ? this.resoucesData[i] : '',
         "service": this.servicesData[i] ? this.servicesData[i]  : '',
         "repository": this.repositoriesData[i] ? this.repositoriesData[i] : ''})
        }



       //Getting resources from JSON

       for(var i=0;i<staticJSONdata.resource.length;i++){        
         this.totalData.push({ "resource": staticJSONdata.resource[i].name ? staticJSONdata.resource[i].name : '',
         "service":  '',
        "repository": ''})
       }



       //Getting services from JSON

       for(var i=0;i<staticJSONdata.service.length;i++){        
         this.totalData.push({  "resource":'',
         "service": staticJSONdata.service[i].name ? staticJSONdata.service[i].name : '',      
        "repository": ''})
       }

       this.setState({employeeData : this.totalData});
     
    }

    render() {
        return (
           <div>
              <h1 id='title'>Resources and Services</h1>
              <table id='users'>
                 <tbody>
                    <tr>{this.renderUserDataHeader()}</tr> 
                    {this.renderUserData()}
                 </tbody>
              </table>
           </div>
        )
     }


     renderUserDataHeader() {
        if(this.state.employeeData[0]){
           console.log(Object.keys(this.state.employeeData[0]));
        let header = Object.keys(this.state.employeeData[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
       }
     }   

     renderUserData() {
        return this.state.employeeData.map((user, idx) => {
           const { resource, service, repository} = user
           return (
              <tr>
                 <td>{resource}</td>
                 <td>{service}</td>
                 <td>{repository}</td>
               
              </tr>
           )
        })
     }
}

export default Home;
