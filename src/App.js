import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from "axios";

import Home from './Components/Home';
import UserProfile from './Components/UserProfile';
import LogIn from "./Components/Login.jsx"
import Debits from "./Components/Debits.jsx"

class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 0,
      debitData: [],
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      }
    }
  }

  componentDidMount = async () => {
    const debitLink = `https://moj-api.herokuapp.com/debits`;
    try {
      let debitData = await axios.get(debitLink);
      console.log(debitData.data);
      this.setState({ debitData: debitData.data });
      this.state.debitData.forEach((debit) => {
        this.updateTotal(debit.amount);
      });
    } catch (error) {
      console.error(error);
    }
  }  

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }
  
  mockDebits = (debits) => {
    let newAmount = this.state.accountBalance
    newAmount -= debits;
    console.log(newAmount);
    newAmount = Math.round(newAmount * 100) / 100
    this.setState({accountBalance: newAmount})
  }

  updateTotal = (amount) => {
    let newTotal = parseFloat(this.state.accountBalance) + parseFloat(amount);
    this.setState({ accountBalance: newTotal });
  };

  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} accountBalance={this.state.accountBalance}  /> );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props} accountBalance={this.state.accountBalance}/>)
    const DebitsComponent = () => (<Debits mockDebits={this.mockDebits} accountBalance={this.state.accountBalance} debitData={this.state.debitData} />);

    return (
        <Router>
          <div>
            <Route exact path="/home" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route path="/userDebits" render={DebitsComponent} />
            <Route exact path="/" render={LogInComponent}/>
          </div>
        </Router>
    );
  }

}

export default App;