import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import GroupList from '../../component/GroupList';
import FriendRequest from '../../component/FriendRequest';
import Friends from '../../component/Friends';
import MyGroup from '../../component/MyGroup';
import UserList from '../../component/UserList';
import BlockUser from '../../component/BlockUser';

const DashBorad = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
         <Grid container spacing={2}>

          {/* First item start */}
          <Grid item xs={4}>
            <GroupList/>
             <br />
            <FriendRequest/>
          </Grid>
          {/* First item end */}

          {/* Second item start */}
          <Grid item xs={4}>
            <Friends/>
            <br />
            <MyGroup/>
          </Grid>
          {/* Second item end */}

          {/* Third item start */}
          <Grid item xs={4}>
            <UserList/>
             <br />
             <BlockUser/>
          </Grid>
          {/* Third item end */}

         </Grid>
       </Box>
    );
};

export default DashBorad;
