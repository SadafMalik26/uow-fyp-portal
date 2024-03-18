import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
function DownloadPdf2({ buffer, fileName }) {

  // const downloadPdf = () => {
  //   const pdfData = new Uint8Array(buffer);
  // const blob = new Blob([pdfData], { type: 'application/pdf' });
  // saveAs(blob, fileName+'.pdf');
  // }


  const downloadPdf = () => {
    const file = new Blob([buffer], { type: 'application/pdf' });
    const fileUrl = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = `${fileName}.pdf`;
    a.click();
    URL.revokeObjectURL(fileUrl);
  };
  return (
     <FontAwesomeIcon onClick={downloadPdf} icon={faDownload} />
  );
}

export default DownloadPdf2;
