import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import TilingBackground from "./TilingBackground";

export function DropZone(props)
{
    console.log(props);
    return (
        <div
        id="drop_zone"
        className="is-fullwidth is-fullheight"
        onDrop={
            (e) => {
                e.preventDefault();
                if (e.dataTransfer.items) {

                    let item = e.dataTransfer.items[0];
                    if (item.kind === "file") {
                        let file = item.getAsFile();
                        props.handler(file);
                    }
                }
            }
        }
        onDragOver={
            (e) => {
                e.preventDefault();
            }
        }>
        </div>
    );
}

function App()
{
    var [ bgFile, setbgFile ] = useState(null);

    return (
        <>
            {/* <Loader /> */}
            <DropZone handler={
                (file) =>
                {
                    console.log(` ${file.name}: ${file.size} bytes`);
                    setbgFile(file);
                }
            } />

            <TilingBackground file={bgFile}/>
            {/* <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div> */}
        </>
    )
}

export default App;
