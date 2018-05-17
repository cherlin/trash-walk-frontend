import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Stopwatch } from 'react-native-stopwatch-timer';

const options = {
  text: {
    color: '#a4c3c6',
    fontFamily: 'MontserratSemiBold',
    fontSize: 36,
    textAlign: 'center',
  },
};

export default class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      stopwatchReset: false,
    };

    this.toggleStopwatch = this.toggleStopwatch.bind(this);
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  toggleStopwatch() {
    this.setState({ stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false });
  }

  render() {
    return (
      <View>
        <Stopwatch
          sec={true}
          start={this.props.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this.getFormattedTime}
        />
      </View>
    );
  }
}

StopWatch.propTypes = {
  stopwatchStart: PropTypes.func.isRequired,
};
