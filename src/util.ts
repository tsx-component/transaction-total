export function omit(obj: object, fields: string[]): any {
  const shallowCopy = {
    ...obj,
  };
  for(const key in fields) {
    if (fields.hasOwnProperty(key)) {
      delete shallowCopy[key];
    }
  }
  return shallowCopy;
}

export function $(selector: string, parentEle?: Element): Element | null {
  return parentEle ? parentEle.querySelector(selector) : document.querySelector(selector);
}

export function padStart(v: string, l: number, str: string): string {
  str = String(str || ' ');
  if (v.length > l) {
    return v;
  } else {
    l = l - v.length;
    if (l > str.length) {
      str += str.repeat(l / str.length);
    }
    return str.slice(0, l) + v;
  }
}