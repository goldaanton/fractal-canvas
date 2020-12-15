import React, {useEffect, useRef, useState} from 'react';
import Point from "../units/Point";

interface CanvasProps {
    width: number,
    height: number,
    constValue: number,
    orderValue: number,
    hueValues: number[]
}

export const FractalCanvasComponent: React.FC<CanvasProps> = (props: CanvasProps) => {

    const epsilon = 0.001;

    const canvasRef = useRef(null);

    useEffect(() => {

        const canvas = canvasRef.current;
        // @ts-ignore
        const context = canvas.getContext('2d');
        context.canvas.width = props.width;
        context.canvas.height = props.height;

        /*// @ts-ignore
        canvas.addEventListener("click", function (e) {
            // @ts-ignore
            let cRect = canvas.getBoundingClientRect();
            let canvasX = Math.round(e.clientX - cRect.left);
            let canvasY = Math.round(e.clientY - cRect.top);
            console.log(canvasX + " " + canvasY);
        });*/

        for (let x = 0; x < props.width; x++) {
            for (let y = 0; y < props.height; y++) {

                let initialPoint = new Point((x / props.width) * 4 - 2, (y / props.height) * 4 - 2);

                let previousPoint = getNextIteration(initialPoint);
                let currentPoint = getNextIteration(previousPoint);

                let iteration = 0;

                while (currentPoint.subtract(previousPoint).getAbsoluteValue() > epsilon && iteration <= 500) {
                    previousPoint = currentPoint;
                    currentPoint = getNextIteration(currentPoint);
                    iteration++;
                }

                let alpha = ((iteration / 20) + 0.5);

                if (props.orderValue === 3) {
                    if (Math.abs(currentPoint.x - 1) < epsilon) {
                        context.fillStyle = 'hsla(' + props.hueValues[0] + ',100%,50%,' + alpha + ')';
                    } else {
                        context.fillStyle = currentPoint.y > 0
                            ? 'hsla(' + props.hueValues[1] + ',100%,50%,' + alpha + ')'
                            : 'hsla(' + props.hueValues[2] + ',100%,50%,' + alpha + ')';
                    }
                } else if (props.orderValue === 4) {
                    if (Math.abs(currentPoint.x - 1) < epsilon)
                        context.fillStyle = 'hsla(' + props.hueValues[0] + ',100%,50%,' + alpha + ')';
                    else if (Math.abs(currentPoint.x + 1) < epsilon)
                        context.fillStyle = 'hsla(' + props.hueValues[1] + ',100%,50%,' + alpha + ')';
                    else if (Math.abs(currentPoint.y - 1) < epsilon)
                        context.fillStyle = 'hsla(' + props.hueValues[2] + ',100%,50%,' + alpha + ')';
                    else if (Math.abs(currentPoint.y + 1) < epsilon)
                        context.fillStyle = 'hsla(' + props.hueValues[3] + ',100%,50%,' + alpha + ')';
                }

                context.fillRect(x, y, 1, 1);
            }
        }
    }, [props.orderValue]);

    const computeFunction = (point: Point): Point => {
        return props.orderValue === 3
            ? point.multiply(point).multiply(point).add(new Point(props.constValue, 0.0))
            : point.multiply(point).multiply(point).multiply(point).add(new Point(props.constValue, 0.0));
    }

    const computeFunctionDerivative = (point: Point): Point => {
        return props.orderValue === 3
            ? new Point(3, 0).multiply(point).multiply(point)
            : new Point(4, 0).multiply(point).multiply(point).multiply(point);
    }

    const getNextIteration = (point: Point): Point => {
        return point.subtract(computeFunction(point).divide(computeFunctionDerivative(point)));
    }

    return (<canvas ref={canvasRef}/>);
}

export default FractalCanvasComponent;