import { message, Modal } from "antd";
import { useDispatch } from "react-redux";
import { showLoader } from "../../redux/loaderslice";
import { deleteMovie } from "../../api/movie";
import { hideLoader } from "../../redux/loaderslice";

function DeleteMovie({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedMovie,
  setSelectedMovie,
  getMoviesData
}) {

  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedMovie(null);
  }

  const handleOk = async () => {
    try {
      dispatch(showLoader());
      const movieid = selectedMovie._id;
      const response = await deleteMovie(movieid);
      message.success(response.message);
      getMoviesData();
    } catch (error) {
      console.error('Error deleting movie:', error);
      
    }
    dispatch(hideLoader());
    setIsDeleteModalOpen(false);
    setSelectedMovie(null);
  }

  return (
    <Modal centered 
      title="Delete Movie"
      open={isDeleteModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      Are you sure you want to delete this movie: {selectedMovie?.title}?
    </Modal>
  );
}

export default DeleteMovie;