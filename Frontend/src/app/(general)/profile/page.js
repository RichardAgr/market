"use client"
import { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import TextAvatar from '../../components/TextAvatar';
import { useRouter } from 'next/navigation';
import AlertDialogDelete from './alertDialog';
import axiosInterceptorInstance from "../../axios/interceptor";
import { DELETE_MESSAGES } from "../../constants/deletemessages";
import { ENDPOINTS } from "../../constants/endpoints";
import EditIcon from '@mui/icons-material/Edit';


function Profile() {
	const router = useRouter();
	const [userData, setUserData] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [text, setText] = useState();
	const [editModeCorreo, setEditModeName] = useState(userData?.name || '');
	const [editModeNombre, setEditModeEmail] = useState(userData?.email || '');
	const userIdToDelete = userData?.id;
 const [points,setpoints]=useState({});

	const redirectToModify = () => {	
		router.push('/profile/modifyProfile');
	}

	useEffect(() => {
		axiosInterceptorInstance.get('/user').then((res) => {
			setUserData(res.data);
		}).catch((err) => {
		})

	}, []);
	
	const fetchData = async () => {
		
		try {
		  
		  const response = await axiosInterceptorInstance.get(`${ENDPOINTS.points}/${userData.id}`);
		  
		 setpoints(response.data); 
		 

		} catch (error) {
		  console.error('Error al obtener datos:', error);
		}
	  };
	 useEffect(()=>{
		fetchData();
	 },[userData]) ; 


	   
	

	const redirectToVerifyEmail = () => {
		router.push('/verifyEmail');
    }
  
	const handleCloseDialog = () => {
		setOpenDialog(false);
		setText('');
	}

	const handleConfirm = () => {
		deleteAccount();
		setOpenDialog(false);
		setText('');
		if (text === DELETE_MESSAGES.question) {
			router.push('/login');
		}
	}


	const deleteAccount = () => {
		axiosInterceptorInstance.delete(`${ENDPOINTS.user}/${userIdToDelete}`)
			.then(() => {
				localStorage.removeItem('user');
			})
			.catch((error) => {
				setText(error.response.data.errors.email[0]);
			})
			.finally(() => {
				setOpenDialog(true);
			});
	}

	const handleAlert = (event) => {
		event.preventDefault();
		setText(DELETE_MESSAGES.question);
		setOpenDialog(true);
	}

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', backgroundColor: 'white', }}>
			{userData && (
				<>
					<TextAvatar name={userData.name} />
					<Typography sx={{ color: 'black', fontWeight: 600 }}>
						Nombre:
					</Typography>
					<Typography sx={{ color: 'black', paddingBottom: 4 }}>
						{userData.name}
					</Typography>
					<Typography sx={{ color: 'black', fontWeight: 600 }}>
						Correo electrónico:
					</Typography>

					<Typography sx={{ color: 'black', paddingBottom: 4 }}>
						{userData.email}
					</Typography>
					<Typography sx={{ color: 'black', fontWeight: 600 }}>
						Puntos de fidelidad:
					</Typography>
					<Typography sx={{ color: 'black', paddingBottom: 4 }}>
						{points.puntos}
					</Typography>

					<Box sx={{ height: '1rem', display: "flex", flexDirection: "row" }} >
						<Typography sx={{ color: 'black', paddingBottom: 4 }}>
							{userData.email}
						</Typography>
						<Typography sx={{ color: '#98436C', fontWeight: 600, marginLeft: "0.5rem" }}>
							{userData.email_verified_at && 'Verificado'}
						</Typography>
					</Box>
					<EditIcon sx={{ color: '#98436C', marginTop: "2rem" }} onClick={redirectToModify}/>
					{!userData.email_verified_at && <Button sx={{ color: "white", marginTop: "2rem" }} variant='contained' onClick={redirectToVerifyEmail}>
						Verificar correo
					</Button>}
					<AlertDialogDelete handleClose={handleCloseDialog} handleConfirm={handleConfirm} openDialog={openDialog} text={text} />
					<Button variant="contained" onClick={handleAlert} sx={{ backgroundColor: '#D33838', '&:hover': { backgroundColor: '#98436C' }, marginTop: "2rem" }}>
						Eliminar cuenta
					</Button>

				</>
			)
			}
		</Box >
	);
}
export default Profile;
