import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const MuiDatePicker = (props) => {

  const {value, defaultValue, setValue, label} = props;

  return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          value={value}
          onChange={setValue}
          defaultValue={defaultValue}
          autoOk
          inputVariant="outlined"
          variant="inline"
          label={label}
          format="dd/MM/yyyy"
          InputAdornmentProps={{ position: "end" }}
        />
      </MuiPickersUtilsProvider>
  );
};

export default MuiDatePicker;
