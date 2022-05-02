import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Table from '../Table'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    usersDetails: [],
    initialUsersDetails: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const userData = await response.json()

      this.setState({
        usersDetails: [...userData],
        initialUsersDetails: [...userData],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  // this function is used to delte specific user details

  deleteUserDetails = arr => {
    const {usersDetails} = this.state
    let dummyUserDetails = [...usersDetails]
    for (let i = 0; i < arr.length; i += 1) {
      const data = dummyUserDetails.filter(j => j.id !== arr[i])
      dummyUserDetails = data
    }
    this.setState({
      usersDetails: [...dummyUserDetails],
      initialUsersDetails: [...dummyUserDetails],
    })
  }

  // this is used to users displaying on screen

  deleteEveryUser = (startIndex, endIndex) => {
    const {usersDetails} = this.state
    const dummyUserSelectAllData = usersDetails
    dummyUserSelectAllData.splice(startIndex, endIndex)
    this.setState({
      usersDetails: [...dummyUserSelectAllData],
    })
  }

  // if there is no user view

  usersDetailsEmpty = () => (
    <div className="user-details-empty-container">
      <h1>No Results </h1>
    </div>
  )

  onChangeSearchInput = event => {
    this.setState(
      {
        searchInput: event.target.value,
      },
      this.filteredUsers(),
    )
  }

  // with this you can filter the data

  filteredUsers = () => {
    const {searchInput, initialUsersDetails} = this.state

    const filteredUsers = initialUsersDetails.filter(
      user =>
        user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.role.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({
      usersDetails: filteredUsers,
      apiStatus: apiStatusConstants.success,
      searchInput: '',
    })
  }

  // search container

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          onChange={this.onChangeSearchInput}
          placeholder="Search by name, email or role"
        />
        <button
          onClick={this.filteredUsers}
          className="search-button"
          type="button"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  // this is used to render table

  renderUserDetailsTable = () => {
    const {usersDetails} = this.state
    return (
      <div className="bg-container">
        <Table
          deleteUserDetails={this.deleteUserDetails}
          usersDetails={usersDetails}
          deleteEveryUser={this.deleteEveryUser}
        />
      </div>
    )
  }

  getUserAgain = () => {
    this.getUsers()
  }

  // loading view

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // if the userdetails is none then it will show empty view

  renderUserDetails = () => {
    const {usersDetails} = this.state
    const k =
      usersDetails.length === 0
        ? this.usersDetailsEmpty()
        : this.renderUserDetailsTable()
    return (
      <div>
        {this.renderSearchInput()}
        {k}
      </div>
    )
  }

  // failure view

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-view-pic"
      />
      <button
        onClick={this.getUserAgain}
        type="button"
        className="try-again-button"
      >
        Try Again
      </button>
    </div>
  )

  // rendering all views

  renderAllUsers = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderAllUsers()
  }
}
export default Home
