import { Card, CardContent, CardMedia, Typography, Box, CardActions, Button, Chip, Rating } from '@mui/material';
import React from 'react';
import useStyles from './styles'
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOnOutlined';

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  const classes = useStyles();

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
        <Box display='flex' justifyContent={'space-between'}>
          <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant='subtitle1'>{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box display='flex' justifyContent={'space-between'}>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
        </Box>
        <Box display='flex' justifyContent={'space-between'}>
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box key={award.display_name} display="flex" justifyContent="space-between" my={1} alignItems="center">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon />{place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
