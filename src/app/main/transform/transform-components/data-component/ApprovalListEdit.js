// ApprovalEditPage.js
import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

function ApprovalListEdit({selectedRow, approvalDetail}) {
    console.log(selectedRow, "Testing");
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const [dateValue, onDateChange] = useState(formattedDate);
    const [activeStep, setActiveStep] = useState(1);
   
    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

 
    const handleCancel = () => {
        // Your cancellation logic here
        console.log('Cancel button clicked');
        
    }

    return (
        <div>
            {activeStep === 1 && <StepOne onNext={handleNext} dateValue={dateValue} onDateChange={onDateChange} activeStep={activeStep} selectedRow={selectedRow} approvalDetail={approvalDetail} />}
            {activeStep === 2 && <StepTwo onBack={handleBack} activeStep={activeStep} selectedRow={selectedRow}  onCancel={handleCancel} />}
        </div>
    );
}

export default ApprovalListEdit;
