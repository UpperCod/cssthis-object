import * as cssthisPreact from "cssthis";
import * as cssthisReact from "cssthis-react";

import transform from "./transform";

cssthisReact.style.parse = cssthisPreact.style.parse = css => {
    typeof css === "object"
        ? new Function("props", "return " + transform(css).join("+"))
        : css;
};
