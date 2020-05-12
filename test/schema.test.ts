import { schemaGenerator } from '../src';

describe('Schema Generator', () => {
  it('should handle boolean', () => {
    const result = schemaGenerator({
      baz: true
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'baz',
          type: 'boolean',
          examples: [true]
        }
      }
    }

    expect(result).toStrictEqual(expected);
  });

  it('should handle string', () => {
    const result = schemaGenerator({
      baz: 'bar'
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'baz',
          type: 'string',
          examples: ['bar']
        }
      }
    }

    expect(result).toStrictEqual(expected);
  });

  it('should handle string array', () => {
    const result = schemaGenerator({
      baz: ['foo', 'bar']
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'baz',
          type: 'array',
          items: {
            type: 'string',
            enum: [
              'foo',
              'bar'
            ],
            examples: ['foo']
          }
        }
      }
    }

    expect(result).toStrictEqual(expected);
  });

  it('should handle object array', () => {
    const result = schemaGenerator({
      baz: [
        {
          bar: true
        }
      ]
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'baz',
          type: 'array',
          items: {
            type: 'object',
            required: [],
            properties: {
              bar: {
                title: 'bar',
                type: 'boolean',
                examples: [true]
              }
            }
          }
        }
      }
    }

    expect(result).toStrictEqual(expected);
  });

  it('should handle simple nested', () => {
    const result = schemaGenerator({
      baz: {
        bar: true
      }
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'baz',
          type: 'object',
          required: [],
          properties: {
            bar: {
              type: 'boolean',
              title: 'bar',
              examples: [true]
            }
          }
        }
      }
    };

    expect(result).toStrictEqual(expected);
  });

  it('should handle deep nested', () => {
    const result = schemaGenerator({
      baz: {
        bar: true,
        foo: {
          bar: true
        }
      }
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'baz',
          type: 'object',
          required: [],
          properties: {
            bar: {
              type: 'boolean',
              title: 'bar',
              examples: [true]
            },
            foo: {
              title: 'foo',
              type: 'object',
              required: [],
              properties: {
                bar: {
                  type: 'boolean',
                  title: 'bar',
                  examples: [true]
                }
              }
            }
          }
        }
      }
    };

    expect(result).toStrictEqual(expected);
  });

  it('should handle deep nested array', () => {
    const result = schemaGenerator({
      baz: {
        bar: true,
        foo: {
          bar: ['foo', 'bar']
        }
      }
    });

    const expected = {
      type: 'object',
      required: [],
      properties: {
        baz: {
          title: 'baz',
          type: 'object',
          required: [],
          properties: {
            bar: {
              type: 'boolean',
              title: 'bar',
              examples: [true]
            },
            foo: {
              title: 'foo',
              type: 'object',
              required: [],
              properties: {
                bar: {
                  title: 'bar',
                  type: 'array',
                  items: {
                    type: 'string',
                    enum: [
                      'foo',
                      'bar'
                    ],
                    examples: ['foo']
                  }
                }
              }
            }
          }
        }
      }
    };

    expect(result).toStrictEqual(expected);
  });
});
