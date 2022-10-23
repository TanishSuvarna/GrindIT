import React from 'react'
import { Box , TextField , Button } from '@mui/material'
const addComment = ({handleSubmit,isDisabled,handleIt,commentData}) => {
    
    return (
    <form onSubmit={handleSubmit}>
<Box display = "flex"
        boxShadow = "10px 10px 20px #ccc"
         flexDirection = "column" 
         alignItems = "center"
         background ="white"
        justifyContent ="center"
        margin= {5}
        padding = {5}
        marginTop ={3}
        borderRadius ={5}>
          <TextField fullWidth minRows ={5} maxRows ={Infinity}  name ="commentData" onChange ={handleIt} value ={commentData}  label="Add A Comment" multiline variant="outlined" placeholder='Add A Comment'  />
          {<Button type="submit" disabled ={isDisabled} sx = {{borderRadius : 5}} variant="contained">Post!</Button>}
</Box>
</form>
  )
}

export default addComment