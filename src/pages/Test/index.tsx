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
      <Modal centered visible={visible} onClose={() => setVisible(false)}>
        <div style={{ maxWidth: '400px', width: '100%', height: '400px' }}>
          124124142124124142124124142124124142124124142124124142124124142124124142
        </div>
      </Modal>
    </div>
  );
};

export default Test;
