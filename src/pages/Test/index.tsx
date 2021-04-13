import React, { useState } from 'react';

import Tag from '@app/components/Tag';
import { Button } from '@app/components';

const Test = () => {
  const [value, setValue] = useState<string[]>(['还行']);
  const [loading, setLoading] = useState(false);
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
          <Tag value={value} onChange={v => setValue(v)} />
          <Button loading={loading} onClick={() => setLoading(v => !v)}>
            哈哈哈哈哈哈
          </Button>
          {/* <FieldItem
            onClick={() => setChecked(v => !v)}
            label="私人"
            bio="这个图片仅自己可见"
          >
            <Switch checked={checked} onChange={() => {}} />
          </FieldItem> */}
        </div>
      </div>
    </div>
  );
};

export default Test;
