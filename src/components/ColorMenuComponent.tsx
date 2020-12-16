import React from "react";

interface ColorMenuComponentProps {
    callbackFunc: (hueValues: number[]) => void;
}

export const ColorMenuComponent: React.FC<ColorMenuComponentProps> = (props: ColorMenuComponentProps) => {

    const changeHueValues = (newValues: number[]) => props.callbackFunc(newValues);

    return (
        <div>
            <label htmlFor="colors">Choose colors:</label>
            <div>
                <select name="colors" onChange={e => changeHueValues(e.target.value
                                                                    .split(',')
                                                                    .map(n => parseInt(n, 10)))}>
                    <option value="10,120,280,160">colors 1</option>
                    <option value="50,270,320,5">colors 2</option>
                    <option value="80,310,340,15">colors 3</option>
                </select>
            </div>
        </div>
    );
}