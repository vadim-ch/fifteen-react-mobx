import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer, inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { ApplicationStore } from '../../../stores/application';

@inject('application')
@inject('play')
@observer
export class Main extends React.Component<any, {}> {
  constructor(props) {
    super(props);
    this.onButton = this.onButton.bind(this);
  }

  public render() {
    const application = this.props.application;
    const play = this.props.play;
    console.error('render');
    return (
        <div style={{margin: '50px auto', width: '160px'}}>
           <div></div>
          <DevTools/>
        </div>
    );
  }

  private onButton() {
    const application = this.props.application;
    application.isAutorized ? application.reset() : application.authorize();
  }
}
