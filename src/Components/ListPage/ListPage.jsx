import React from 'react'

function ListPage() {
  return (
    <div>
        <div className='topBar'>
            <div><Link to="/" className='title'>PlotPicks</Link></div>
            <div className='auth-container'>
            <div className='Logout'>LOG OUT</div>
        </div>
  </div>
    
        <div className='MainBackground'>
            <div className='title'>Wish Lists</div>
            <div className='resultsGrid'></div>
        </div>
    </div>
  )
}

export default ListPage