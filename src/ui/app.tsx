import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer, Provider } from 'mobx-react';
import * as stores from '../stores';
import { Main } from './containers/main';

export class App extends React.Component<{}, {}> {
  public render() {
    return (
        <Provider {...stores}>
          <Main/>
        </Provider>
    );
  }
}
