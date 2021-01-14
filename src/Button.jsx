import React from 'react';

class Button extends React.Component {
  render () {
    const { onClick, btnText, disabled } = this.props;
    return (
        <button className='button' onClick={onClick} disabled={disabled}>{btnText}</button>
    )
  }
}

export default Button;