import startCase from 'lodash/startCase';
import isPlainObject from 'lodash/isPlainObject';
import uniq from 'lodash/uniq';
import merge from 'lodash/merge';

export type GeneratorOptions = {
  formatTitle?: boolean;
};

export const schemaGenerator = (data: any, options: GeneratorOptions = { formatTitle: true }) => {
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
        const title = options.formatTitle ? startCase(key) : key;
        schema.properties[key] = {
          title
        };

        parse(item, schema.properties[key]);
      }
    } else if (type === 'array') {
      schema.items = {};
      if (child.length) {
        const childsType = getType(child[0]);

        for (const c of child) {
          const items = parse(c, {});
          schema.items = merge({}, schema.items, items);
        }

        if (childsType !== 'object') {
          schema.items.enum = uniq(child);
        }
      }
    } else {
      schema.examples = [child];
    }

    return schema;
  };

  return parse(data, {});
};
