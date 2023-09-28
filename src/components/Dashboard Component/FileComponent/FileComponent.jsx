import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

import Header from "./Header";
import { shallowEqual } from "react-redux";

const FileComponent = () => {
    const { fileId } = useParams();

    const { currentFile } = useSelector(
        (state) => ({
            currentFile: state.filefolders.userFiles.find(
                (file) => file.docId === fileId
            ),
        }),
        shallowEqual
    );

    return (
        <div>
            <Header fileName={currentFile?.data.name} /> {/* Check if currentFile exists */}
            Filecomponent: {fileId} {currentFile ? JSON.stringify(currentFile) : 'File not found'}
        </div>
    );
}

export default FileComponent;
