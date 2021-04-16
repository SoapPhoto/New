import { useMutation } from '@apollo/client';
import { DeletePicture } from '@app/graphql/mutations';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Callback = (id: number) => Promise<void>;

export default function useDeletePicture(
  cbUrl: string = '/',
): [Callback, boolean] {
  let navigate = useNavigate();
  const [deleteItem, { loading }] = useMutation(DeletePicture);
  const del = useCallback(
    async (id: number) => {
      try {
        await deleteItem({ variables: { id } });
        toast.success('删除成功');
        navigate(cbUrl, { replace: true });
      } catch (err) {
        toast.error(err.message);
      }
    },
    [cbUrl, deleteItem, navigate],
  );
  return [del, loading];
}
