import useHelmet from '../utils/use-helmet'
import React, { useEffect } from 'react'

const About: React.FC<AboutProps> = (_props) => {

  const helmet = useHelmet()

  useEffect(() => {
    helmet.setTitle('About')
  },[helmet])

  return (
    <>
      <h1>About Us</h1>
    </>
  )
}

interface AboutProps {
  [key: string]: any
}

export default About