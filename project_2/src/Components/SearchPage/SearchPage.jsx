import React from 'react'
import './SearchPage.css'
const SearchPage = () => {
  return (
    <div>
        <div className='topBar'>
            <div className='title'>PlotPicks</div>
            <div className='auth-container'>
                <div className='Logout'>LOG OUT</div>
            </div>
        </div>
        <div className='imageBackground'>  
            <div className='SearchInput'>
              <input type='text' placeholder='Search'></input>
            </div>
            <div className='SearchSubmit'><img src=''></img></div>
        </div>
        <div className='aboutContainer'>
            <h1 class="about-title">Build. Add. Share.</h1>
            <div class="about-description">
              <p>Create as many wish lists, add all the books you want</p>
              <p>Add books easily from the website</p>
              <p>Share your wish list with others</p>
            </div>
          </div>
    </div>
  )
}

export default SearchPage