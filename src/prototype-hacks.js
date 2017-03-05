export function setCircularPrototypeOf(o1, o2) {
    var handlers = {
        get(target, key, context) {
            if (Reflect.has(target, key)) {
                return Reflect.get(target, key, context);
            } else {
                return Reflect.get(
                        target[Symbol.for('[[Prototype]]')],
                        key,
                        context);
            }
        }
    };

    var proxy1 = new Proxy(o1, handlers);
    var proxy2 = Object.assign(Object.create(proxy1), o2);

    proxy1[ Symbol.for('[[Prototype]]') ] = proxy2;

    return [ proxy1, proxy2 ];
}

export function setPrototypesOf(targetObj, prototypes) {

    var handlers = {
        get(target, key, context) {
            if (Reflect.has(target, key)) {
                return Reflect.get(target, key, context);
            } else {
                for (var P of target[Symbol.for('[[Prototype]]')]) {
                    if(Reflect.has(P, key)) {
                        return Reflect.get(
                            P,
                            key,
                            context);
                    }
                }
            }
        }
    };

    var p = new Proxy(targetObj, handlers);
    p[Symbol.for('[[Prototype]]')] = prototypes;

    return p;
}