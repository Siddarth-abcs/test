import { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { createFile } from '../../../redux/actionCreators/filefolderActionCreater';

const CreateFile = () => {
    const [fileName, setFileName] = useState("");
    const [success, setSuccess] = useState(false);

    const { user, userFiles, currentFolder, currentFolderData } = useSelector(
        (state) => ({
            userFiles: state.filefolders.userFiles,
            user: state.auth.user,
            currentFolder: state.filefolders.currentFolder,
            currentFolderData: state.filefolders.userFolders.find(
                (folder) => folder.docId === state.filefolders.currentFolder
            ),
        }),
        shallowEqual
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (success) {
            setFileName("");
            setSuccess(false);
            setIsCreateFileModelOpen(false);
        }
    }, [success]);

    const checkFileAlreadyPresent = (name) => {
        const filePresent = userFiles
            .filter((file) => file.data.parent === currentFolder)
            .find((fldr) => fldr.data.name === name);
        return !!filePresent;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fileName) {
            if (fileName.length > 3) {
                const extension = fileName.includes(".");
                if (checkFileAlreadyPresent(fileName)) {
                    const data = {
                        createdAt: new Date(),
                        name: extension ? fileName : `${fileName}.txt`,
                        userId: user.email.uid,
                        createdBy: user.email.name,
                        path: currentFolder === "root" ?
                            [] : [...currentFolderData?.data.path, currentFolder],
                        parent: currentFolder,
                        lastAccessed: null,
                        updatedAt: new Date(),
                        extension: extension ? fileName.split(".")[1] : "txt",
                        data: "",
                        url: null,
                    };
                    dispatch(createFile(data, setSuccess));
                } else {
                    alert("File already present: " + fileName);
                }
            } else {
                alert("File must be at least 3 characters long: " + fileName);
            }
        } else {
            alert("File name cannot be empty.");
        }
    }

    return (
        <div className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
            style={{ background: "rgba(0,0,0,0.4)", zIndex: 9999 }}>
            <div className="row align-items-center justify-content-center">
                <div className="col-md-4 mt-5 bg-white rounded p-4">
                    <div className="d-flex justify-content-between">
                        <h4>Create File</h4>
                        <button className="btn" onClick={() => setIsCreateFileModelOpen(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <hr />
                    <div className="d-flex flex-column align-items-center">
                        <form className="mt-3 w-100" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="folderName"
                                    placeholder="File Name"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-5 from-control">Create File</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateFile;
