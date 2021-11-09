import { parseToRgb, rgbToColorString } from 'polished';
import React from 'react';
import SwitchCom, { ReactSwitchProps } from 'react-switch';
import { useTheme } from 'styled-components/macro';
import {
  IosSwitch,
} from 'react-styled-switch'

// export interface ISwitchProps {
//   checked: boolean;
//   label?: string;
//   bio?: string;
//   onChange: (
//     checked: boolean,
//     event?: React.SyntheticEvent<MouseEvent | KeyboardEvent> | MouseEvent,
//     id?: string,
//   ) => void;
// }

const Switch: React.FC<ReactSwitchProps> = ({ ...props }) => {
  const theme = useTheme();
  return (
    // <div>1</div>
    // <IosSwitch />
    <SwitchCom
      onColor={rgbToColorString(parseToRgb(theme.colors.primary))}
      handleDiameter={20}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="none"
      activeBoxShadow="none"
      height={26}
      width={48}
      {...props}
    />
  );
};

export default Switch;
