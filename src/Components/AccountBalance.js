// src/components/AccountBalance.js

import React, {Component} from 'react';

class AccountBalance extends Component {

  render() {
    let balance = null;
    if(this.props.accountBalance!=0){
      balance = <div>Balance: {this.props.accountBalance}</div>;
    }
    else{
      balance = <div>Loading...</div>
    }
    return (
        <div style={{border: "2px solid black", width: "100px", padding: "15px"}}>
        {balance}
        </div>
    );
  }
}

export default AccountBalance;