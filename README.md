# cssthis-object

It allows using [cssthis](https://github.com/uppercod/cssthis) based on an object, avoiding the need for [cssthis-parse](https://github.com/uppercod/cssthis-parse).

## Installation

By default cssthis, has a method within the style function, called **parse**, this allows to read the content given to cssthis, before executing the css as a function.


```javascript
import {style} from "cssthis";
import transform from "cssthis-object";
transform(style);
```

Once you have done the above you can use objects such as CSS.

## Example

```javascript
import { style } from "cssthis";

let Button = style("button")({
    ":this": {
        padding: ".5rem 1rem",
        background: "transparent",
        border: "1px solid black"
    },
    ":this:hover": {
        animation: "hover 1s infinite alternate"
    },
    "@keyframes hover": {
        from: {
            transform: "scale(1)"
        },
        to: {
            transform: "scale(1.2)"
        }
    }
});
```

Cssthis-object, does not work with nested styles, for example those inherited from sass.