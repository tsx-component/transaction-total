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

export function padLeftNumber(
  value: string, length: number, fixLength?: number
): string[] {
  return fixLength ? padStart(value, length, '0').split('') : String(value).split('');
}

export function hasHideLabel (hasHide: boolean, length: number, index: number, numberPrecision: number | undefined) {
  const unitIndex = length - index - (numberPrecision ? numberPrecision + 1 : 0);
  return !hasHide && (unitIndex === 9 || unitIndex === 5);
}

export function getLabel (length: number, index: number, numberPrecision: number | undefined) {
  const labelIndex = length - index - (numberPrecision ? numberPrecision + 1 : 0);
  if (labelIndex === 9) {
    return '亿';
  } else if (labelIndex === 5) {
    return '万';
  } else {
    return '';
  }
}