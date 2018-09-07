import transform from "./transform";

export default function(style) {
    let { parse } = style;
    return (style.parse = css => {
        css = parse ? parse(css) : css;
        return typeof css === "object"
            ? new Function("props", "return " + transform(css).join("+"))
            : css;
    });
}
