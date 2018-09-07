# cssthis-object

permite usar cssthis pero el CSS resivirlo desde un objeto

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

Cssthis-object, no trabaja con estilos anidados sea por ejemplo los heredados de sass, impidiendo la complejidad del codigo.