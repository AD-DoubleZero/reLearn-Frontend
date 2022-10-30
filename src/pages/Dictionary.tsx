import React from 'react'
import SearchBar from '../components/dictionary/SearchBar'
import TagsBar from '../components/dictionary/TagsBar'
import ResultSection from '../components/dictionary/ResultSection'

const Dictionary = () => {
  return (
    <div className="cont pb-1">
      <div className="">
        <div className="card">
          <SearchBar />
        </div>
      </div>
      <div className="md:flex md:space-x-2">
        <div className="md:w-1/5">
          <TagsBar />
        </div>
        <div className="md:w-4/5">
          <ResultSection />
        </div>
      </div>
    </div>
  )
}

export default Dictionary