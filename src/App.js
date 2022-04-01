import { useSelector } from 'react-redux';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import './App.css';
import AgentDetail from './views/Agent/AgentDetail';
import AgentList from './views/Agent/AgentList';
import CreateAgent from './views/Agent/CreateAgent';
import {LoginPage} from './views/LoginPage'
import {MainLayout} from './views/MainLayout'
import Tickets from './views/Tickets/Tickets';

function App() {
  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn);
  const routes=[
    {path:"/login",element: <LoginPage/>},
    {path:"/",element:isLoggedIn ? <MainLayout/>: <Navigate to='/login'/>,
    children:[
      {path:'tickets',element:<Tickets/>},
      {path:'agents',element:<AgentList/>},
      {path:'agents/create',element:<CreateAgent/>},
      {path:'agents/:id',element:<AgentDetail/>}
     
    ]
    
  },
  
  ]
  const element=useRoutes(routes);
  return (
    <div className='App'>
     {element}
    </div>
  );
}

export default App;
