import React,{Fragment} from 'react';
import "./Checkoutsteps.css";
import { LocalShipping,LibraryAddCheck, AccountBalance} from '@mui/icons-material';
import { Typography, Stepper, StepLabel, Step } from '@mui/material';



const Checkoutsteps = ({activestep}) => {
    const steps=[
      {  label: <Typography>Shipping Details</Typography>,
        icon: <LocalShipping/>},
        {
            label:<Typography>Confirm Order</Typography>,
            icon:<LibraryAddCheck/>,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalance/>,
        },

    ];
    const stepStyles={
        boxSizing:"border-box"
    };
  return (
    <Fragment>
       <Stepper
       alternativeLabel activeStep={activestep} style={stepStyles}
       >
        {steps.map((item,index)=>(
            <Step
            key={index}
            active={activestep===index?true:false}
            completed={activestep>=index?true:false}
            >
                <StepLabel
                style={{color:activestep>=index?"tomato":"rgba(0,0,0,0,.649)",}}
                    icon={item.icon}
                >{item.label}
                </StepLabel>
            </Step>
        ))}
       </Stepper>

    </Fragment> 
  )
};

export default Checkoutsteps