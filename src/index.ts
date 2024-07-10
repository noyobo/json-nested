function tryParse(source: string) {
  if (isString(source)) {
    try {
      return parseNested(JSON.parse(source));
    } catch {
      return source;
    }
  }
  return source;
}

function isObject(source: any): source is Record<string, any> {
  return typeof source === 'object' && source !== null;
}

function isArray(source: any): source is any[] {
  return Array.isArray(source);
}

function isString(source: any): source is string {
  return typeof source === 'string';
}

function parseNested(source: any): any {
  if (isArray(source)) {
    return source.map(v => parseNested(v));
  }
  if (isObject(source)) {
    const result: Record<string, any> = {};
    for (const key in source) {
      result[key] = parseNested(source[key]);
    }
    return result;
  }
  return tryParse(source);
}

export const parse = (source: any) => {
  return parseNested(source);
};
