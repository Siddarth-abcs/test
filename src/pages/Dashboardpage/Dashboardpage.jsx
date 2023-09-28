import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector} from 'react-redux';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';


import Navbar from '../../components/Dashboard Component/Navbar/Navbar';
import Subbar from '../../components/Dashboard Component/SubBar/Subbar';
import HomeComponent from '../../components/Dashboard Component/HomeComponent/HomeComponent';
import CreateFolder from '../../components/Dashboard Component/CreateFolder/CreateFolder';
import CreateFile from '../../components/Dashboard Component/CreateFile/CreateFile';
import { getFiles, getFolders } from '../../redux/actionCreators/filefolderActionCreater';
import FolderComponentFile from '../../components/Dashboard Component/FolderComponent/FolderComponentFile';
import FileComponent from '../../components/Dashboard Component/FileComponent/FileComponent';
import UploadFile from '../../components/Dashboard Component/UploadFile/UploadFile';

const DashboardPage = () => {

  const [isCreateFolderModelOpen, setIsCreateFolderModelOpen] = useState(false);
  const [isCreateFileModelOpen, setIsCreateFileModelOpen] = useState(false);
  const [isFileUploadModelOpen, setIsFileUploadModelOpen] = useState(false);

  const [showSubBar, setshowSubBar] = useState(true);
  const {pathname} = useLocation();


  const {isLoggedIn, isLoading, userId }= useSelector(
    (state) => ({
      
    isLoggedIn: state.auth.isAuthenticated,
    isLoading: state.filefolders.isLoading,
    userId: state.auth.user.email.uid,
    }),
    shallowEqual
    );


  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/")
    }
  },[]);

  useEffect(() =>{
    if(!isLoading && userId){
      dispatch(getFolders(userId));
      dispatch(getFiles(userId));
    }
  },[isLoading, userId, dispatch])

  useEffect(()=>{
    if(pathname.includes("/file/")){
      setshowSubBar(false)
    }
  },[pathname])
  return (
    <>
    {isCreateFolderModelOpen && (
      <CreateFolder setIsCreateFolderModelOpen={setIsCreateFolderModelOpen}
       />
      )}
      {isCreateFileModelOpen && (
      <CreateFile setIsCreateFileModelOpen={setIsCreateFileModelOpen}
       />
      )}
      {isFileUploadModelOpen && (
      <UploadFile setIsFileUploadModelOpen={setIsFileUploadModelOpen}
       />
      )}
    <Navbar />

    {showSubBar &&(
          <Subbar 
          setIsCreateFolderModelOpen={setIsCreateFolderModelOpen}
          setIsCreateFileModelOpen={setIsCreateFileModelOpen}
          setIsFileUploadModelOpen={setIsFileUploadModelOpen}
          />
    )}

    <Routes>
      <Route path='' element={<HomeComponent />} />
      <Route path='folder/:folderId' element={<FolderComponentFile />} />
      <Route path='file/:fileId' element={<FileComponent />} />
    
    </Routes>
    </>
  )

}

export default DashboardPage;
