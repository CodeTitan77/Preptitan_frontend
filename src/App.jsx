import { useState } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './apps.routes'
import { AuthProvider } from './features/auth.context'
import { InterviewProvider } from './features/interview/interview.context';


function App() {
 

  return (
    <>
    <InterviewProvider>
    <AuthProvider>
        <RouterProvider router={router} />
        </AuthProvider>
        </InterviewProvider>
    </>
  )
}

export default App
