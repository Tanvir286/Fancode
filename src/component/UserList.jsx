import React, { useEffect, useState } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import Image from './Image';
import { getDatabase, ref, onValue ,set,push} from "firebase/database";
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

const UserList = () => {

      const db = getDatabase();

      let [userList,setUserList] = useState([]);
      let [blockList,setBlockList] = useState([]);
      let [friendRequest,setfriendRequest] = useState([]);
      let [friend,setFriend] = useState([]);
      let userInfo = useSelector(state=>state.user.value)
      console.log(blockList);
      /*===============================
          Here All Data Read Here 
      ===============================*/

      useEffect(() => {
         const userRef = ref(db, 'users');
         onValue(userRef, (snapshot) => {
            // const data = snapshot.val();
            //console.log(data);      Total Value;
           
           const arr = [];
           snapshot.forEach(item => {
              if(userInfo.uid !== item.key){ 
               const data = item.val()        
               arr.push({
                 userID:item.key,                   // here use spacefic list method UserList use item.val 
                 username: data.username,
                 email: data.email,
               });
              }
              // console.log(item.key);   Find Uid;
             // const data2 = item.val();  
             //  console.log(data2,"if");   Every uid all value;
            
           });
           setUserList(arr);
         });
       }, []);
       
      /*=============================== 
           Here All Data Read Here 
      ===============================*/
      /*===================================
        User List FriendRequest Then pending user list
      ====================================*/
      
      useEffect(() => {

         const userRef = ref(db, 'friendrequest');
         onValue(userRef, (snapshot) => {
             
           const arr = [];
           snapshot.forEach(item => {
            console.log(item);
            const data = item.val();
            console.log(data);
             arr.push(data.ReceivedID + data.sendID )
             
           });
           setfriendRequest(arr);
         });
       }, []);

      /*======================================
       User List FriendRequest Then pending user list
      =======================================*/
      /*========================================
       when accpet add friend option user list 
      =========================================*/

      useEffect(() => {

         const userRef = ref(db, 'friends');
         onValue(userRef, (snapshot) => {
             
           const arr = [];
           snapshot.forEach(item => { 
            const data = item.val();
             arr.push(data.ReceivedID + data.sendID )
             
           });
           setFriend(arr);
         });
       }, []);



      /*========================================
        when accpet add friend option user list 
      =========================================*/
      /*========================================
        if bolckUser have then show user list 
      =========================================*/

      useEffect(() => {

         const BlockRef = ref(db, 'Block');
         onValue(BlockRef, (snapshot) => {
             
           const arr = [];
           snapshot.forEach(item => { 
            const data = item.val();
            console.log(data);
             arr.push(data.VictimID + data.BlockerID )
             
           });
           setBlockList(arr);
           
         });
       }, []);



      /*========================================
        if bolckUser have then show user list 
      =========================================*/
     
      /*======================================
         Here FriendRequest Here and write DB
      =======================================*/
      //Push Create every time uniqe id
 
       let handleFriendRequest = (item) =>{  
         console.log(item);
         set(push(ref(db, 'friendrequest/' )), {       
            sendID: userInfo.uid,
            sendName: userInfo.displayName,
            ReceivedID: item.userID,
            ReceivedName : item.username,
          });
        
       } 
       /*======================================
         Here FriendRequest Here and write DB
       =======================================*/
 

    return (
        <div className='boxcontainer'>

            {/* ============================
                This is title holder part 
            ==============================*/}
            <div className='titleholder'>
               <h2>User List</h2>
            </div>
             {/* ============================
                 This is title holder part 
             ==============================*/}
            

            {/* ============================
                 This is group list part 
            ==============================*/}
            
            { 
               userList.map((item)=>{
                  // console.log(item);
                  // console.log(friendRequest);
                  // console.log(item.userID + userInfo.uid);
                  return(
                     <div className='group-list'>
                        <div>
                           <Image imageName="Profile.png"  className="group-list-image" />
                        </div>
                        <div>
                          <h3>{item.username}</h3>
                        </div>
                        {friendRequest.includes(item.userID + userInfo.uid) || friendRequest.includes(userInfo.uid + item.userID) ?
                         <Button disabled variant="contained">Pending</Button> :
                         friend.includes(item.userID + userInfo.uid) || friend.includes(userInfo.uid + item.userID) ?
                         <Button  variant="contained">Friends</Button>:
                          blockList.includes(item.userID + userInfo.uid) || blockList.includes(userInfo.uid + item.userID) ?
                         <Button  variant="contained">Block</Button>:
                         <Button className='user-icon' variant="contained" onClick={()=>handleFriendRequest(item)} >+</Button>
                     }
                     </div>
                  )
               })

            }

             {/* ============================
                 This is group list part 
              ==============================*/}
           
  
        </div>
    );
};

export default UserList;