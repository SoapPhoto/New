import { Field, FieldProps } from 'formik';
import React, { CSSProperties, memo } from 'react';
import { Switch, SwitchProps } from '@arco-design/web-react';
import { css } from 'styled-components/macro';

import { Place } from '@app/common/types/modules/location/interface/place.interface';
import { Trash } from 'react-feather';
import { FieldItem } from '.';

import '@arco-design/web-react/es/Switch/style/index.js';
import LocationModal from '../LocationModal';
import { useSearchParamModal } from '@app/utils/hooks';
import IconButton from '../Button/IconButton';

interface IProps extends Omit<SwitchProps, 'checked' | 'onChange'> {
  label: string;
  name: string;
  bio?: string;
  style?: CSSProperties;
  className?: string;
}

const Component = memo<FieldProps<Place> & IProps>(
  ({
    bio,
    field,
    label,
    className,
    form: { touched, errors, setFieldValue },
    style,
  }) => {
    const [, , openEditLocation] = useSearchParamModal(
      'editLocation',
      'modal-child',
    );
    return (
      <FieldItem
        onClick={() => {
          openEditLocation();
          // setFieldValue(field.name, !field.value);
        }}
        label={label}
        bio={bio}
        style={style}
        className={className}
      >
        {
          field.value ? (
            <div css={css`display: flex;justify-content: center;align-items: center;line-height: normal;`}>
              <div>
                <div css={css``}>{field.value.name}</div>
                <div css={css`font-size: 12px;margin-top: 4px;color: ${((p) => p.theme.colors.secondary)};`}>{field.value.address}</div>
              </div>
              <IconButton
                css={css`margin-left: 24px;`}
                onClick={(e) => {
                  setFieldValue(field.name, undefined);
                  e.stopPropagation();
                }}
              >
                <Trash color="red" size={20} />
              </IconButton>
            </div>
          ) : (
            <div />
          )
        }
      </FieldItem>
    );
  },
);

const FieldLocation: React.FC<IProps> = ({ name, ...restProps }) => (
  <Field name={name} component={Component} {...restProps} />
);
export default FieldLocation;
