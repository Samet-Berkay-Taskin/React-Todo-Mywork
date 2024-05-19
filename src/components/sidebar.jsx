import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TodayIcon from '@mui/icons-material/Today';
import GradeIcon from '@mui/icons-material/Grade';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AssignmentIcon from '@mui/icons-material/Assignment';

const drawerWidth = 200;

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'absolute',
            top: '64px',
          },
        }}
      >
        <Box /> {/* Navbar ile arasında boşluk bırakmak için */}
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => { navigate('/') }}>
              <ListItemIcon>
                <WbSunnyIcon />
              </ListItemIcon>
              <ListItemText primary='Günüm' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => { navigate('/planned') }}>
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary='Planlanan' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => { navigate('/important') }}>
              <ListItemIcon>
                <GradeIcon />
              </ListItemIcon>
              <ListItemText primary='Önemli' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => { navigate('/tasks') }}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary='Görevler' />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        {/* dinamik liste oluşturma eklenecek yer:  */}
      </Drawer>
    </Box >
  );
}
