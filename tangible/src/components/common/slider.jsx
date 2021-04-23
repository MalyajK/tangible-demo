import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 292 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(5),
  },
}));

// function ValueLabelComponent(props) {
//   const { children, open, value } = props;

//   return (
//     <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
//       {children}
//     </Tooltip>
//   );
// }

// ValueLabelComponent.propTypes = {
//   children: PropTypes.element.isRequired,
//   open: PropTypes.bool.isRequired,
//   value: PropTypes.number.isRequired,
// };

export const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function CustomizedSlider(props) {
  const classes = useStyles();
  const {value, setDrag, setCommit, defaultValue} = props;

  return (
    <div className={classes.root}>
      <div className={classes.margin} />
      <PrettoSlider
        valueLabelDisplay="on"
        aria-label="pretto slider"
        defaultValue={ defaultValue }
        value={value}
        onChange={setDrag}
        onChangeCommitted={setCommit}
        color="secondary"
      />
    </div>
  );
}
