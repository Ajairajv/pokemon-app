// import { NavLink} from "react-router-dom";
import Home from './pages/Home'

function App() {
  return (
    <div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r">
       <h1 className="text-4xl font-bold text-white mb-8">Pokemon App</h1>
       <Home/>
    </div>
    </div>
  );
}

export default App;
