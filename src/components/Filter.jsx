const Filter = (props) => {

  const handleChange =(event) => props.setNewFilter(event.target.value)

  return(
    <div>
      filter shown with: <input value={props.newFilter} onChange={handleChange} />
    </div>
  )
}

export default Filter