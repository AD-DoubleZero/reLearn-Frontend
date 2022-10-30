import React from 'react'
import Paginagion from './ResultSection.Components/pagination/Pagination'
import SearchOutput from './ResultSection.Components/SearchOutput'

const SearchResult = () => {
  return (
    <div className="card relative min-h-[648px]">
      <div className="cont">
        <SearchOutput />
        <Paginagion />
      </div>
    </div>
  )
}

export default SearchResult