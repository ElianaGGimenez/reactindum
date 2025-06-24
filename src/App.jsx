import NavBar from "./components/navbar";
import ItemListContainer from "./components/itemlistcontainer";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer greeting="¡Bienvenidos a SE Indumentaria y Accesorios!" />
    </>
  );
}

export default App;
