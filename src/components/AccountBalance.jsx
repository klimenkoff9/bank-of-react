import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
    return (
        <div>
          <h2>Balance: {this.props.accountBalanceDebit}</h2>
        </div>
    );
  }
}

export default AccountBalance;