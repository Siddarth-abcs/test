import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ShowItems from '../ShowItems/ShowItems';

const FolderComponentFile = () => {
    const { folderId } = useParams();

    const { currentFolderData, childFolders, childFiles } = useSelector(
        (state) => ({
            currentFolderData: state.filefolders.userFolders.find(
                (folder) => folder.docId === folderId
            )?.data,
            childFolders: state.filefolders.userFolders.filter(
                (folder) => folder.data.parent === folderId
            ),
            childFiles: state.filefolders.userFiles.filter(
                (file) => file.data.parent === folderId
            ),
        }),
        shallowEqual
    );

    return (
        <div>
            {currentFolderData && (
                <>
                    {childFolders.length > 0 ? (
                        <ShowItems title={"Created Folders"} type={"folder"} items={childFolders} />
                    ) : (
                        <p className='text-center my-5'></p>
                    )}

                    {childFiles.length > 0 && (
                        <>
                            {childFiles.filter((file) => file.data.url === null).length > 0 && (
                                <ShowItems title={"Created Files"} type={"file"} items={childFiles.filter((file) => file.data.url === null)} />
                            )}

                            {childFiles.filter((file) => file.data.data === null).length > 0 && (
                                <ShowItems title={"Upload Files"} type={"file"} items={childFiles.filter((file) => file.data.data === null)} />
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default FolderComponentFile;
