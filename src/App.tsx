
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { Button, Form, Modal , Alert} from "react-bootstrap";
import Tabla from "./Tabla"

function App(){
  return(
    <div className="container">
      <div className='header'>
        <Alert variant='success'>
          <h1 className="text-3xl font-bold text-center block my-2 ">Examen Técnico perfil Desarrollador JR para postulante Luis
          Octavio Aramburo Rivera</h1>
        </Alert>
      </div>
            <div className="App">
              <Tabla > 
              </Tabla>
            </div>
    </div>
  );
}
export default App;