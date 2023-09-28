import * as types from "../actionsTypes/filefolderactiontype";
import fire from "../../config/firebase";

// action
// 1
const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});
// 2
const addFolders = (payload) => ({
  type: types.ADD_FOLDERS,
  payload,
});
// 3
const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});
// 4
const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});

// files
const addFiles = (payload) => ({
  type: types.ADD_FILES,
  payload,
})
const addFile = (payload) => ({
  type: types.CREATE_FILE,
  payload,
})
// action creators
// 1
export const createFolder = (data) => (dispatch) => {
    fire
      .firestore()
      .collection("folders")
      .add(data)
      .then(async (folder) => {
        const folderData = await (await folder.get()).data();
        const folderId = folder.id;
        dispatch(addFolder({data: folderData, docId: folderId}));
        alert("Folder created done")
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        // Handle the error, dispatch an error action, etc.
      });
  }

  // 2
  export const getFolders = (userId) => (dispatch) => {
    dispatch(setLoading(true));
    fire
    .firestore()
    .collection("folders")
    .where("userId", "==", userId)
    .get()
    .then(async (folders) => {
      const folderData = await folders.docs.map((folder) => ({
        data: folder.data(),
        docId: folder.id,
      }));
      dispatch(addFolders(folderData))
      dispatch(setLoading(false))
    })
  }


// 4
export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
}

// files

export const getFiles = (userId) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .where("userId", "==", userId)
    .get()
    .then(async (folders) => {
      const folderData = await folders.docs.map((file) => ({
        data: file.data(),
        docId: file.id,
      }));
      dispatch(addFiles(folderData)); // Change "filesData" to "folderData"
    })
}


export const createFile = (data, setSuccess) => (dispatch) => {
  fire
  .firestore()
  .collection("files")
  .add(data).then(async(file) => {
    const fileData = await (await file.get()).data();
    const fileId = file.id;
    alert("File created successfully!")
    dispatch(addFile({ data: fileData, docId: fileId}));
    setSuccess(true);
  }
  ).catch(() => {
    setSuccess(false);
  }
  )
}

export const uploadFile = (file, data, setSuccess) => (dispatch) => {
  const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`)

  uploadFileRef.put(file).on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log("uploading" + progress +"%");
    },
    (error) => {
      console.log(error)
    },
    async () => {
      const fileUrl = await uploadFileRef.getDownloadURL();
      const fullData = {...data, url: fileUrl };

      fire
      .firestore()
      .collection("files")
      .add(fullData)
      .then(async (file) => {
        const fileData = await (await file.get()).data();
        const fileId = file.id;
        dispatch(addFile({data: fileData, docId: fileId}));
        alert("file uploaded sucessfully!")
        setSuccess(false)
      })
      .catch(() => {
        setSuccess(true)
      })
    }
  )
}












