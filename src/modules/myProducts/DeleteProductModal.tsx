import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

import { Button } from "@mantine/core";
import { Modal, Text } from "@/components";

// Utils
import useUserProducts from "@/hooks/useUserProducts";
import { trpc } from "@/lib/trpc";

interface DeleteProductModalProps {
  productId?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const DeleteProductModal: React.FC<DeleteProductModalProps> = (
  props
) => {
  const { productId, isOpen, setIsOpen } = props;

  const { refetch } = useUserProducts();

  const deleteProductMutation = trpc.products.delete.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (!productId) {
    return null;
  }

  return (
    <Modal
      showModal={isOpen}
      setShowModal={setIsOpen}
      disableClose={deleteProductMutation.isLoading}
    >
      <div className="flex flex-col gap-4 rounded-lg bg-white px-4 py-6 sm:max-w-md">
        <Text.H1>¿Estás seguro de eliminar este producto?</Text.H1>
        <Text.Subtitle>
          Esta acción no se puede deshacer. Si eliminas este producto, no podrás
          recuperarlo.
        </Text.Subtitle>

        <div className="flex w-full gap-4">
          <Button
            fullWidth
            variant="subtle"
            color="red"
            disabled={deleteProductMutation.isLoading}
            onClick={() =>
              deleteProductMutation.mutate({
                id: productId,
              })
            }
          >
            Eliminar
          </Button>

          <Button
            fullWidth
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={deleteProductMutation.isLoading}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
