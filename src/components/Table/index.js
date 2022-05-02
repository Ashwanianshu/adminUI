/* eslint-disable no-lonely-if */
import {useState} from 'react'
import './index.css'
import {
  AiOutlineArrowRight,
  AiOutlineDoubleRight,
  AiOutlineArrowLeft,
  AiOutlineDoubleLeft,
} from 'react-icons/ai'
import TableRow from '../TableRow'

const Table = props => {
  const {usersDetails, deleteUserDetails, deleteEveryUser} = props

  // Getting length
  const userDetailsLength = usersDetails.length

  // usestate hook to set page number

  const [pageNumber, setPageNumber] = useState(0)

  const usersPerPage = 10
  const [selectedAll, setSelectedAll] = useState(false)
  const usersIdArray = []
  const pagesVisited = pageNumber * usersPerPage
  const MaxPageCount = Math.ceil(userDetailsLength / usersPerPage)
  // this will add id into array and we can further use that to delete specific details

  const addDeleteId = id => {
    if (selectedAll === true) {
      for (let i = 1; i <= userDetailsLength; i += 1) {
        usersIdArray.push(i)
      }
    } else {
      if (usersIdArray.includes(id)) {
        const idIndex = usersIdArray.indexOf(id)
        usersIdArray.splice(idIndex, 1)
      } else {
        usersIdArray.push(id)
      }
    }
  }
  // this function will delete user details

  const deleteUsers = () => {
    if (selectedAll === true) {
      const startIndex = pageNumber * 10
      const comparingIndex = (pageNumber + 1) * 10 < userDetailsLength
      const endIndex = comparingIndex ? pageNumber + 1 * 10 : userDetailsLength
      if (comparingIndex === false && userDetailsLength > 10) {
        setPageNumber(pageNumber - 1)
      }
      deleteEveryUser(startIndex, endIndex)
    } else {
      deleteUserDetails(usersIdArray)
    }
  }

  const selectAll = () => {
    setSelectedAll(!selectedAll)
  }

  // this function will ender the table row
  const displayUsers = usersDetails
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map(user => (
      <TableRow
        deleteUserDetails={deleteUserDetails}
        addDeleteId={addDeleteId}
        row={user}
        key={user.id}
      />
    ))

  const changePage = event => {
    const pageNumberReal = Number(event.target.textContent)
    setPageNumber(pageNumberReal - 1)
  }

  // this is pagination function

  const getPaginationGroup = () => {
    const pageLimit = MaxPageCount
    const startPage = Math.floor(pageNumber / pageLimit) * pageLimit
    return new Array(pageLimit).fill().map((_, idx) => startPage + idx + 1)
  }

  // with this function we can move forward

  const nextPage = () => {
    if (pagesVisited + usersPerPage < userDetailsLength) {
      setPageNumber(pageNumber + 1)
    }
  }

  // with this function we can move backward
  const prevPage = () => {
    if (pageNumber !== 0) {
      setPageNumber(pageNumber - 1)
    }
  }
  // we can go to first page with page
  const firstPage = () => {
    setPageNumber(0)
  }

  // we can go to first page with page
  const lastPage = () => {
    const lastPageCount = MaxPageCount - 1
    setPageNumber(lastPageCount)
  }

  const buttonUnactivePrev =
    pageNumber === 0 ? `pagination-button-unactive` : ``
  const buttonUnactiveNext =
    pageNumber + 1 === MaxPageCount ? `pagination-button-unactive` : ``

  return (
    <div className="table-container">
      <div className="table-heading-container">
        <div className="select-all-container">
          <input onChange={selectAll} type="checkBox" id="selectAllId" />
          <label htmlFor="selectAllId" className="label-selectall">
            Select All
          </label>
        </div>
        <h1 className="table-column-heading">Name</h1>
        <h1 className="table-column-heading"> Email</h1>
        <h1 className="table-column-heading">Role</h1>
        <h1 className="table-column-heading">Actions</h1>
      </div>
      <hr />
      <ul className="user-details-container">{displayUsers}</ul>
      <div className="pagination-container">
        <button
          className={`pagination-button ${buttonUnactivePrev}`}
          type="button"
          onClick={firstPage}
        >
          <AiOutlineDoubleLeft className="pagination-icon" />
        </button>
        <button
          className={`pagination-button ${buttonUnactivePrev}`}
          type="button"
          onClick={prevPage}
        >
          <AiOutlineArrowLeft className="pagination-icon" />
        </button>
        {getPaginationGroup().map((item, index) => (
          <button
            type="button"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              pageNumber + 1 === item ? 'active' : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}
        <button
          className={`pagination-button ${buttonUnactiveNext}`}
          type="button"
          onClick={nextPage}
        >
          <AiOutlineArrowRight className="pagination-icon" />
        </button>
        <button
          className={`pagination-button ${buttonUnactiveNext}`}
          type="button"
          onClick={lastPage}
        >
          <AiOutlineDoubleRight className="pagination-icon" />
        </button>
      </div>
      <button onClick={deleteUsers} className="delete-user" type="button">
        Delete User
      </button>
    </div>
  )
}

export default Table
