import React, { useState } from 'react';

import UserPopover from '@app/components/UserPopover';
import { Button, Modal } from '@app/components';

const Test = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <div style={{ marginLeft: 200, marginTop: 200 }}>
        <UserPopover username="yiiu">
          <span>12312313</span>
        </UserPopover>
        <Button onClick={() => setVisible(true)}>打开</Button>
      </div>
    </div>
  );
};

export default Test;
