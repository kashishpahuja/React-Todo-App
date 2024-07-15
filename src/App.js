import './App.css';
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import Navbar from './components/Navbar';
import PageNotFound from './pages/PageNotFound';
import Login from './auth/Login';
import Register from './auth/Register';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import { TaskProvider } from './context/TaskContext';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './layout/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <TaskProvider>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />}></Route>
        <Route path='/' element={<Home/>} >
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>

        </Route>
        <Route path='/about' element={<About/>} ></Route>
        <Route path='/task-list' element={<ProtectedRoute> <TaskList/></ProtectedRoute>} ></Route>
        <Route path='/profile' element={<Profile/>} ></Route>
        <Route path='/create-task' element={<CreateTask/>} ></Route>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
        </Route>

        {/* always at last */}
        <Route path='*' element={<PageNotFound/>} ></Route>    


      </Routes>
      </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
