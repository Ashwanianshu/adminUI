import {useState} from 'react'
import './index.css'

const TableRow = props => {
  const {row, addDeleteId} = props
  const {id, name, email, role} = row
  const [selectedUser, setSelectedUser] = useState('')

  // with this we can color a specific user
  const addUserDetails = event => {
    const selectedUserClass = event.target.checked ? 'selected-user' : ''
    setSelectedUser(selectedUserClass)
    addDeleteId(id)
  }
  return (
    <li>
      <div className={`user-details-row ${selectedUser}`}>
        <div>
          <input onChange={addUserDetails} type="checkBox" id={id} />
        </div>
        <label className="user-details-row-container" htmlFor={id}>
          <p className="row-content-name margin-left">{name}</p>
          <p className="row-content-name"> {email}</p>
          <p className="row-content-name">{role}</p>
          <p className="row-content-name">Actions</p>
        </label>
      </div>
      <hr />
    </li>
  )
}
export default TableRow
