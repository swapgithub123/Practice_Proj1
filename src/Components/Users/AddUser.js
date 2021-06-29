import React, { useState } from 'react';

import '../UI/Card';
import Card from '../UI/Card';
import styles from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

const AddUser = (props) => {
       const [enteredName, setEnteredName]= useState('');
       const [enteredAge,setEnteredAge]= useState('');
       const [error, setError] = useState();   // As the initial state of error state variable is undefined, useState function initialization is empty.

    const addUserHandler = (event) => {
        event.preventDefault();

        if((enteredName.trim().length === 0) || (enteredAge.trim().length === 0)){  
            setError(
                {
                    title:'Invalid Input',
                    message:'Plase enter a valid name and age(non-empty values!)'        
                }
            );
            return;
        }

        if(+enteredAge < 1) {  //As the entered age is an String, '+' sign is used for the conversion to number
            setError(
                {
                    title:'Invalid Age',
                    message:'Please enter a valid age(>0)!'
                }
            );
            return;
        }

        // console.log(enteredName,  enteredAge);
        setEnteredName('');
        setEnteredAge('');
        props.onAddUser(enteredName,enteredAge);
    };

    const errorHandler = () => {
        setError(null);
    };


    const usernameChangeHandler = event => {
        setEnteredName(event.target.value);
    };

    const ageChangeHandler = event => {
        setEnteredAge(event.target.value);
    };

    return (
        <Wrapper>
        {error &&
         (<ErrorModal 
             title={error.title}
             message={error.message}
             onConfirm={errorHandler} 
         /> )}
        <Card className={styles.input}>
            <form onSubmit={addUserHandler}>   {/* No paranthesis() after function name as if done, will execute there.. so its just a pointer to the function */}   
                <label htmlFor="username">UserName</label>
                <input id="username" type="text" value={enteredName} onChange={usernameChangeHandler}></input>
                <label htmlFor="age">Age(Years)</label>
                <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler}></input>
                <Button type="submit">Add User</Button>
           </form>
        </Card>
        </Wrapper>
    )
};

export default AddUser;