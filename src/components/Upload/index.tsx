import { isFunction } from 'lodash';
import React from 'react';
import styled from 'styled-components/macro';

type DragType = 'leave' | 'drop' | 'over';

export type UploadChildren =
  | React.ReactNode
  | ((type: DragType) => React.ReactNode);

export interface IUploadProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * 文件上传事件
   *
   * @memberof IUploadProps
   */
  onFileChange: (files: FileList | null) => void;
  wrapperRef?: React.LegacyRef<HTMLButtonElement>;
  /**
   * 是否拖动上传
   *
   * @type {boolean}
   * @memberof IUploadProps
   */
  drag?: boolean;
  /**
   * 文件过滤
   *
   * @type {string}
   * @memberof IUploadProps
   */
  accept?: string;
  children: UploadChildren;
}

const Input = styled.input`
  visibility: hidden;
  width: 0px;
  height: 0px;
`;

const Upload: React.FC<IUploadProps> = ({
  children,
  onFileChange,
  wrapperRef,
  onClick,
  accept = 'image/*',
  ...restProps
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragType, setDragType] = React.useState<DragType>('leave');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(e.target.files);
    e.target.value = '';
  };
  const uploadImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    inputRef.current!.click();
    if (isFunction(onClick)) {
      onClick(e);
    }
  };
  const onFileDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.type === 'dragover') {
      if (dragType !== 'drop') {
        setDragType('drop');
      }
      return;
    }
    setDragType('over');
    onFileChange(e.dataTransfer.files);
  };
  const onFileLeave = () => {
    setDragType('leave');
  };
  const onFileEnter = () => {
    setDragType('drop');
  };
  const event: Partial<React.HTMLAttributes<HTMLButtonElement>> = {
    onClick: uploadImage,
    onDrop: onFileDrop,
    onDragOver: onFileDrop,
    onDragLeave: onFileLeave,
    onDragEnter: onFileEnter,
  };
  return (
    <button onClick={uploadImage} ref={wrapperRef} {...event} {...restProps}>
      <Input
        accept={accept}
        type="file"
        ref={inputRef}
        onChange={handleChange}
      />
      {isFunction(children) ? children(dragType) : children}
    </button>
  );
};
export default Upload;
