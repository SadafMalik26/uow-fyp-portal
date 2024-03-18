import React from 'react';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function DownloadFile({ buffer, fileName, fileType }) {
  const downloadFile = () => {
    const fileData = new Uint8Array(buffer);
    const blob = new Blob([fileData], { type: fileType });
    saveAs(blob, fileName);
  };

  return (
    <FontAwesomeIcon onClick={downloadFile} icon={faDownload} />
  );
}

export default DownloadFile;
