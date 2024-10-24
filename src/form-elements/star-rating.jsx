import React, { useState, useRef } from 'react';

/**
 * @typedef {Object} StarRatingProps
 * @property {string} name - Input name attribute
 * @property {string} [caption] - Optional caption
 * @property {number} [ratingAmount=5] - Number of stars to display
 * @property {number} [rating] - Initial rating value
 * @property {Function} [onRatingClick] - Callback when rating is clicked
 * @property {boolean} [disabled=false] - Whether the rating is disabled
 * @property {boolean} [editing=false] - Whether the rating is in edit mode
 * @property {string} [size] - Size variant of the rating
 * @property {number} [step=0.5] - Step increment for rating values
 */

const StarRating = ({
  name,
  caption,
  ratingAmount = 5,
  rating: initialRating,
  onRatingClick = () => {},
  disabled = false,
  editing: initialEditing = false,
  size = 'large',
  step = 0.5,
}) => {
  const min = 0;
  const max = ratingAmount;

  const rootRef = useRef(null);
  const containerRef = useRef(null);

  const getStars = () => '★'.repeat(ratingAmount);

  const getWidthFromValue = (val) => {
    if (val <= min || min === max) return 0;
    if (val >= max) return 100;
    return (val / (max - min)) * 100;
  };

  const getStarRatingPosition = (val) => `${getWidthFromValue(val)}%`;

  const initialCache = {
    pos: initialRating ? getStarRatingPosition(initialRating) : 0,
    rating: initialRating,
  };

  const [state, setState] = useState({
    ratingCache: initialCache,
    editing: initialEditing || !initialRating,
    rating: initialCache.rating,
    pos: initialCache.pos,
    glyph: getStars(),
  });

  const getPosition = (e) =>
    e.pageX - rootRef.current.getBoundingClientRect().left;

  const applyPrecision = (val, precision) => {
    return parseFloat(val.toFixed(precision));
  };

  const getDecimalPlaces = (num) => {
    const match = `${num}`.match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return !match
      ? 0
      : Math.max(
          0,
          (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0)
        );
  };

  const getValueFromPosition = (pos) => {
    const precision = getDecimalPlaces(step);
    const maxWidth = containerRef.current.offsetWidth;
    const diff = max - min;
    let factor = (diff * pos) / (maxWidth * step);
    factor = Math.ceil(factor);
    let val = applyPrecision(parseFloat(min + factor * step), precision);
    val = Math.max(Math.min(val, max), min);
    return val;
  };

  const calculate = (pos) => {
    const val = getValueFromPosition(pos);
    const width = `${getWidthFromValue(val)}%`;
    return { width, val };
  };

  const handleMouseLeave = () => {
    setState((prev) => ({
      ...prev,
      pos: prev.ratingCache.pos,
      rating: prev.ratingCache.rating,
    }));
  };

  const handleMouseMove = (e) => {
    const pos = getPosition(e);
    const { width, val } = calculate(pos);
    setState((prev) => ({
      ...prev,
      pos: width,
      rating: val,
    }));
  };

  const handleClick = (e) => {
    if (disabled) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    const newCache = {
      pos: state.pos,
      rating: state.rating,
      caption,
      name,
    };

    setState((prev) => ({
      ...prev,
      ratingCache: newCache,
    }));

    onRatingClick(e, newCache);
    return true;
  };

  const containerClass = [
    'rating-container',
    'rating-gly-star',
    disabled && 'rating-disabled',
    size && `react-star-rating__size--${size}`,
    state.editing && 'rating-editing',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="star-rating-wrapper">
      <style>
        {`
          .star-rating-wrapper {
            display: inline-block;
            position: relative;
          }
          
          .react-star-rating {
            display: inline-block;
            position: relative;
          }
          
          .rating-container {
            position: relative;
            vertical-align: middle;
            display: inline-block;
            color: #e3e3e3;
            overflow: hidden;
            font-size: 24px;
          }
          
          .rating-container:before {
            content: attr(data-content);
          }
          
          .rating-container .rating-stars {
            position: absolute;
            left: 0;
            top: 0;
            white-space: nowrap;
            overflow: hidden;
            color: #ffd700;
            transition: width 0.2s ease-in-out;
          }
          
          .rating-container .rating-stars:before {
            content: attr(data-content);
          }
          
          .rating-container.rating-disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }
          
          /* Size Variants */
          .react-star-rating__size--tiny {
            font-size: 16px;
          }
          
          .react-star-rating__size--small {
            font-size: 20px;
          }
          
          .react-star-rating__size--medium {
            font-size: 24px;
          }
          
          .react-star-rating__size--large {
            font-size: 32px;
          }
          
          .react-star-rating__size--huge {
            font-size: 40px;
          }
          
          /* Hover effect only when editing */
          .rating-editing .rating-container {
            cursor: pointer;
          }
          
          .rating-editing .rating-container:hover {
            color: #d5d5d5;
          }
          
          .rating-editing .rating-container:hover .rating-stars {
            color: #ffcd00;
          }
          
          /* Animation */
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
          
          .rating-container .rating-stars.rating-active {
            animation: pulse 0.2s ease-in-out;
          }
        `}
      </style>
      <span className="react-star-rating">
        <span ref={rootRef} style={{ cursor: 'pointer' }}>
          <div
            ref={containerRef}
            className={containerClass}
            data-content={state.glyph}
            {...(state.editing && {
              onMouseMove: handleMouseMove,
              onMouseLeave: handleMouseLeave,
              onClick: handleClick,
            })}
          >
            <div
              className="rating-stars"
              data-content={state.glyph}
              style={{ width: state.pos }}
            />
          </div>
          <input
            type="hidden"
            name={name}
            value={state.ratingCache.rating}
            style={{ display: 'none', width: 65 }}
            min={min}
            max={max}
            readOnly
          />
        </span>
      </span>
    </div>
  );
};

export default StarRating;
