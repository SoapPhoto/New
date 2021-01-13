import React, { useEffect, useLayoutEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { useAccount } from '@app/stores/hooks';
import { observer } from 'mobx-react';
import { Image, Loading } from '@app/components';
import { BG, Content, LoadingBox, RightBox, Wrapper } from './elements';

const Account = observer(() => {
  const [loading, setLoading] = useState(true);
  const { isLogin, init } = useAccount();
  let navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate('/', {
        replace: true,
      });
    }
    if (init && !isLogin) {
      setLoading(false);
    }
  }, [isLogin, init, navigate]);
  return (
    <Wrapper>
      {loading ? (
        <LoadingBox>
          <Loading size={42} />
        </LoadingBox>
      ) : (
        <>
          <BG>
            {/* <Image
              blurhash="LXL;s+?HM{M{.ToIt7s:S*V@a}t6"
              src="https://cdn-oss.soapphoto.com/photo/6c71ed8a-56de-4e35-90e0-cddd9f2fbd95@!regular_webp"
            /> */}
          </BG>
          <RightBox>
            <Content>
              <Outlet />
            </Content>
          </RightBox>
        </>
      )}
    </Wrapper>
  );
});

export default Account;
