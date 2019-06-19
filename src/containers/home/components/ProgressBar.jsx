import React from 'react'
import '../styles/spotify.css'
import { Progress } from 'antd'

class ProgressBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      previousPropsTime: 0,
      previousTime: 0
    }
  }
  componentDidMount() {
    this.updateTime()
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextState.previousPropsTime !== nextProps.time) {
      return {
        time: nextProps.time,
        previousPropsTime: nextProps.time,
        previousTime: nextProps.time
      }
    }
    if (nextState.time > nextState.previousTime) {
      return {
        time: nextState.time,
        previousPropsTime: nextProps.time,
        previousTime: nextState.time
      }
    }
    return null
  }
  updateTime = () => {
    this.interval = setInterval(() => {
      if (this.state.time < this.props.totalTime && this.props.isPlaying)
        this.setState({ time: this.state.time + 1 })
    }, 1000)
  }
  formatTime = time => {
    const seconds = time % 60
    const minutes = (time - seconds) / 60
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }
  render() {
    const { totalTime } = this.props
    return (
      <div className='spotify-progress-bar'>
        <div>{this.formatTime(this.state.time)}</div>
        <Progress
          percent={(this.state.time / totalTime) * 100}
          status='active'
          showInfo={false}
          className='spotify-bar'
          strokeColor='#0FD062'
        />
        <div>{this.formatTime(totalTime)}</div>
      </div>
    )
  }
}
export default ProgressBar
