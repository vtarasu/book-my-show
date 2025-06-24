import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../redux/loaderslice";
import { deleteTheatres } from "../../api/theatre";

function DeleteTheatre({
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    selectedTheatre,
    setSelectedTheatre,
    getTheatresForPartner
}) {
    const dispatch = useDispatch();

    const handleCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedTheatre(null);
    }

    const handleOk = async () => {
        try {
            dispatch(showLoader());
            const theatreId = selectedTheatre._id;
            let values = {
                theatreId : theatreId
            };
            const response = await deleteTheatres(values);
            getTheatresForPartner();
            dispatch(hideLoader());
        } catch(error) {
            console.error('Error deleting theatre', error);
        }
        dispatch(hideLoader());
        setSelectedTheatre(null);
        setIsDeleteModalOpen(false);
    }

    return (
        <>
            <Modal centered title="Delete theatre"
            open={isDeleteModalOpen}
            onCancel={handleCancel}
            onOk={handleOk}
            >
             Are you sure you want to delete this movie: {selectedTheatre?.name}? 
            </Modal>
        </>
    )

}

export default DeleteTheatre;