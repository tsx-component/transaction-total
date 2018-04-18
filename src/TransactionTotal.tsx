import * as React from 'react';
import Animation from './Animation';
import Card from './Card';
import { IPropsType } from './PropsType';
import { ICommon } from './PropsType';
import { omit } from './util';

class TransactionTotal extends React.Component<IPropsType, any> {
  public render() {
    const isAnimation = this.props.type === 'animation';
    const children = omit(this.props, ['type']) as ICommon;
    return isAnimation ? <Animation {...children}/> : <Card {...children}/>;
  }
}

export default TransactionTotal;
