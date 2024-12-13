'use client'
import { useEffect, useState } from 'react'
import { QRCode } from 'react-qr-code';
import { Box, Grid, Typography, Button } from "@mui/material";
import { useCart } from '../contexts/CartContext';
import { ENDPOINTS } from "../constants/endpoints";
import axiosInterceptorInstance from "../axios/interceptor";

const PagoQR = () => {
  const [idOrder, setIdOrder] = useState(0);
  const apiURL = process.env.NEXT_PUBLIC_LARAVEL_API_URL;
  const { shippingItems, cartItems, transferToShipping} = useCart();
  const user = JSON.parse(localStorage.getItem("user"));

  const mail=user.user.email;
  const cart = JSON.parse(localStorage.getItem("cartItems"));
  let totalPrice = 0;
  let productAmount = 0;
  const details = cart.map((item) => {
    const subtotal = item.quantity * item.price;
    const discount = 0; 
    totalPrice += subtotal;
    productAmount += item.quantity;
    return {
      product_id: item.id,
      quantity: item.quantity,
      price_unit: item.price,
      subtotal,
      discount,
    };
  })
  const handleConfirmQR = async ()=> {
    try {
      const response = await axiosInterceptorInstance.get(`${ENDPOINTS.validar}/${idOrder}`);
      console.log('Respuesta de validación:', response.data.pago);
      if(response.data.pago === 0){
        alert('No se ha realizado el pago');
      }
      else{
        alert('Se ha realizado correctamente el pago');
        transferToShipping();
        window.location.href = '/cart';
      }
    } catch (error) {
      console.error('Error al validar el pago:', error);
    }
    
  };
  useEffect(() => {
           
    const sendData = async () => {
      try {
        const response = await axiosInterceptorInstance.post(ENDPOINTS.saveSale,
          {
            total: totalPrice,
            user_id: 3,
            product_amount: productAmount,
            details: details,
          });
        setIdOrder(response.data.id);
      } catch (error) {
        console.error('Error al guardar:', error);
      }
    };
  
    sendData();
  }, []);
  return (
    <Box sx={{ marginTop: "10vh", marginLeft: "26vh" }}>
      <Grid container sx={{ width: '100%' }} alignItems="center" justifyContent="center">
        <Grid item sm={6} align="center">
          <Typography variant="h4">Paga con QR</Typography>
          <Box mt={4}>
            <Typography variant="body1" sx={{ marginTop: "10vh", marginLeft: "5vh", marginRight: "5vh" }}>
              Por favor, verifique si el correo electrónico {mail} es correcto para el envío de su factura. En caso de error, presione el botón Cancelar, corrija su correo y vuelva a generar el código QR.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "10vh", marginLeft: "5vh", marginRight: "5vh" }}>
              Escanee el código QR, luego verifique con el botón “Verificar Pago QR” para validar su transacción
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={6} align="center">
          <QRCode value={`${apiURL}/compra/validar/${idOrder}`} style={{ marginTop: "10vh" }} />
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', marginTop: "10vh" }} alignItems="center" justifyContent="center">
        <Grid item sm={6} align="center">
          <Button
            sx={{
              backgroundColor: "#98436C", 
              marginTop: "5vh", 
              '&:hover': { 
                backgroundColor: "#7a2a4d"
              }
            }}
            variant="contained"
          >
            Cancelar
          </Button>
        </Grid>
        <Grid item sm={6} align="center">
          <Box mt={4}>
            <Button
              sx={{
                backgroundColor: "#16193b", 
                '&:hover': { 
                  backgroundColor: "#0f1129"
                }
              }}
              variant="contained"
              onClick={handleConfirmQR}
            >
              Verificar Pago QR
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PagoQR;
