module.exports = formatTimeRange = timeRange => {
    const mins = Math.floor(timeRange / 60)
    const seconds = timeRange - hours * 60
  
    return `${mins < 10 ? "0" + mins : mins}:${
      seconds < 10 ? "0" + seconds : seconds
    }`
  }
  