import React, { useRef, useState, useEffect } from 'react';
import { useSearchParamModal } from '@app/utils/hooks';
import { AutoComplete, Select } from '@arco-design/web-react';
import { css } from 'styled-components/macro';
import debounce from 'lodash/debounce';
import { useLazyQuery } from '@apollo/client';

import { PlaceDetail, PlaceSuggestion } from '@app/graphql/query';
import { OptionInfo } from '@arco-design/web-react/es/Select/interface';
import { LocationEntity } from '@app/common/types/modules/location/location.entity';
import Modal from '../Modal';

import cities from './cities.json';

import '@arco-design/web-react/es/Select/style/index.js';
import '@arco-design/web-react/es/AutoComplete/style/index.js';
import Button from '../Button';

const { Option } = Select;

interface IProps {
  onOk: (poi: LocationEntity) => void;
  city?: string;
}

const LocationModal: React.FC<IProps> = ({
  onOk,
  city,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [visible, close] = useSearchParamModal('editLocation', 'modal-child');
  const [region, setRegion] = useState<string>();
  const [loadPlaceSuggestion, placeSuggestionData] = useLazyQuery<{
    placeSuggestion: LocationEntity[];
  }>(PlaceSuggestion, {
    fetchPolicy: 'network-only',
  });
  const [loadPlaceDetail, placeDetailData] = useLazyQuery<{
    placeDetail: LocationEntity;
  }>(PlaceDetail, {
    fetchPolicy: 'network-only',
  });
  const handleSearch = debounce((inputValue) => {
    loadPlaceSuggestion({
      variables: {
        value: inputValue,
        region,
      },
    });
  }, 500);
  const handleSelect = (value: string, options: OptionInfo) => {
    loadPlaceDetail({
      variables: {
        uid: options._key!,
      },
    });
  };
  const ok = () => {
    onOk(placeDetailData.data!.placeDetail);
  };
  useEffect(() => {
    if (visible && city) {
      setRegion(city);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
  return (
    <Modal
      visible={visible}
      onClose={() => close()}
      centered
      destroyOnClose
      closable
      fullscreen
      maxWidth={600}
    >
      <Modal.Header>
        <Modal.Title>
          编辑地址
        </Modal.Title>
      </Modal.Header>
      <Modal.Content css={css`margin: 24px 24px;`} ref={contentRef}>
        <div
          css={css`display: grid;grid-template-columns: 1fr 2fr; grid-column-gap: 16px;`}
        >
          <Select
            placeholder="城市选择"
            showSearch
            allowClear
            allowCreate
            value={region}
            onChange={(v) => setRegion(v)}
            filterOption={(inputValue, option) => option.props.value.indexOf(inputValue) >= 0
            || option.props.children.indexOf(inputValue) >= 0}
          >
            {cities.map((option) => (
              <Option key={option.code} value={option.name}>
                {option.name}
              </Option>
            ))}
          </Select>
          <AutoComplete
            placeholder="地点名称"
            disabled={!region}
            onSearch={handleSearch}
            onSelect={handleSelect}
            loading={placeSuggestionData.loading}
            filterOption={false}
          >
            {(placeSuggestionData.data?.placeSuggestion || []).map((option) => (
              <Option className="autocomplete-diy" key={option.uid} value={option.name}>
                <div>
                  <div>
                    {option.name}
                  </div>
                  {
                  option.address && (
                    <div
                      css={css`font-size: 12px; color: ${((p) => p.theme.colors.secondary)};`}
                    >
                      {option.address}
                    </div>
                  )
                }
                </div>
              </Option>
            ))}
          </AutoComplete>
        </div>
        <Button onClick={ok} disabled={placeDetailData.loading} css={css`margin-top: 24px;`}>确定</Button>
      </Modal.Content>
    </Modal>
  );
};

export default LocationModal;
