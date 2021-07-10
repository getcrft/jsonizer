import { schemaGenerator } from '../src';

describe('Schema Generator', () => {
  it('should handle boolean', () => {
    const result = schemaGenerator({
      baz: true,
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'Baz',
          type: 'boolean',
          examples: [true],
        },
      },
    };

    expect(result).toStrictEqual(expected);
  });

  it('should handle string', () => {
    const result = schemaGenerator({
      baz: 'bar',
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'Baz',
          type: 'string',
          examples: ['bar'],
        },
      },
    };

    expect(result).toStrictEqual(expected);
  });

  it('should handle string array', () => {
    const result = schemaGenerator({
      baz: ['foo', 'bar'],
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'Baz',
          type: 'array',
          items: {
            type: 'string',
            enum: ['foo', 'bar'],
            examples: ['bar'],
          },
        },
      },
    };

    expect(result).toStrictEqual(expected);
  });

  it('should handle multi object array', () => {
    const result = schemaGenerator({
      baz: [
        {
          address: '172.217.12.238',
        },
        {
          email: 'austin@crft.app',
          address: '172.217.12.239',
        },
      ],
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'Baz',
          type: 'array',
          items: {
            type: 'object',
            required: [],
            properties: {
              address: {
                title: 'Address',
                type: 'string',
                examples: ['172.217.12.239'],
              },
              email: {
                title: 'Email',
                type: 'string',
                examples: ['austin@crft.app'],
              },
            },
          },
        },
      },
    };

    expect(result).toStrictEqual(expected);
  });

  it('should handle single object array', () => {
    const result = schemaGenerator({
      baz: [
        {
          bar: true,
        },
      ],
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'Baz',
          type: 'array',
          items: {
            type: 'object',
            required: [],
            properties: {
              bar: {
                title: 'Bar',
                type: 'boolean',
                examples: [true],
              },
            },
          },
        },
      },
    };

    expect(result).toStrictEqual(expected);
  });

  it('should handle simple nested', () => {
    const result = schemaGenerator({
      baz: {
        bar: true,
      },
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'Baz',
          type: 'object',
          required: [],
          properties: {
            bar: {
              type: 'boolean',
              title: 'Bar',
              examples: [true],
            },
          },
        },
      },
    };

    expect(result).toStrictEqual(expected);
  });

  it('should handle deep nested', () => {
    const result = schemaGenerator({
      baz: {
        bar: true,
        foo: {
          bar: true,
        },
      },
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'Baz',
          type: 'object',
          required: [],
          properties: {
            bar: {
              type: 'boolean',
              title: 'Bar',
              examples: [true],
            },
            foo: {
              title: 'Foo',
              type: 'object',
              required: [],
              properties: {
                bar: {
                  type: 'boolean',
                  title: 'Bar',
                  examples: [true],
                },
              },
            },
          },
        },
      },
    };

    expect(result).toStrictEqual(expected);
  });

  it('should handle deep nested array', () => {
    const result = schemaGenerator({
      baz: {
        bar: true,
        foo: {
          bar: ['foo', 'bar'],
        },
      },
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'Baz',
          type: 'object',
          required: [],
          properties: {
            bar: {
              type: 'boolean',
              title: 'Bar',
              examples: [true],
            },
            foo: {
              title: 'Foo',
              type: 'object',
              required: [],
              properties: {
                bar: {
                  title: 'Bar',
                  type: 'array',
                  items: {
                    type: 'string',
                    enum: ['foo', 'bar'],
                    examples: ['bar'],
                  },
                },
              },
            },
          },
        },
      },
    };

    expect(result).toStrictEqual(expected);
  });
});
