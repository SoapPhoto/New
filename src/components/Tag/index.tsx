import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';
import { IconButton } from '..';
import { Hash, Trash2 } from '../Icons';
import { TagInput, TagItem, Wrapper } from './elements';

export interface ITag {
  value: string[];
  onChange: (value: string[]) => void;
}

const Tag: React.FC<ITag> = memo(({ value, onChange }) => {
  const { t } = useTranslation();
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onChange([...(new Set([...value, e.currentTarget.value]) as any)]);
        e.currentTarget.value = '';
        return false;
      }
    },
    [onChange, value],
  );
  const deleteTag = useCallback(
    (e: string) => {
      onChange(value.filter(v => v !== e));
    },
    [onChange, value],
  );
  return (
    <Wrapper>
      {value.map(e => (
        <TagItem
          style={{
            marginRight: '12px',
            marginBottom: '12px',
          }}
          key={e}
        >
          <Hash size={13} />
          {e}
          <IconButton
            css={css`
              margin-left: 6px;
            `}
            onClick={() => {}}
          >
            <Trash2 size={14} onClick={() => deleteTag(e)} />
          </IconButton>
        </TagItem>
      ))}
      <TagInput>
        <input onKeyPress={handleKeyDown} placeholder={t('label.printTag')} />
      </TagInput>
    </Wrapper>
  );
});

export default Tag;
