import React, { useEffect, useState } from 'react';
import Image from './Image';
import { getDatabase, ref, onValue,set,push,remove} from "firebase/database";
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';




const Friends = () => {
 
   const db = getDatabase(); 
   const [friendList,setFriendList] = useState([]);
   let userInfo = useSelector(state=>state.user.value)
   console.log(userInfo.displayName);  


  


   const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

   /*===============================
       Here Friend Read Here 
   ===============================*/
   useEffect(()=>{
      const friendsRef = ref(db, 'friends/' );
      onValue(friendsRef, (snapshot) => {
          const arr = [];
          snapshot.forEach(item => {
           const data =  item.val()
           console.log(data);
           if(item.val().ReceivedID == userInfo.uid || item.val().sendID == userInfo.uid ){
            arr.push({
               ...item.val() , friendId:item.key         // here use item.val() method UserList use another type
             })
           }
         });  
         setFriendList(arr)     
         console.log(arr);
      });
   },[])
   /*===============================
       Here Friend Read Here 
   ===============================*/
   /*===============================
           Block List here 
   ===============================*/
 
   let handleBlock = (item) =>{
      console.log(item);
      if( userInfo.uid == item.sendID){
         set(push(ref(db, 'Block/')), {          
            BlockerName: userInfo.displayName,
            BlockerID: userInfo.uid,
            VictimName: item.ReceivedName,
            VictimID: item.ReceivedID,
         }).then(()=>{
            remove(ref(db, 'friends/' + item.friendId));
         })
      }else{
         set(push(ref(db, 'Block/')), {
            BlockerName: userInfo.displayName,
            BlockerID: userInfo.uid,
            VictimName: item.sendName,
            VictimID: item.sendID,
         }).then(()=>{
            remove(ref(db, 'friends/' + item.friendId));
         })
      }
   }

   /*===============================
           Block List here 
   ===============================*/
   /*===============================
           Unfriend List here 
   ===============================*/

      let handleUnfriend = (id) => {
       remove(ref(db, 'friends/' + id));  
       console.log(id);
    }

   /*===============================
           Unfriend List here 
   ===============================*/

    return (
        <div className='boxcontainer'>



        {/* This is title holder part */}
        <div className='titleholder'>
           <h2>Friends </h2>
        </div>
        {/* This is title holder part */}


      
      {/* This is group list part */}     
        { friendList.map(item=>{ 
         console.log(item);
           return(
              <div className='group-list1'>
                 <div>
                    <Image imageName="Profile.png"  className="group-list1-image" />
                 </div>
                 <div>  
                    {
                     item.sendID == userInfo.uid?
                     <h3>{item.ReceivedName}</h3>
                     :
                     <h3>{item.sendName}</h3>
                    }               
                 </div>
                
                 <Button variant="contained" onClick={()=>handleUnfriend(item.friendId)} >Unfriend</Button>
                 <Button variant="contained" color="error" onClick={()=>handleBlock(item)}>Block</Button>
              </div>
           )
        })

      }
      
      {/* This is group list part */}



      


    </div>
    );
};

export default Friends;