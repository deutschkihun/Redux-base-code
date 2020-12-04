import React, {useState,useReducer} from 'react'
import Modal from './Modal'

const Index = () => {

    const reducer = (state,action) => {
        if(action.type === 'ADD_ITEM'){
            const newPeople = [...state.people,action.payload]
            return {
                ...state,
                people:newPeople,
                isModalOpen:true,
                modalContent: 'item added'
            }
        }

        if(action.type === 'NO_VALUE'){
           return {
               ...state,
               isModalOpen:true,
               modalContent:'please enter value'
           }
        }

        if(action.type === 'CLOSE_MODAL'){
            return {
                ...state,
                isModalOpen:false,
            }
        }

       if(action.type === 'REMOVE_ITEM'){
           const newPeople = state.people.filter((person) => person.id !== action.payload)
           return {
               ...state,
               people:newPeople,
               isModalOpen:true,
               modalContent: 'successfully removed'
           }
        }
        return state
    }

    const defaultStatus = {
        people: [],
        isModalOpen:false,
        modalContent:''
    }

    const [name, setName] = useState("")
    const [state, dispatch] = useReducer(reducer,defaultStatus)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name){
            const newItem = {id:new Date().getTime().toString(),name}
            dispatch({type:'ADD_ITEM',payload:newItem})
            setName('')
        }else {
            dispatch({type:'NO_VALUE'})
        }
    }

    const handleChange = (e) => {
        setName(e.currentTarget.value)
    }

    const closeModal = () => {
        dispatch({type:'CLOSE_MODAL'})
    }

    
    return (
        <>
            {state.isModalOpen && <Modal closeModal={closeModal} modalContent={state.modalContent}/>}
            <form onSubmit={handleSubmit} className='form'>
                <div>
                    <input type="text"
                    value={name}
                    onChange={handleChange}/>
                </div>
                <button type='submit'>add</button>
                </form>
                {state.people.map((person) => {
                    return <div key={person.id} className='item'>
                        <h4>{person.name}</h4>
                        <button onClick={() => dispatch({type:'REMOVE_ITEM', payload:person.id})}>remove</button>
                    </div>
                })}
        </>
    )
}

export default Index