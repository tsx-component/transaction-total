import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TransactionTotal from './TransactionTotal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TransactionTotal  type="animation" value={22} hideTag={true} fixLength={12}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
