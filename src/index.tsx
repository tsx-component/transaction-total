import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import TransactionTotal from './TransactionTotal';

let test = 12412340;

setInterval(() => {
  test = test + 2345;
  ReactDOM.render(
    <TransactionTotal type="animation" value={test} hideTag={false} fixLength={12}/>,
    document.getElementById('root1') as HTMLElement
  );
  ReactDOM.render(
    <TransactionTotal type="animation" value={test} hideTag={false} fixLength={12} numberPrecision={2}/>,
    document.getElementById('root2') as HTMLElement
  );
  ReactDOM.render(
    <TransactionTotal type="animation" value={test} hideTag={true} fixLength={0} numberPrecision={2} delay={2}/>,
    document.getElementById('root3') as HTMLElement
  );
}, 3000);

registerServiceWorker();
