import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteCampaignModal from "./useDeleteEventModal";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchCampaigns: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteCampaignModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    selectedId,
    setSelectedId,
    refetchCampaigns,
  } = props;

  const {
    mutateDeleteCampaign,
    isPendingMutateDeleteCampaign,
    isSuccessMutateDeleteCampaign,
  } = useDeleteCampaignModal();

  useEffect(() => {
    if (isSuccessMutateDeleteCampaign) {
      onClose();
      refetchCampaigns();
      setSelectedId("")
    }
  }, [isSuccessMutateDeleteCampaign]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Hapus Donasi</ModalHeader>
        <ModalBody>
          <p className="text-medium">Apakah kamu yakin menghapus donasi ini ?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteCampaign}
          >
            Batal
          </Button>
          <Button
            color="success"
            type="submit"
            disabled={isPendingMutateDeleteCampaign}
            onPress={() => mutateDeleteCampaign(selectedId)}
            className="bg-teal-600"
          >
            {isPendingMutateDeleteCampaign ? (
              <Spinner size="sm" color="white" />
            ) : (
              <span className="text-white">Hapus Penggalangan Dana</span>
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCampaignModal;
