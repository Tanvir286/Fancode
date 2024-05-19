import React, { useEffect,useState } from 'react';
import Button from '@mui/material/Button';
import Image from './Image';
import { getDatabase, ref, onValue ,set,push,remove} from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {

   const db = getDatabase();
   let [RequestList,setRequestList] = useState([]);
   let userInfo = useSelector(state=>state.user.value)
   console.log(userInfo.displayName); 
   
   /*===============================================
       Here All Data Read Here Who sends a request
   ===============================================*/
   useEffect(()=>{ 
 
      const friendrequestRef = ref(db, 'friendrequest');
      onValue(friendrequestRef, (snapshot) => {
        
        const arr = [];
        console.log(arr);  
        snapshot.forEach(item => { 
           const data = item.val()      //vitor sob data chole ase item.val()
           if(userInfo.displayName == data.ReceivedName){         
            arr.push({
              ...item.val(),           
              id: item.key,         // here use item.val() method UserList use another type
            }); 
           }        
        });
        setRequestList(arr);
      });
   },[])
   /*================================================
      Here All Data Read Here Who sends a request
   ================================================*/
   /*================================================
                Handle friend Accept part
   ================================================*/
   let handlefriendAccept = (item) =>{
          console.log(item); 
          set(push(ref(db, 'friends/')), {
            ...item            // ar mane item a j ase tai add hobe DB 
          }).then(()=>{
            remove(ref(db, 'friendrequest/' + item.id));
          })      
   }
   /*================================================
                Handle friend Accept part
   ================================================*/
   /*================================================
              Friend Request Rejected here  
   ================================================*/
 
    let handleDelete = (id) =>{
        remove(ref(db, 'friendrequest/' + id));
    }
   /*================================================

   /*================================================
               Friend Request Rejected here 
   ================================================*/

    return (
        <div className='boxcontainer'>


        {/* ============================
           This is title holder part 
        ==============================*/}
        <div className='titleholder'>
           <h2>Friend Request List </h2>
        </div>
        {/* ============================
           This is title holder part 
        ==============================*/}


        {/* ============================
             This is group list part 
        ================================*/}
 
        { RequestList.map((item)=>{
           console.log(item);
          return(
             <div className='group-list'>
                <div>
                   <Image imageName="Profile.png"  className="group-list-image" />
                </div>
                <div>
                  <h3>{item.sendName}</h3>
                </div>
                <Button variant="contained" onClick={()=>handlefriendAccept(item)} >Add </Button>
                <Button variant="contained" color="error" onClick={()=>handleDelete(item.id)} >Declined</Button>
             </div>
          )   
        })


        }
       
         {/* ============================
              This is group list part 
         ===============================*/}
       
       
    </div>
    );
};

export default FriendRequest;