import React, { Component } from "react";

import AccountBalance from "./AccountBalance";
import Debit from "./Debit";
import { Link } from "react-router-dom";

class Debits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      debitData: this.props.debitData,
      debits: [],
      amount: 0,
      description: "",
      balance: 0,
    };
  }

  // componentDidMount = async (props) => {
  //   try {
  //     const debitData = await this.props.debitData;
  //     this.setState({ debitData: debitData });
  //     console.log(debitData);
  //     this.state.debitData.forEach((oneDebit) => {
  //       const debit = {
  //         description: oneDebit.description,
  //         date: oneDebit.date,
  //         amount: oneDebit.amount,
  //       };
  //       this.state.debits.push(debit);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  addDebit = (e) => {
    e.preventDefault();
    const debit = {
      amount: this.state.amount,
      description: this.state.description,
      date: new Date().toDateString(),
    };
    this.props.mockDebits(debit.amount);
    // this.setState({
    //   ...this.state.debits,
    //   debits: debit,
    // });
    this.state.debits.push(debit);
  };

  updateTotal = (amount) => {
    // console.log(amount);
    let newTotal = parseFloat(this.state.balance) + parseFloat(amount);
    // console.log(newTotal);
    this.setState({ ...this.state, balance: newTotal });
    // console.log(this.state.balance);
  };

  enterAmount = (e) => {
    this.setState({ amount: e.target.value });
  };

  enterDescription = (e) => {
    this.setState({ description: e.target.value });
  };
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
        </ul>
        <h1>Debits</h1>
        <form>
          <label>Amount:</label>
          <br />
          <input type="text" onChange={this.enterAmount} />
          <br />
          <label>Description:</label>
          <br />
          <input type="text" onChange={this.enterDescription} />
          <br />
          <input type="submit" value="Submit" onClick={this.addDebit} />
        </form>

        <AccountBalance accountBalanceDebit={this.props.accountBalance} />
        {console.log(this.state.debitData)}
        {this.state.debitData.map((debit, index) => {
          console.log(debit.date);
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
