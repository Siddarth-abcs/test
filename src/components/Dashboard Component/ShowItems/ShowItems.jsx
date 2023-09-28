import { useNavigate } from 'react-router-dom';
import './ShowItems.css';
import {useDispatch} from "react-redux";
import { changeFolder } from '../../../redux/actionCreators/filefolderActionCreater';

const ShowItems = ({ title, items, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDblClick = (itemId) => {
    if (type === 'folder') {
      dispatch(changeFolder(itemId));
      navigate(`/dashboard/folder/${itemId}`);
      console.log(itemId);
    } else {
      navigate(`/dashboard/file/${itemId}`)
    }
  };

  return (
    <div className='w-100'>
      <h4 className='text-center border-bottom'>{title}</h4>
      <div className='row gap-2 py-4 px-5'>
        {items.map((item, index) => {
          return (
            
            <p
              key={index * 55}
              className='col-md-2 p-2 text-center d-flex flex-column border'
              onDoubleClick={() => handleDblClick(item.docId)}
            ><a href={item.data.url} target="_blank">
              {type === 'folder' ? (
                <i className="fa-solid fa-folder" size="4x"></i>
              ) : (
                <i className="fa-solid fa-file" size="4x"></i>
              )}
              {item.data && item.data.name ? item.data.name : item.name}
              </a></p>
           
          );
        })}
      </div>
    </div>
  );
};

export default ShowItems;
