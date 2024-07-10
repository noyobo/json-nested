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
  return typeof source === 'object' && source !== null && !Array.isArray(source);
}

function isArray(source: any): source is any[] {
  return Array.isArray(source);
}

function isString(source: any): source is string {
  return typeof source === 'string';
}

function parseNested(source: any): any {
  if (isObject(source)) {
    const result: Record<string, any> = {};
    for (const key in source) {
      result[key] = parseNested(source[key]);
    }
    return result;
  }
  if (isArray(source)) {
    return source.map(v => parseNested(v));
  }
  return tryParse(source);
}

export const parse = (source: any) => {
  return parseNested(source);
};
