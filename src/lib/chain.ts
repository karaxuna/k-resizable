function chain<TThis>(fn: (this: TThis) => void): (this: TThis) => TThis;
function chain<TThis, T1>(fn: (this: TThis, t1: T1) => void): (this: TThis, t1: T1) => TThis;
function chain<TThis, T1, T2>(fn: (this: TThis, t1: T1, t2: T2) => void): (this: TThis, t1: T1, t2: T2) => TThis;
function chain<TThis, T1, T2, T3>(fn: (this: TThis, t1: T1, t2: T2, t3: T3) => void): (this: TThis, t1: T1, t2: T2, t3: T3) => TThis;

function chain(fn) {
    return function wrapper() {
        fn.apply(this, arguments);
        return this;
    };
};

export default chain;
