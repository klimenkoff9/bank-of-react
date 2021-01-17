import React, {Component} from 'react';

class Debit extends Component {
  render() {
    return (
        <section>
           <p>Amount: {this.props.amount}</p>
           <p>Date: {this.props.date}</p>
           <p>Description: {this.props.description}</p>
        </section>
    );
  }
}

export default Debit;