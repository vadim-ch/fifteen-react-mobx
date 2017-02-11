import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer, inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { ApplicationStore } from '../../../stores/application';
import { Move } from '../../../stores/play';

const KEY_CODES = {
  UP: '38',
  DOWN: '40',
  LEFT: '37',
  RIGHT: '39'
};

const MOVE_CODES = {
  [KEY_CODES.UP]: Move.Up,
  [KEY_CODES.DOWN]: Move.Down,
  [KEY_CODES.LEFT]: Move.Left,
  [KEY_CODES.RIGHT]: Move.Right
};

@inject('application')
@inject('play')
@observer
export class Main extends React.Component<any, {}> {
  constructor(props) {
    super(props);
    this.onButton = this.onButton.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
  }

  public componentWillMount(): void {
    document.addEventListener('keydown', this.keyHandler, true);
  }
  public componentWillUnmount(): void {
    document.removeEventListener('keydown', this.keyHandler, true);
  }

  public render() {
    const application = this.props.application;
    const play = this.props.play;
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

  private keyHandler(e: KeyboardEvent): void {
    if (MOVE_CODES[e.keyCode] !== undefined) {
      this.props.play.move(MOVE_CODES[e.keyCode]);
    }
  }
}
