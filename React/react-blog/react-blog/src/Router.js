import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import List from './pages/list.jsx'
import Content from './pages/content.jsx'
import Comment from './pages/comment.jsx'
function router(){
    return(
        <Router>
           <Route path='/home' component={Home}></Route>
           <Route path='/Login' component={Login}></Route>
           <Route path='/list/:id' component={List}></Route>
           <Route path='/content/:id' component={Content}></Route>
           <Route path='/comment' component={Comment}></Route>
        </Router>
    )
}
export default router