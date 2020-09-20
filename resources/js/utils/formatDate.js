export default (value = null) => {
  const date = value ? new Date(value) : new Date();

  const longFormat = () => {
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };

    return date.toLocaleString(undefined, options);
  }

  const shortFormat = () => {
    const options = {
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric'
    };

    return date.toLocaleString(undefined, options);
  }

  return {
    longFormat,
    shortFormat
  }
}