import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="profile-section">
        <img src="path_to_avatar_image" alt="Profile" className="profile-img" />
        <h3>Iqbaal Ramadhan</h3>
        <p>@iqbaale</p>
      </div>
      <List>
        <ListItem component={NavLink} to="/profile">
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        <ListItem component={NavLink} to="/courses">
          <ListItemIcon><SchoolIcon /></ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>

        <ListItem component={NavLink} to="/faculty">
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary="Faculty Members" />
        </ListItem>

        <ListItem component={NavLink} to="/recommendations">
          <ListItemIcon><StarIcon /></ListItemIcon>
          <ListItemText primary="Recommendations" />
        </ListItem>

        <ListItem component={NavLink} to="/vr">
          <ListItemIcon><StarIcon /></ListItemIcon> 
          <ListItemText primary="VR Experience" />
        </ListItem>

        <ListItem component={NavLink} to="/logout">
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
