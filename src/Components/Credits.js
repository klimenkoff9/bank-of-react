import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import Credit from './Credit';
import { Link } from "react-router-dom";
import { Table } from 'reactstrap';
class Credits extends Component {

  enterAmount = (e) =>{
    this.props.inputAmount(e.target.value);    
  }

  enterDescription = (e) =>{
    this.props.inputDescription(e.target.value);     
  }

  render() {
    const res=this.props.credits.map((credit, index) => (
        <Credit
          description={credit.description}
          date={credit.date}
          amount={credit.amount}
          key={index}
        />));

    return (
        <div>
            <h1>Credits</h1>
            <Table dark>
            <thead>
            <tr>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {res}
            </tbody>
            </Table>
            <form>
            <div class="form-group">
            <label for="amount">Amount:</label>
            <input type="amount" class="form-control" id="amount" aria-describedby="amount" placeholder="Enter Amount"
            onChange={this.enterAmount}/>
            </div>
            <div class="form-group">
            <label for="description">Description:</label>
            <input type="description" class="form-control" id="descriptiont" aria-describedby="description" 
            placeholder="Enter Description" onChange={this.enterDescription}/>
            </div>
            <button type="submit" class="btn btn-primary" onClick={this.props.addCredit}>Submit</button>
            </form><br/>
            <AccountBalance accountBalance={this.props.accountBalance}/>
            <Link to="/">Home</Link>
        </div>
    );
  }
}

export default Credits;