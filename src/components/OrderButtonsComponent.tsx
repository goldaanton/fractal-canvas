import React from "react";

interface RadioButtonsComponentProps {
    callbackFunc: (k: number) => void;
}

export const OrderButtonsComponent: React.FC<RadioButtonsComponentProps> = (props: RadioButtonsComponentProps) => {

    const changeK = (newK: number) => props.callbackFunc(newK);

    return (
        <div>
            <p>Choose k</p>
            <div>
                <label><input onClick={() => changeK(3)} type="radio" name="k" defaultChecked/>
                    3
                </label>

                <label><input onClick={() => changeK(4)} type="radio" name="k"/>
                    4
                </label>
            </div>
        </div>
    );
}