import { useApolloClient, useMutation } from '@apollo/client';
import { DeletePicture } from '@app/graphql/mutations';
import { UserPictures } from '@app/graphql/query';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Callback = (id: number) => Promise<void>;

export default function useDeletePicture(
  cbUrl: string = '/',
): [Callback, boolean] {
  const client = useApolloClient();
  const navigate = useNavigate();
  const [deleteItem, { loading }] = useMutation(DeletePicture);
  const del = useCallback(
    async (id: number) => {
      try {
        client.refetchQueries({
          include: [UserPictures],
        });
        await deleteItem({ variables: { id } });
        toast.success('删除成功');
        navigate(cbUrl, { replace: true });
      } catch (error) {
        const { message } = error as any;
        toast.error(message);
      }
    },
    [cbUrl, client, deleteItem, navigate],
  );
  return [del, loading];
}
