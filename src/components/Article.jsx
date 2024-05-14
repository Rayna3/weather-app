import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActions, Button} from '@mui/material';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './../App.css'

  export default function Article(data) {
    const card = (
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              {data['title']}Title
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="body2">
                {data["author"]}
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="body2">
                {data["abs"]}
            </Typography>
            {/* <img style={{width: 50, height: 50}} src={'https://openweathermap.org/img/wn/' + data['weather']['icon'] + '@2x.png'}></img> */}
            <Typography variant="h5" component="div">
              {/* {Math.round(data["main"]["temp"] - 273.15)}° */}
            </Typography>
            <Typography variant="body2">
              {/* Min Temp: {Math.round(data["main"]["temp_min"] - 273.15)}° -  Max Temp: {Math.round(data["main"]["temp_max"] - 273.15)}° */}
            </Typography>
          </CardContent>
          <CardActions>
            <a href={data["url"]}>
                <Button size="small">Go To Article</Button>
            </a>
        </CardActions>
        </React.Fragment>
      );

    return (
      <Box sx={{ width: 600}}>
        <Card variant="outlined">{card}</Card>
      </Box>
    );
  }