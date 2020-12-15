import React, {useState} from 'react';
import FractalCanvasComponent from "./components/FractalCanvasComponent";
import { RadioButtons } from './components/RadioButtons'

const App: React.FC = () => {

    const[k, setK] = useState(3);

    const changeK = (k: number) => {
        setK(k);
    }

    return (
        <div>
            <FractalCanvasComponent  height={800} width={800} constValue={-1} orderValue={k} hueValues={[10, 120, 280, 160]} />
            <form>
                <RadioButtons callbackFunc = {changeK} />
            </form>
        </div>
    );
}

export default App;
