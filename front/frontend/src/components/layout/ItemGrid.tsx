import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const ItemGrid = () => {
  const [spacing, setSpacing] = React.useState(2);

  return (
    <Grid sx={{ flexGrow: 2 }} container spacing={1} style={{paddingTop:'50px'}}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          {[0, 1, 2, 3, 4].map((value) => (
            <Grid key={value} item>
              <Paper
                elevation={1}
                sx={{
                  height: 140,
                  width: 150,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : 'white',
                  border: '2px solid black',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}
              ><img src={"image/puppy.png"} style={{width:'120px', height:'100px', marginTop:'12px'}} /></Paper>
              <div style={{textAlign:'center'}}>제품명</div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ItemGrid;