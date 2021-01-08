import React from 'react';

import UserPopover from '@app/components/UserPopover';

const Test = () => {
  return (
    <div>
      <div style={{ marginLeft: 200, marginTop: 200 }}>
        <UserPopover username="yiiu">
          <span>12312313</span>
        </UserPopover>
      </div>
    </div>
  );
};

export default Test;
