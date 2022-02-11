import { SearchTwoTone } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, Box, InputBase } from '@mui/material';
import { Autocomplete } from '@react-google-maps/api';
import React from 'react';
import useStyles from './styles'

const Header = ({ onPlaceChanged, onLoad }) => {
  const classes = useStyles();
  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' className={classes.title}>
          TravelApp
        </Typography>
        <Box display={'flex'}>
          <Typography variant='h6' className={classes.title}>
            Explore new place
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search} >
              <div className={classes.searchIcon}>
                <SearchTwoTone/>
              </div>
              <InputBase autoFocus placeholder='Search...' classes={{ root: classes.inputRoot, input: classes.inputInput, }}/>
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>

    </AppBar>
  );
};

export default Header;

