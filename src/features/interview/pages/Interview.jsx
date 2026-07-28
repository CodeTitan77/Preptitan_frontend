import React from 'react'
import { useInterview } from '../hook/useInterview';

const Interview = () => {
    const {loading,generateReport }=useInterview();
  return (
    <div>
      Interview
    </div>
  )
}

export default Interview

