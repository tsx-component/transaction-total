export interface ICommon {
  value: number;
  hideTag: boolean;
  fixLength: number;
  delay?: number;
  numberPrecision?: number;
}

export interface IPropsType extends ICommon {
  type: 'animation' | 'string';
}
