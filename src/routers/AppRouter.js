import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddExpensePage from '../components/AddExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import EditExpensePage from '../components/EditExpensePage';
import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';
import HelpPage from '../components/HelpPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header/>
      <Switch>
      <Route path="/" component={ExpenseDashboardPage} exact={true}/>
      <Route path="/create" component={AddExpensePage} exact={true}/> 
      <Route path="/edit/:id" component={EditExpensePage} exact={true}/>
      <Route path="/help" component={HelpPage} exact={true}/>
      <Route component={NotFoundPage}/>
    </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;