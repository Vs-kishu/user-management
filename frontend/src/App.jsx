import Login from "../components/Login";
import AdminDashboard from "../components/AdminDashboard";
import PlayerDashboard from "../components/PlayerDashboard";
import Navbar from "../components/Navbar";


function App() {

  const user=JSON.parse(localStorage.getItem("userToken"));
  return (
    <div className="App">
      <Navbar user={user}/>
      {!user ? (
        <Login />
      ) : user.userRole === "admin" ? (
        <AdminDashboard user={user}/>
      ) : (
        <PlayerDashboard user={user} />
      )}
    </div>
  );
}

export default App;
