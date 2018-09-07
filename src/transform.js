let prefix = {
    class: '"+props.cn+"'
};
function map(selector, callback) {
    let escape = /\([^\)]+\)/g;
    return selector
        .replace(escape, all => all.replace(/\,/g, "@"))
        .split(/\,\s*/)
        .map((value, index) =>
            callback(
                value.replace(escape, all => all.replace(/\@/g, ",")),
                index
            )
        )
        .join(", ");
}

function replace(selector) {
    return selector.replace(
        /:(this|global)(?:\(([^\)]+)\)){0,1}([^\s]*)(\s*)(.*)/g,
        (all, host, args, state, space, concat) => {
            let rootClassName = host === "global" ? "" : "." + prefix.class;
            if (/:(this|global)/.test(concat)) {
                concat = replace(concat);
            }
            if (args) {
                return map(
                    args,
                    selector =>
                        (/^[a-zA-Z]/.test(selector)
                            ? selector + rootClassName
                            : rootClassName + selector) +
                        state +
                        space +
                        concat
                );
            } else {
                return rootClassName + state + space + concat;
            }
        }
    );
}

function property(name, value, quoteScape, join = ":") {
    if (/animation(-name){0,1}$/.test(name)) {
        value = value.replace(/([^\s]+)/, "$1-" + prefix.class);
        quoteScape = true;
    }
    return (
        name.replace(
            /(.+)([A-Z])/g,
            (all, before, letter) => before + "-" + letter.toLowerCase()
        ) +
        join +
        value
            .replace(/(\"|\')/g, quoteScape ? "$1" : "\\$1")
            .replace(
                /this\(([^\)]+)\)/g,
                (all, prop) =>
                    `\"+props[\"${prop.replace(/[^a-zA-Z1-9\_]+/g, "")}\"]+\"`
            )
    );
}

export default function transform(cssObj, group, deep = 0, ignore) {
    let rules = [];
    for (let prop in cssObj) {
        let value = cssObj[prop];
        if (typeof value === "object" && value && !Array.isArray(value)) {
            let nextGroup = [];
            if (/@keyframes/.test(prop)) {
                rules.push(
                    '"' +
                        prop +
                        "-" +
                        prefix.class +
                        '{"+' +
                        transform(value, nextGroup, 0, true).join("+") +
                        '+"}"'
                );
                continue;
            }
            if (/@media/.test(prop)) {
                rules.push(
                    '"' +
                        prop +
                        '{"+' +
                        transform(value, nextGroup, 0).join("+") +
                        '+"}"'
                );
                continue;
            }
            if (/@font-face/.test(prop)) {
                transform(value, nextGroup, 0, true);
                rules.push('"' + prop + "{" + nextGroup.join(";") + '}"');
                continue;
            }
            if (!deep) transform(value, nextGroup, deep + 1);
            if (nextGroup.length) {
                prop = ignore
                    ? prop
                    : map(prop, selector => {
                          if (!selector.indexOf(":global")) {
                              selector = selector.replace(/:global\s+/g, "");
                          } else {
                              selector = !selector.indexOf(":this")
                                  ? selector
                                  : ":this " + selector;
                          }
                          return replace(selector);
                      });
                rules.push(
                    '"' + replace(prop) + "{" + nextGroup.join(";") + '}"'
                );
            }
        } else if (/@import/.test(prop)) {
            []
                .concat(value)
                .forEach(value =>
                    rules.push('"' + property(prop, value, false, " ") + ';"')
                );
        } else {
            []
                .concat(value)
                .forEach(value => group.push(property(prop, value)));
        }
    }
    return rules;
}
