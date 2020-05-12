import { isPlainObject, uniq } from 'lodash-es';

export const schemaGenerator = (data: any, seed = {}) => {
  const getType = (o: any) => {
    if (o === null) {
      return 'string';
    } else if (Array.isArray(o)) {
      return 'array';
    } else if (isPlainObject(o)) {
      return 'object';
    }

    return typeof o;
  };

  const parse = (child: any, schema: any) => {
    const type = getType(child);
    schema.type = type;

    if (type === 'object') {
      schema.required = [];
      schema.properties = {};

      for (const key in child) {
        const item = child[key];
        schema.properties[key] = {
          title: key
        };
        parse(item, schema.properties[key]);
      }
    } else if (type === 'array') {
      schema.items = {};
      if (child.length) {
        const childsType = getType(child[0]);
        parse(child[0], schema.items);
        if (childsType !== 'object') {
          schema.items.enum = uniq(child);
        }
      }
    } else {
      schema.examples = [child];
    }

    return schema;
  };

  return parse(data, seed);
};
