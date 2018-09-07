# cssthis-object

permite usar cssthis pero el CSS resivirlo desde un objeto

## Instalación

Por defecto cssthis, posee un método dentro de la función style, llamado **parse**, este permite leer el contenido dado a cssthis, antes de ejecutar el css como función.

```javascript
import {style} from "cssthis";
import transform from "cssthis-object";
transform(style);
```

Una vez realizado lo anterior ud podrá usar objetos como css.

## Ejemplo
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