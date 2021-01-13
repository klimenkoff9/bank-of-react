import React, {Component} from 'react';

class Debit extends Component {
  render() {
    return (
        <div>
          Amount: {this.props.amount}
          Date: {this.props.date}
          description: {this.props.description}
        </div>
    );
  }
}

export default Debit;