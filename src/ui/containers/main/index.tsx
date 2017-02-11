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
    console.error('render', play.fields);
    const fields = (fields) => fields.map(field => <div
        style={{
          width: '98px',
          height: '98px',
          display: 'inline-block',
          textAlign: 'center',
          lineHeight: '98px',
          border: '1px solid',
          verticalAlign: 'top'
          }} key={field}>{field ? field: ''}</div>);

    return (
        <div style={{margin: '50px auto', width: '400px', height: '400px'}}>
          {fields(play.fields)}
          <DevTools/>
        </div>
    );
  }

  private onButton() {
    const application = this.props.application;
    application.isAutorized ? application.reset() : application.authorize();
  }
}
