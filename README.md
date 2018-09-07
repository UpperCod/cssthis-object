# cssthis-object

It allows to use cssthis but the CSS resivirlo from an object

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