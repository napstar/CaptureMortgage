import React, { Component } from 'react';
import '../styles/globalTableStyles.css';
import FiscalYear from './FiscalYear';
import axios from 'axios';

class EmployeeLeaderboard extends Component {
    state = { leads: [] }
    
    fetchData() {
        // console.log('fetching data')
        axios.get('http://cmp-backend.ap-southeast-2.elasticbeanstalk.com/leads/employee-leaderboard')
        .then(resp => {
            console.log(resp.data)
            this.setState({ leads: resp.data })
        })
    }

    componentDidMount() {
        this.fetchData();
        setInterval(this.fetchData, 15000);
    }


    render() {
        const { leads } = this.state;

        return (
            <div>
                <div className="center">
                    <h1 className="header leads">EMPLOYEE LEADERBOARD</h1>
                    <div className="leads">
                        <h3>CaptureMortgage+ Leaderboard by Employee</h3><span> </span>
                        <h3><FiscalYear /></h3>
                    </div>
                    <table id="myTable">
                        <thead>
                            <tr className="leads-back">
                                <th>ID</th>
                                <th>Entered as Lead</th>
                                <th>Customer Name</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Referrer</th>
                                <th>Employee</th>
                            </tr>
                        </thead>
                        <tbody>
                        {leads.map((lead, i) => {
                            return (
                                <tr key={i}>
                                <td>{lead.id}</td>
                                <td>{lead.dateOfLead}</td>
                                <td><a href={'/update/' + lead.id}>{lead.customerName}</a></td>
                                <td>{lead.category}</td>
                                <td>${Intl.NumberFormat().format(lead.amount)}</td>
                                <td>{lead.referrer}</td>
                                <td>{lead.employee}</td>
                            </tr>
                        )})}
                        </tbody>


                    </table>
                </div>
            </div>
        );
    }
}

export default EmployeeLeaderboard;


