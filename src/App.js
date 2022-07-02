import { DataProvider } from "./contexts/Context";
import MyRoute from "./components/route/MyRoute";
import Navbar from "./components/main/NavBar";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Navbar/>
        <MyRoute/>
      </div>
    </DataProvider>
  );
}

export default App;
