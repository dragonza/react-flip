import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './FlipCard.css';

class FlipCard extends Component {
  handleOnClick = () => {
    const { onCardClick } = this.props;
    onCardClick();
  };

  render() {
    const {
      frontContent,
      backContent,
      width,
      height,
      perspective,
      frontCardStyle,
      backCardStyle,
      cardContainerStyle,
      horizontal
    } = this.props;
    const cardClasses = classnames('card', {
      'card__flipped--horizontal': this.props.flipped && this.props.horizontal,
      card__flipped: this.props.flipped
    });
    const backCardClass = classnames('card__face card__face--back ', {
      'card__flipped--horizontal': horizontal
    });
    return (
      <div
        className="frame"
        style={{
          width,
          height,
          perspective
        }}
      >
        <div
          className={cardClasses}
          style={{
            ...cardContainerStyle
          }}
          onClick={this.handleOnClick}
        >
          <div
            className="card__face card__face--front"
            style={{
              ...frontCardStyle
            }}
          >
            {frontContent}
          </div>
          <div className={backCardClass} style={{ ...backCardStyle }}>
            {backContent}
          </div>
        </div>
      </div>
    );
  }
}

FlipCard.propTypes = {
  frontContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  backContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  flipDuration: PropTypes.number,
  horizontal: PropTypes.bool
};

FlipCard.defaultProps = {
  height: '260px',
  width: '200px',
  perspective: '1000px',
  flipDuration: 1,
  vertical: true,
  frontContent: 'This is front',
  backContent: 'This is back',
  frontCardStyle: { background: '#d41f42'},
  backCardStyle: { background: '#2e508b'}
};

export default FlipCard;
