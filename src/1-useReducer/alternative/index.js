import React, { useState} from 'react';
import Modal from './Modal';

const Index = () => {

    const [name, setName] = useState('')
    const [people, setPeople] = useState([])
    const [showModal, setShowModal] = useState(false)

    const handleSumbit = (e) => {
      e.preventDefault();
      if(name){
        setShowModal(true)
        setPeople([...people,{id:new Date().getTime().toString(),name}])
        setName('')
      }else{
        setShowModal(true)
      }
    }

    const onChangehandler = (e) => {
      setName(e.currentTarget.value)
    }

    const onClickhandler = (id) => {
      setPeople((oldPeople) => {
        let newPeople = oldPeople.filter((person) => person.id !==id)
        return newPeople
      })
    }

    return (
      <>
        {showModal && <Modal/>}
        <form onSubmit={handleSumbit} className="form">
          <div>
            <input type="text"
            value={name}
            onChange={onChangehandler}/>
          </div>
          <button type='submit'>submit</button>
        </form>
        {people.map((person) => {
          return <div key={person.id} className='item'>
            <h4>{person.name}</h4>
            <button onClick={() => onClickhandler(person.id)}>remove</button>
          </div>
        })}
      </>
    )
}

export default Index;