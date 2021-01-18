import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from "axios";

import Home from './Components/Home';
import UserProfile from './Components/UserProfile';
import LogIn from "./Components/Login.jsx"
import Debits from "./Components/DebitComponents/Debits.jsx"
import Credits from './Components/CreditComponents/Credits';

class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 0,
      debitData: [],
      creditData: [],
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      }
    }
  }

  componentDidMount = async () => {
    const debitLink = `https://moj-api.herokuapp.com/debits`;
    const creditLink = `https://moj-api.herokuapp.com/credits`
    try {
      let debitData = await axios.get(debitLink);
      console.log(debitData.data);

      let creditData  = await axios.get(creditLink);
      console.log(creditData.data);

      this.setState({ debitData: debitData.data });
      this.state.debitData.forEach((debit) => {
        this.mockDebits(debit.amount);
      })
      
      this.setState({ creditData: creditData.data });
      this.state.creditData.forEach((credit) => {
        this.mockCredits(credit.amount);
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
  
  mockDebits = (amount) => {
    let newTotal = parseFloat(this.state.accountBalance) - parseFloat(amount);
    this.setState({ accountBalance: newTotal.toFixed(2) });
  };

  mockCredits = (amount) => {
    let newTotal = parseFloat(this.state.accountBalance) + parseFloat(amount);
    this.setState({ accountBalance: newTotal.toFixed(2) });
  };

  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} accountBalance={this.state.accountBalance}  /> );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props} accountBalance={this.state.accountBalance}/>)
    const DebitsComponent = () => (<Debits mockDebits={this.mockDebits} accountBalance={this.state.accountBalance} debitData={this.state.debitData} />);
    const CreditsComponent = () => (<Credits mockCredits={this.mockCredits} accountBalance={this.state.accountBalance} creditData={this.state.creditData} />);

    return (
        <Router>
          <div>
            <Route exact path="/home" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route path="/userDebits" render={DebitsComponent} />
            <Route path="/userCredits" render={CreditsComponent} />
            <Route exact path="/" render={LogInComponent}/>
          </div>
        </Router>
    );
  }

}

export default App;