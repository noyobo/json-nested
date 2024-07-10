function parse(source: any): any {
  if (typeof source === 'string') {
    try {
      return JSON.parse(source);
    } catch {
      return source;
    }
  } else if (Array.isArray(source)) {
    return source.map(parse);
  } else if (source && typeof source === 'object') {
    return Object.entries(source).reduce(
      (acc, [key, value]) => {
        acc[key] = parse(value);
        return acc;
      },
      {} as {
        [key: string]: any;
      }
    );
  }
  return source;
}

export { parse };
