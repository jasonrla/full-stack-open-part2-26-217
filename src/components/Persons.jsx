const Persons = (props) => {
  return (
    <ul>
        {props.persons.map((person,id) => { 
          console.log(person.id)
          console.log(person)
          console.log(id)
          return (
          person.name.toLowerCase().startsWith(props.newFilter.toLowerCase()) 
            ? ( 
              <li key={id}> {person.name} {person.number}
                <button onClick={() => props.delPerson(person.id)} type="submit">delete</button>
              </li> )
            : ""
        )})}
    </ul>        
)}

export default Persons