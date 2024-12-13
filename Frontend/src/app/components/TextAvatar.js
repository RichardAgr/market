import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function TextAvatar({name}) {
  
  const getInitials = () => {
    return name[0] + name[name.indexOf(" ")+1];
  };

  return <Box sx={{padding:8}}>
    <Avatar sx={{width:160, height:160, backgroundColor: '#E4D8D8', marginTop:'2rem'}}>
      <Typography variant="h2" sx={{color:'#98436C'}}>
       {getInitials()}
      </Typography>
    </Avatar>
   </Box>
}
