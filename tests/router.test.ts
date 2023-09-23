// const route = require('../src/components/Router');
import { parsePath, PathValues } from '../src/components/Router';

describe('testing parsePath function', () => {
    test('parsing /test should return an empty map', () => {
        let expected: PathValues = {};
        expect(parsePath('/test', '/test')).toStrictEqual(expected);
    })

    test('parsing /test/{foo} should return {"foo": "bar"}', () => {
        let expected: PathValues = {"foo": "bar"};
        expect(parsePath('/test/{foo}', '/test/bar')).toStrictEqual(expected);
    })

    test('parsing /test/{foo}/{hello} should return {"foo": "bar", "hello": "world"}', () => {
        let expected: PathValues = {"foo": "bar", "hello": "world"};
        expect(parsePath('/test/{foo}/{hello}', '/test/bar/world')).toStrictEqual(expected);
    })
})