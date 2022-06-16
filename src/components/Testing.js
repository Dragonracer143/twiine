import React from 'react'
import { importApi } from '../Shared/Services'
export default function Testing() {

    const save=(e)=>{
        // importApi()
        console.log(e.target.files[0])
    }
  return (
    <div>Testing
        <input type="file"
        onChange={(e)=>{save(e)}}
        />



    </div>
  )
}
