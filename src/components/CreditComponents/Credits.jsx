import React, { Component } from "react";

import AccountBalance from "../AccountBalance";
import Credit from "./Credit";
import { Link } from "react-router-dom";

class Credits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creditData: this.props.creditData,
      newAmount: "",
      newDescription: ""
    };
    
  }

  componentDidMount = () => {
    try {
      setTimeout(() => {
        const creditData = this.props.creditData;
        this.setState({ creditData: creditData });
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const creditFromForm = {
      description: this.state.newDescription,
      date: new Date().toDateString(),
      amount: this.state.newAmount,
    };
    this.setState({
      ...this.state,
      creditData: [...this.state.creditData, creditFromForm],
    });
    console.log(creditFromForm);
    this.props.mockCredits(this.state.newAmount);
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
            <Link to="/userDebits">Debits</Link>
          </li>
        </ul>
        <h1>Credits</h1>
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

        {this.state.creditData.map((credit, index) => {
          return (
            <Credit
              description={credit.description}
              date={credit.date}
              amount={credit.amount}
              key={index}
            />
          );
        })}
      </div>
    );
  }
}

export default Credits;
