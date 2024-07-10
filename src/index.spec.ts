import { describe, expect, it } from 'vitest';
import { parse } from './index';

describe('parse function', () => {
  it('parses simple string correctly', () => {
    expect(parse('simple string')).toEqual('simple string');
  });

  it('parses number as string correctly', () => {
    expect(parse('123')).toEqual(123);
  });

  it('parses boolean string correctly', () => {
    expect(parse('true')).toEqual(true);
    expect(parse('false')).toEqual(false);
  });

  it('parses JSON string correctly', () => {
    expect(parse('{"key":"value"}')).toEqual({ key: 'value' });
  });

  it('handles non-string primitive types directly', () => {
    expect(parse(123)).toEqual(123);
    expect(parse(true)).toEqual(true);
    expect(parse(null)).toEqual(null);
  });

  it('parses nested objects correctly', () => {
    expect(parse({ a: '{"b": "c"}' })).toEqual({ a: { b: 'c' } });

    expect(
      parse({
        a: JSON.stringify({
          b: JSON.stringify({
            c: JSON.stringify({
              d: 1,
            }),
          }),
        }),
      })
    ).toEqual({
      a: {
        b: {
          c: {
            d: 1,
          },
        },
      },
    });
  });

  it('parses arrays of primitives correctly', () => {
    expect(parse(['1', 'true', '{"a":1}'])).toEqual([1, true, { a: 1 }]);
  });

  it('parses arrays of objects correctly', () => {
    expect(parse([{ a: '{"b":1}' }, '{"c":2}'])).toEqual([{ a: { b: 1 } }, { c: 2 }]);
  });

  it('returns original value for unsupported types', () => {
    const func = () => {};
    expect(parse(func)).toEqual(func);
  });

  it('parses complex nested structures correctly', () => {
    const input = {
      a: '1',
      b: ['{"c":2}', 'false', '["true", "3"]'],
      d: { e: '{"f":"g"}' },
    };
    const expected = {
      a: 1,
      b: [{ c: 2 }, false, [true, 3]],
      d: { e: { f: 'g' } },
    };
    expect(parse(input)).toEqual(expected);
  });
});
