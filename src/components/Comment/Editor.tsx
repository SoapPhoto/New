import React, {
  useCallback, useRef, useState, useEffect,
} from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components/macro';
import { rem } from 'polished';
import { useTranslation } from 'react-i18next';

import { useAccount } from '@app/stores/hooks';
import { isIn } from '@app/utils/dom';
import { customMedia } from '@app/styles/mediaQuery';
import Avatar from '../Avatar';
import Textarea from '../Input/Textarea';
import Button from '../Button';

interface IProps {
  child?: boolean;
  onConfirm: (value: string) => Promise<void>;
  onClose?: () => void;
  placeholder?: string;
}

const Wrapper = styled.div`
  display: flex;
  padding-bottom: 12px;
  margin-bottom: 24px;
`;

const Box = styled.div`
  flex: 1;
`;

const AvatarBox = styled.div`
  ${customMedia.lessThan('mobile')`
    display: none;
  `}
`;

const HandleBox = styled.div`
  display: flex;
  height: 36px;
  margin-top: -48px;
  padding: 0 12px;
  justify-content: space-between;
`;

const CommentEditor: React.FC<IProps> = observer(({
  child = false,
  placeholder,
  onConfirm,
  onClose,
}) => {
  const { userInfo } = useAccount();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const setInputFocus = useCallback(() => {
    inputRef.current!.focus();
  }, []);
  useEffect(() => {
    if (inputRef.current && child) inputRef.current.focus();
    const ifEl = (e: MouseEvent) => {
      if (!isIn(e.target as Node, wrapperRef.current!) && onClose) {
        setTimeout(() => onClose(), 100);
      }
    };
    if (child) {
      document.addEventListener('mousedown', ifEl);
      return () => document.removeEventListener('mousedown', ifEl);
    }
    return function () {
      return null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }, []);
  const onConfirmClick = useCallback(async () => {
    setLoading(true);
    try {
      await onConfirm(value);
      if (!child) setValue('');
    } catch (err) {
      console.error(err);
      setLoading(false);
    } finally {
      if (!child) setLoading(false);
    }
  }, [child, onConfirm, value]);
  return (
    <Wrapper ref={wrapperRef}>
      <AvatarBox>
        <Avatar style={{ marginRight: rem(12) }} src={userInfo?.avatar} />
      </AvatarBox>
      <Box>
        <Textarea
          value={value}
          minRows={2}
          boxStyle={{
            paddingBottom: '48px',
            paddingTop: '12px',
          }}
          onChange={onInputChange}
          inputRef={inputRef}
        />
        <HandleBox
          onClick={setInputFocus}
        >
          <span />
          <Button
            style={{ width: 'auto' }}
            type="primary"
            loading={loading}
            onClick={onConfirmClick}
            disabled={!value}
          >
            发送
          </Button>
        </HandleBox>
      </Box>
    </Wrapper>
  );
});
export default CommentEditor;
