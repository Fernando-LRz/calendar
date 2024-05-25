import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2'

import 'react-datepicker/dist/react-datepicker.css';

import { useCalendarStore, useUiStore } from '../../hooks';
import { getEnvVariables } from '../../helpers';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

if( getEnvVariables().VITE_MODE !== 'test' ) {
    Modal.setAppElement('#root');
}

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [ formValues, setFormValues ] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 1)
    });

    useEffect(() => {
        if(activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }

    }, [ activeEvent ]);

    const titleClass = useMemo(() => {
        if(!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid'

    }, [ formValues.title, formSubmitted ]);

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start)
        
        if(isNaN(difference) || difference <= 0) {
            Swal.fire(
                'Something went wrong with the dates', 
                'Please ensure the start date is before the end date', 
                'error'
            );

            return;
        }

        if(formValues.title.length <= 0) return;

        await startSavingEvent(formValues);
        closeDateModal();
        
        setFormSubmitted(false);
    }

    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ closeDateModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <h1>New event</h1>
            <hr />
            
            <form className="container" onSubmit={ onSubmit }>
                <div className="form-group mb-2">
                    <label>Start</label>

                    <div className="customDatePickerWidth">
                        <DatePicker 
                            selected={ formValues.start }
                            onChange={ (event) => onDateChange(event, 'start') }
                            dateFormat="Pp"
                            className="form-control"
                            showTimeSelect
                        />
                    </div>
                </div>

                <div className="form-group mb-2">
                    <label>End</label>

                    <div className="customDatePickerWidth">
                        <DatePicker 
                            minDate={ formValues.start }
                            selected={ formValues.end }
                            onChange={ (event) => onDateChange(event, 'end') }
                            dateFormat="Pp"
                            className="form-control"
                            showTimeSelect
                        />
                    </div>
                </div>

                <hr />

                <div className="form-group mb-3">
                    <label className="mb-2">Title and notes</label>
                    <input 
                        type="text" 
                        className={`form-control ${ titleClass }`}
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">A short description</small>
                </div>

                <div className="form-group mb-3">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Aditional information</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    &nbsp;
                    <span>Save</span>
                </button>
            </form>
        </Modal>
    )
}