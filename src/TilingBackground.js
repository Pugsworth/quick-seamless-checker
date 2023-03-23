import { useState, useRef } from "react";

function Range({ onChange = () => {} })
{
    let [rvalue, setrValue] = useState(50);
    return (
        <>
            <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={rvalue}
                className="range is-fullwidth is-primary"
                onChange={(e) =>
                {
                    let value = e.target.value;
                    setrValue(value);
                    onChange(`${value}%`);
                    console.log(`Range: ${value}`);
                }} />
        </>
    )
}

/**
 * Tiles an image X times horizontally and Y times vertically.
 */
function Tiled({ Url, size, tileX=1, tileY=1, drawGrid=true })
{
    let ref = useRef(null);

    if (ref.current !== null) {
        // let url = URL.createObjectURL(file);
        let img = new Image(...size);
        img.src = Url;

        let ctx = ref.current.getContext("2d");
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        img.onload = () => {
            for (let x = 0; x < tileX; x++) {
                for (let y = 0; y < tileY; y++) {
                    ctx.drawImage(img, x * size[0], y * size[1], size[0], size[1]);

                }
            }
            if (drawGrid) {
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.lineWidth = 2;
                for (let x = 0; x < tileX-1; x++) {
                    for (let y = 0; y < tileY-1; y++) {
                        // Draw lines between the tiles all the way to the edge of the canvas.
                        ctx.moveTo((x+1) * size[0], 0);
                        ctx.lineTo((x+1) * size[0], size[1] * tileY);
                        ctx.moveTo(0, (y+1) * size[1]);
                        ctx.lineTo(size[0] * tileX, (y+1) * size[1]);
                    }
                }
                ctx.stroke();
            }
        }
    }

    return (<>
        <canvas ref={ref} className="tile-canvas"></canvas>
    </>)
}

export default function TilingBackground({ file, tileX=1, tileY=1 })
{
    console.log(`File: `);
    console.log(file);

    let url = "";
    if (file !== "" && file !== null) {
        url = URL.createObjectURL(file);
    }

    let [size, setSize] = useState("100%");

    return (
        <>
            {/* <Tiled Url={url} size={[128, 128]} tileX={5} tileY={5} drawGrid={false}/> */}
            <section className="center-center">
                <div className="ui">
                    <div className="container">
                        <div className="box is-fullwidth">
                            <Range onChange={(size) => {
                                setSize(size);
                            }}/>
                        </div>
                    </div>
                </div>
            </section>
            <div className="background" style={{ backgroundImage: `url(${url})`, backgroundSize: `${size}` }}></div>
        </>
    )
}