import React, {Component} from 'react';
import {derive, track, globalOptions} from 'react-derive';

globalOptions.debug = true;

const Calculated =
  derive({
    tax: track('taxPercent')
      (function({taxPercent}) {
        return this.subtotal() * (taxPercent / 100);
      }),

    subtotal: track('items')
      (function({items}) {
        return items.reduce((acc, item) => acc + item, 0);
      }),

    total: track('taxPercent')
      (function({taxPercent}) {
        return this.subtotal() + this.tax();
      })
  })
  (class Calculated extends Component {
    render() {
      const {tax,subtotal,total} = this.props;

      return <ul>
        <li>tax: {tax}</li>
        <li>subtotal: {subtotal}</li>
        <li>total: {total}</li>
      </ul>
    }
  });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taxPercent: 5,
      items: [10,55,99,23,56]
    };
  }

  render() {
    const {taxPercent,items} = this.state;

    return <div>

      <label>
        Tax Percent:
        <input
          value={taxPercent}
          onChange={event =>
            this.setState({taxPercent: event.target.value})} />
      </label>

      <Calculated {...{taxPercent, items}} />

    </div>
  }
}

React.render(<App />, document.getElementById('example'));
