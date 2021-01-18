import React, { Component } from "react";

import AccountBalance from "../AccountBalance";
import Debit from "./Debit";
import { Link } from "react-router-dom";

class Debits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      debitData: this.props.debitData,
      newAmount: "",
      newDescription: ""
    };

  }

  componentDidMount = () => {
    try {
      setTimeout(() => {
        const debitData = this.props.debitData;
        this.setState({ debitData: debitData });
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const debitFromForm = {
      description: this.state.newDescription,
      date: new Date().toDateString(),
      amount: this.state.newAmount,
    };
    this.setState({
      ...this.state,
      debitData: [...this.state.debitData, debitFromForm],
    });
    console.log(debitFromForm);
    this.props.mockDebits(this.state.newAmount);
  };

  handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/userCredits">Credits</Link>
          </li>
        </ul>
        <h1>Debits</h1>
        <form>
          <div>
            <label htmlFor="Amount">Amount:</label>
            <br />
            <input
              name="newAmount"
              placeholder="Amount"
              value={this.state.newAmount}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="Description">Description:</label>
            <br />
            <input
              name="newDescription"
              placeholder="Description"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>

        <AccountBalance accountBalanceDebit={this.props.accountBalance} />

        {this.state.debitData.map((debit, index) => {
          return (
            <Debit
              description={debit.description}
              date={debit.date}
              amount={debit.amount}
              key={index}
            />
          );
        })}
      </div>
    );
  }
}

export default Debits;
