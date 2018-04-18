import * as React from 'react';
import './Animation.css';
import { ICommon } from './PropsType';
import { padStart } from './util';

interface IState {
  el: Element | null;
  numArr: string[];
  value: number;
  handle?: number;
}

export function padLeftNumber(
  value: string, length: number, fixLength?: number
): string[] {
  return fixLength ? padStart(value, length, '0').split('') : String(value).split('');
}

export class Animation extends React.Component<ICommon, IState> {
  public static getDerivedStateFromProps(nextProps: ICommon, prevState: IState) {
    if (typeof nextProps.value !== 'number') {
      throw new Error('传入的value必须数字');
    }

    const { value, numberPrecision, fixLength, delay } = nextProps;

    const nextValue =
      padLeftNumber(value.toFixed(numberPrecision || 0), fixLength || 12, fixLength);

    if (!prevState.el) {
      return {
        numArr: nextValue,
        value,
      };
    }

    const preValue = padLeftNumber(String(prevState.value), fixLength || 12, fixLength);
    const numArr = Array.from({length: nextValue.length}, (v, i) => preValue[i] || '0');

    let start: number = 0;
    const handle = requestAnimationFrame(function nextStep(t) {
      start = start || t;
      const progress = Math.min((t - start) / 1000, (delay || 1));
      if (prevState.el) {
        const numberEleList = prevState.el.querySelectorAll('.number');
        const numberNow = 
          padLeftNumber(
            ((nextProps.value - prevState.value) * progress + prevState.value)
              .toFixed(numberPrecision || 0),
            fixLength || 12,
            fixLength
          );
        numberNow.forEach((v, i) => {
          numberEleList[i].textContent = v;
        });
      }

      if (progress < (delay || 1)) {
        requestAnimationFrame(nextStep);
      }
    });

    return {
      handle,
      numArr,
      value,
    }
  }

  
  public state = {
    el: null,
    handle: 0,
    numArr: [],
    value: 0,
  }

  private el: any;

  constructor(props: ICommon) {
    super(props);
  }

  public componentDidMount() {
    const parentNode = this.el;
    this.setState({
      el: parentNode
    });
  }

  public componentWillUnmount() {
    cancelAnimationFrame(this.state.handle);
  }

  public hasHideLabel = (hasHide: boolean, length: number, index: number, numberPrecision: number | undefined) => {
    const unitIndex = length - index - (numberPrecision ? numberPrecision + 1 : 0);
    return !hasHide && (unitIndex === 9 || unitIndex === 5);
  }

  public getLabel = (length: number, index: number, numberPrecision: number | undefined) => {
    const labelIndex = length - index - (numberPrecision ? numberPrecision + 1 : 0);
    if (labelIndex === 9) {
      return '亿';
    } else if (labelIndex === 5) {
      return '万';
    } else {
      return '';
    }
  }

  public render() {
    const { hideTag, numberPrecision } = this.props;
    const { numArr } = this.state;

    return (
      <div className="animation-total" ref={el => this.el=el}>
        {
          numArr.map((v, i) => {
            return (
              <div style={{display: 'flex', alignItems: 'center'}} key={i}>
                <span className="number">{v}</span>
                {
                  this.hasHideLabel(hideTag, numArr.length, i, numberPrecision) &&
                  <div className="unit">{this.getLabel(numArr.length, i, numberPrecision)}</div>
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Animation;