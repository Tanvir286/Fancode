import React from 'react';
import Button from '@mui/material/Button';
import Image from './Image';

const GroupList = () => {

    return (

        <div className='boxcontainer'>


            {/* This is title holder part */}
            <div className='titleholder'>
               <h2>Group List</h2>
               <Button variant="contained">Create Group</Button>
            </div>
            {/* This is title holder part */}





            {/* This is group list part */}          
            <div className='group-list'>
               <div>
                  <Image imageName="Profile.png"  className="group-list-image" />
               </div>
               <div>
                 <h3>friend reunion</h3>
               </div>
               <Button variant="contained">Join</Button>
            </div>
            {/* This is group list part */}
            
  
        </div>
    );
};

export default GroupList;