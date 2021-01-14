import React, { useState } from 'react';

import UserPopover from '@app/components/UserPopover';
import { Button, FieldItem, Switch } from '@app/components';

const Test = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <div style={{ marginLeft: 200, marginTop: 200 }}>
        {/* <UserPopover username="yiiu">
          <span>12312313</span>
        </UserPopover> */}
        <div
          css={`
            width: 320px;
          `}
        >
          <FieldItem
            onClick={() => setChecked(v => !v)}
            label="私人"
            bio="这个图片仅自己可见"
          >
            <Switch checked={checked} onChange={() => {}} />
          </FieldItem>
        </div>
      </div>
    </div>
  );
};

export default Test;
