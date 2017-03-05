import { setCircularPrototypeOf, setPrototypesOf } from '../src/prototype-hacks';

describe('#setCircularPrototypeOf()', function() {
    it('Takes two objects and return proxies of them which are prototypes of each other.', function () {
        var expected = [
            'bar: obj1',
            'foo: obj2'
        ].join('');

        var rc = [];

        var obj1 = {
            name: 'obj1',
            foo() {
                rc.push('foo: ', this.name);
            }
        };
        var obj2 = {
            name: 'obj2',
            bar() {
                rc.push('bar: ', this.name);
            }
        };

        var [ p1, p2 ] = setCircularPrototypeOf(obj1, obj2);

        p1.bar();
        p2.foo();

        var actual = rc.join('');

        expect(actual).toEqual(expected);
    });
});

describe('#setPrototypesOf()', function() {
    it('Takes targerObject and list of that prototypes', function () {
        var expected = [
            'foo: obj3',
            'bar: obj3'
        ].join('');

        var rc = [];

        var obj1 = {
            name: 'obj1',
            foo() {
                rc.push('foo: ', this.name);
            }
        };
        var obj2 = {
            name: 'obj2',
            bar() {
                rc.push('bar: ', this.name);
            }
        };

        var obj3 = {
            name: 'obj3',
            baz() {
                this.foo();
                this.bar();
            }
        };

        var p1 = setPrototypesOf(obj3, [obj1, obj2]);
        p1.baz();

        var actual = rc.join('');

        expect(actual).toEqual(expected);
    });
});