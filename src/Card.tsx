import * as React from 'react';
import './Card.css';
import { ICommon } from './PropsType';
import { getLabel, hasHideLabel, padLeftNumber } from './util';

interface ITip {
  bottomNum: string;
  tipBottom: boolean;
  tipBottomNum: string;
  tipTop: boolean;
  tipTopNum: string;
  topNum: string;
}

interface IState {
  numArr: ITip[];
  value: number;
  preValue: number;
}

interface IIndex {
  index: number;
  preValue: string;
  nextValue: string;
}

const $timeout = (delay: number) => new Promise(resolve => {
  setTimeout(() => resolve(), delay);
});

export const flipDigitTo = (indexArr: IIndex[], numArr: ITip[]) => {
  indexArr.forEach((v: IIndex) => {
    numArr[v.index].tipTop = true;
    numArr[v.index].topNum = v.nextValue;
  });
  
  $timeout(300).then(() => {
    indexArr.forEach((v: IIndex) => {
      numArr[v.index].tipTop = false;
      numArr[v.index].tipBottomNum = v.nextValue;
      numArr[v.index].tipTopNum = v.nextValue;
      numArr[v.index].tipBottom = true;
    });

    return $timeout(150)
  }).then(() => {
    indexArr.forEach((v: IIndex) => {
      numArr[v.index].tipBottom = false;
      numArr[v.index].bottomNum = v.nextValue;
    });
  });
};

class Card extends React.Component<ICommon, IState> {
  public static getDerivedStateFromProps(nextProps: ICommon, preState: IState) {
    console.log('nextProps--------', nextProps);
    // debugger;
    if (typeof nextProps.value !== 'number') {
      throw new Error('value必须是数字类型');
    }

    const { fixLength } = nextProps;
    const nextValue = nextProps.value;
    const nextValueStr = padLeftNumber(String(nextValue), fixLength || 12, fixLength);
    const numArr: ITip[] = Array.from({length: nextValueStr.length}, (v: ITip, i: number) => ({
      bottomNum: nextValueStr[i] || '0',
      tipBottom: false,
      tipBottomNum: nextValueStr[i] || '0',
      tipTop: false,
      tipTopNum: nextValueStr[i] || '0',
      topNum: nextValueStr[i] || '0',
    }));
    /*
    flipDigitTo(
      numArr.map((v: ITip, i: number) => ({
        index: i,
        nextValue: nextValue[i],
        preValue: v.topNum
      })).filter((v: IIndex) => v.preValue !== v.nextValue),
      numArr
    );
    */
    return {
      numArr,
      preValue: preState.value, 
      value: nextValue,
    };
  }

  public state = {
    numArr: [],
    preValue: 0,
    value: 0,
  }

  constructor(props: ICommon) {
    super(props);

    const { value, fixLength } = this.props;
    const numArr: ITip[] = padLeftNumber(String(value), fixLength || 12, fixLength)
      .map(v => ({
        bottomNum: v,
        tipBottom: false,
        tipBottomNum: v,
        tipTop: false,
        tipTopNum: v,
        topNum: v,
      }));
    this.state.numArr = numArr as any;
  }

  public render() {
    const { numArr } = this.state;
    const { hideTag, numberPrecision } = this.props;

    return (
      <div className="cart-total">
        {
          numArr.map((v: ITip, i: number) => {
            return (
              <div className="digit" key={i}>
                <div className="flap-top">
                  <span className="item-num">{v.topNum}</span>
                </div>
                {
                  v.tipTop  &&  (
                    <div className="flap-top-flip">
                      <span className="item-num">{v.tipTopNum}</span>
                    </div>
                  )
                }
                <div className="flap-bottom">
                  <span className="item-num">{v.bottomNum}</span>
                </div>
                {
                  v.tipBottom && (
                    <div className="flap-bottom-flip">
                      <span className="item-num">{v.tipBottomNum}</span>
                    </div>
                  )
                }
                {
                  hasHideLabel(hideTag, numArr.length, i, numberPrecision) &&
                  <div className="unit">{getLabel(numArr.length, i, numberPrecision)}</div>
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Card;