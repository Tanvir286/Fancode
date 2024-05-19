import React, { useEffect, useState } from 'react';
import Image from './Image';
import { TbAccessibleOff } from "react-icons/tb";
import { getDatabase, ref, onValue,remove} from "firebase/database";
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';


const BlockUser = () => {

   const db = getDatabase();
   let userInfo = useSelector(state=>state.user.value)
   console.log(userInfo.displayName);

   let [blockList,setBlockList] = useState([]);

   /*============================================
            Blocker List Show here
    ===========================================*/
     
    useEffect(()=>{
      const BlockRef = ref(db, 'Block/' );
      onValue(BlockRef, (snapshot) => {
          const arr = [];
          snapshot.forEach(item => {
           const data =  item.val()
           console.log(data); 
           if(data.BlockerID == userInfo.uid || data.VictimID == userInfo.uid ){
            arr.push({...item.val(),blockId:item.key} )       // here use item.val() method UserList use another type
           }
         });  
         setBlockList(arr)     
         console.log(arr);
      });
   },[])

   /*============================================
            Blocker List Show here
    ===========================================*/
   /*============================================
              UnBlock Method Here 
    ===========================================*/

    let handleUnblock = (id) => {
       remove(ref(db, 'Block/' + id));
    }

   /*============================================
               UnBlock Method Here 
    ===========================================*/

  

    return (
        <div className='boxcontainer'>
        {/* This is title holder part */}
        <div className='titleholder'>
           <h2>Blocked Users</h2>
        </div>
        {/* This is title holder part */}


        {/* This is group list part */}

        {  blockList.map(item =>{
          console.log(item);
          return(
             <div className='group-list'>
                <div>
                   <Image imageName="Profile.png"  className="group-list-image" />
                </div>
                <div>
                  {
                     item.BlockerID == userInfo.uid?
                     <h3>{item.VictimName}</h3>
                     :
                     <h3>{item.BlockerName}</h3>
                  }
                </div>
                <div>
                   {
                     item.BlockerID == userInfo.uid?
                     <Button  variant="contained" onClick={()=>handleUnblock(item.blockId)} >Unblock</Button>
                     :
                     <TbAccessibleOff />
                   }
                </div>
                
                
             </div>
             )
          })

        }
        
        
        {/* This is group list part */}
       

    </div>
    );
};

export default BlockUser;