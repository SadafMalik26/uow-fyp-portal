
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Button } from 'reactstrap';

export const updateTemplates = (value,title,updateTemplate) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                    <h1>Are you sure?</h1>
                    <p>You want to change {title} template</p>
                    <Button
                        onClick={onClose}
                        className="mx-2"
                        outline>
                        No
                    </Button>
                    <Button
                        className="mx-2"
                        onClick={async() =>  {
                            await updateTemplate.mutateAsync({ value,title })
                            onClose()
                        }} outline>
                        Yes, Update
                    </Button>
                </div>
            );
        }
    })
 };
