import './App.css';
import Dashboard from './Component/Dashboard';
import { Routes ,Route} from 'react-router-dom';
import Assets from './Component/Assets';
import './Component/Firebase'
import Settingbar from './Component/Settingbar';
import Userbar from './Component/Userbar';
import Report from './Component/Report';
import Layoutbar from './Component/Layoutbar';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Signup from './Pages/Signup';
import Loginpage from './Pages/Loginpage';
import Issue from './Component/Issue';



function App() {
  const [login,setLogin]=useState(null)
  useEffect(()=>{

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
setLogin(true)
   
   console.log("User Login" , user)
  } else {
  setLogin(false)
   console.log("User Login" , user)
  }
});
  })
  return (
    <div>
      {login == null ? (
        <h1>Loading.........</h1>
      ): login ?(
   <Routes>
      <Route element={<Layoutbar/>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/issue" element={<Issue />} />
        <Route path="/users" element={<Userbar/>} />
        <Route path="/settings" element={<Settingbar/>} />
        
      </Route>
        <Route path="/report/:id" element={<Report />} />
    </Routes>
      ):(
   <Routes>
        <Route path="/" element={<Loginpage/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Loginpage />} />
    
        
      
    </Routes>
      )}

    </div>
  );
}

export default App;
