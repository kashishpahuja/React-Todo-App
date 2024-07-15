import React from 'react'

function About(props) {
  let a="first";
  const submitForm=async ()=>{
    const response=fetch("http://localhost:5000/users",{method:"GET"})
    // to get all items

    // filtered data
    const user=fetch(`http://localhost:5000/users?category=electronics&brand=samsung`)
  }
  return (
    <div>
      {
      a==="first"?
      <div>First Form</div>
      : a==="second"?
      <div>Second Form</div>
      :
      <div>First Form</div>
      }
    </div>
  )
}

export default About