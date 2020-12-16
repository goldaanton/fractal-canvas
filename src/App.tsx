import React, {useState} from 'react';
import FractalCanvasComponent from "./components/FractalCanvasComponent";
import { OrderButtonsComponent } from './components/OrderButtonsComponent'
import {ColorMenuComponent} from "./components/ColorMenuComponent";

const App: React.FC = () => {

    const[k, setK] = useState(3);
    const[hueValues, setHueValues] = useState([10, 120, 280, 160]);

    const changeK = (k: number) => {
        setK(k);
    }

    const changeHueValues = (hueValues: number[]) => {
        setHueValues(hueValues);
    }

    return (
        <div>
            <FractalCanvasComponent  height={800} width={800} constValue={-1} orderValue={k} hueValues={hueValues} />
            <form>
                <OrderButtonsComponent callbackFunc = {changeK} />
                <ColorMenuComponent callbackFunc = {changeHueValues} />
            </form>
        </div>
    );
};

export default App;
