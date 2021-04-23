import React from "react";
import styled from "styled-components";

const sliderThumbStyles = (props) => (`
  width: 20px;
  height: 20px;
  cursor: pointer;
  outline: 5px solid #294e6e;
`);

const Styles = styled.div`
  display: flex;
  align-items: center;

  .value {
    flex: 1;
    font-size: 1.2rem;
    margin-left: 20px;
  }

  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 280px;
    height: 12px;
    border-radius: 10px;
    background: orange;
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${props => sliderThumbStyles(props)}
    }
  }
`;

const NewSlider = (props) => {
  const {value, onChange} = props;

  return (
    <Styles>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        className="slider"
        onChange={onChange}
      />
      <div className="value">{value}%</div>
    </Styles>
  );
}

export default NewSlider;