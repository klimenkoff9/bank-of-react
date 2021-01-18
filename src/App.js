import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Components/Home';
import UserProfile from './Components/UserProfile';
import Debits from './Components/Debits';
import Credits from './Components/Credits';
import LogIn from './Components/LogIn';

class App extends Component {

  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      },
      data1:[],
      data2:[],
      debits:[],
      credits:[],
      amount: 0,
      description: 0
    }
  }
  
  componentDidMount= () =>{
    Promise.all([
      fetch(`https://moj-api.herokuapp.com/credits`).then(data => data.json()),
      fetch(`https://moj-api.herokuapp.com/debits`).then(data => data.json())
      ])
      .then(
        (data) => {
          this.setState({
            data1: data[0],
            data2: data[1],
          });
        }
      );
  }

  zipData = () =>{
    this.state.data1.forEach(element => {
    const debit = {
        description:element["description"],
        date:new Date(element["date"]).toLocaleString(),
        amount:element["amount"]
      }
      this.state.debits.push(debit);
      this.setState(prevstate => ({ accountBalance: prevstate.accountBalance - element["amount"]}));
    });
    this.state.data2.forEach(element => {
      const credit = {
          description:element["description"],
          date:new Date(element["date"]).toLocaleString(),
          amount:element["amount"]
        }
        this.state.credits.push(credit);
        this.setState(prevstate => ({ accountBalance: prevstate.accountBalance + element["amount"]}));
      });
  }

  inputAmount = (amount) => {
    this.setState({amount:amount});
  }

  inputDescription = (description) =>{
    this.setState({description:description});
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  addDebit = (e) =>{
    e.preventDefault();
    const debit = {
      amount: this.state.amount,
      description: this.state.description,
      date: new Date().toLocaleString()
    }
    const newDebits = [...this.state.debits,debit];
    this.setState({debits:newDebits, accountBalance:this.state.accountBalance-parseFloat(this.state.amount)});
  }

  addCredit = (e) =>{
    e.preventDefault();
    const  credit = {
      amount: this.state.amount,
      description: this.state.description,
      date: new Date().toLocaleString()
    }
    const newCredits = [...this.state.credits,credit];
    this.setState({credits:newCredits, accountBalance:this.state.accountBalance+parseFloat(this.state.amount)});
  }


  render() {
    let balance = this.state.accountBalance.toFixed(2);
    const HomeComponent = () => (<Home accountBalance={balance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    if(this.state.debits.length==0){
      this.zipData();
    }
    
    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route path="/userProfile" render={UserProfileComponent}/>
            <Route path="/login">
            <LogIn mockLogIn={this.mockLogIn}/>
            </Route>
            <Route path="/userDebits">
              <Debits addDebit={this.addDebit} debits={this.state.debits} inputAmount={this.inputAmount} inputDescription={
                this.inputDescription} accountBalance={balance}/>
            </Route>
            <Route path="/userCredits">
              <Credits addCredit={this.addCredit} credits={this.state.credits} inputAmount={this.inputAmount} inputDescription={
                this.inputDescription} accountBalance={balance}/>
            </Route>
          </div>
        </Router>
    );
  }

}

export default App;