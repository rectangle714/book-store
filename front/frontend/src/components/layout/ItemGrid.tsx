import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const ItemGrid = () => {
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value));
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;

  return (
    <Grid sx={{ flexGrow: 2 }} container spacing={1} style={{paddingTop:'50px'}}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          {[0, 1, 2, 3].map((value) => (
            <Grid key={value} item>
              <Paper
                elevation={3}
                sx={{
                  height: 140,
                  width: 150,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : 'green',
                  border: '5px solid black',
                  borderRadius: '15px'
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ItemGrid;