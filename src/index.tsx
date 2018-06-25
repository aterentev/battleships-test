import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Game } from "./components/Game/Game";

ReactDOM.render(
    <Game />,
    document.getElementById("example")
);
