import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })

  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ type, setType ] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
  
    if (existingPerson) {
      if (existingPerson.number !== newNumber) {
        updatePerson(existingPerson, newNumber)
      } else {
        setType('alert')
        setMessage(`${newName} is already added to phonebook`)
        setTimeout(() => {
          setMessage(null)
        }, 2500)
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      personService
        .create(personObject)
        .then(returnedPerson => {
          setType('success')
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 2500)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  
  const delPerson = id => {
    
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .del(id)
        .then(() => {
          setType('success')
          setMessage(`${person.name} deleted`)
          setTimeout(() => {
            setMessage(null)
          }, 2500)
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setType('error')
          setMessage(`Information of '${person.name}' has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 2500)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const updatePerson = (existingPerson, newNumber) => {
    if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
      const updatedPerson = { ...existingPerson, number: newNumber }
      return personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setType('success')
          setMessage(`${existingPerson.name} updated`)
          setTimeout(() => {
            setMessage(null)
          }, 2500)
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        persons={persons}
        setPersons={setPersons}
        newName={newName} 
        setNewName={setNewName}
        newNumber={newNumber} 
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons 
        delPerson={delPerson}
        persons={persons} 
        newFilter={newFilter}/>
    </div>
  )
}

export default App
