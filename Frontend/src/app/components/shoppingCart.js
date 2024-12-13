import React, { useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import { Paper, Card, Box, Grid, Typography, Container, Button, IconButton, TextField } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductQuantityButtons from "./productQuantityButtons";
import { useCart } from '../contexts/CartContext';
import { UserProvider } from '../contexts/UserContext';
import ProductoConEstado from './ProductWithStatus';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Alert from '@mui/material/Alert';

const couponCode = [['123abc', 5], ['456def', 20], ['789ghi', 10], ['101jkl', 25], ['135mno', 15], ['159pqr', 30], ['259pqr', 30]];
    const UsedCouponCode = [];
    var value = 0;
    var res;
    var captura;

let globalTotalDiscount = 0;
let globalgetTotalBuy = 0;
let globalTotalmount = 0;

const ShoppingCart = ({ onQuantityChange }) => {   

    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { shippingItems, cartItems, removeFromCart, clearCart, clearShippingItems } = useCart();
    const [couponInput, setCouponInput] = useState('');
    const [totalBuy, setTotalBuy] = useState('');
    const [totalDiscountSet, setTotalDiscount] = useState('');
    const actualizarTotalDiscount = (nuevoTotalDiscount) => {
        setTotalDiscount(nuevoTotalDiscount);
    };
    const actualizarTotalBuy = (nuevoTotalBuy) => {
        setTotalBuy(nuevoTotalBuy);
    };
   
    useEffect(() => {
        actualizarTotalBuy(globalgetTotalBuy);
        actualizarTotalDiscount(globalTotalDiscount);
      }, [globalgetTotalBuy,globalTotalDiscount]); 

    const handleCouponInputChange = (event) => {
        setCouponInput(event.target.value);
    };

    const handleApplyCoupon = () => {
        const result = checkCoupon(couponInput);
        setSnackbarMessage(result);
        setSnackbarOpen(true);
    };



    const handleRemoveProduct = (productId) => {
        removeFromCart(productId);
    };

    const handleEmptyCart = () => {
        clearCart();
    };

    const handleBackToHome = () => {
        window.location.href = '/reportes/usuariosRegistrados';
    };

    const handleInvoice = () => {
        window.location.href = '/invoice';
    };

    const handleQR = () => {
        window.location.href = '/qr';
    };

    const handleCupon = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleEnvios = () => {
        clearShippingItems();
    }
    const totalmount = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        const roundedTotal = Number(totalPrice.toFixed(2));
        return roundedTotal;
    };
    globalTotalmount = totalmount();

  
   

    const totalDiscount = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += (item.price * (item.discout / 100)) * item.quantity;
        });
        const roundedTotal = Number(totalPrice.toFixed(2));
        return roundedTotal;
    };
    globalTotalDiscount = totalDiscount();
    const getTotalBuy = () => {
        const roundedTotal = Number((totalmount() - totalDiscount()).toFixed(2));
        return roundedTotal;
    };
    globalgetTotalBuy = getTotalBuy();

    const discoutOneProduct = (position) => {
        let totalPrice = 0;
        totalPrice = (cartItems[position].price - (cartItems[position].price * (cartItems[position].discout / 100)));
        const roundedTotal = Number(totalPrice.toFixed(2));
        return roundedTotal;
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };  


    const applyCouponDiscuount = (mountvalue) => {
        globalTotalDiscount += mountvalue;
        globalgetTotalBuy -= mountvalue;
        actualizarTotalBuy(globalgetTotalBuy);
        actualizarTotalDiscount(globalTotalDiscount);
      };
    const checkCoupon = (coupon) => {
        for (let i = 0; i < couponCode.length; i++) {
            const currentCode = couponCode[i][0];
            if (currentCode === coupon) {
                value = couponCode[i][1];
                UsedCouponCode.push(coupon);
                res = 'Código de cupón válido "' + coupon + '" se aplico un descuento de ' + value + ' $';
                couponCode.splice(i, 1);
                applyCouponDiscuount(value);
                return res;
            }
        }
        for (let i = 0; i < UsedCouponCode.length; i++) {
            const currentCode = UsedCouponCode[i];
            if (currentCode === coupon) {
                value = 0;
                res = 'Código de cupón NO válido "' + coupon + '" ya se usó';
                return res;
            }
        }
        res = 'Código de cupón NO válido "' + coupon + '" no existe';
        value = 0;
        return res;        

    }

    return (
        <UserProvider>
            <Container sx={{ maxWidth: 'lg', margin: '0 auto', padding: '10px', height: '100vh' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={9}>
                        <Paper elevation={3} sx={{ paddingTop: 10, paddingRight: 2, paddingLeft: 18, margin: '0 auto' }}>
                            <Grid container alignItems="center">
                                <Grid item xs={0}>
                                    <ShoppingCartOutlinedIcon sx={{ fontSize: 50 }} />
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000000', marginLeft: 1 }}
                                        >Tu Carrito de Compras
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} container justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        startIcon={<DeleteSweepIcon />}
                                        onClick={handleEmptyCart}
                                        sx={{ backgroundColor: '#16193b', color: 'white', ':hover': { backgroundColor: '#32569b' } }}
                                    > Vaciar carrito
                                    </Button>
                                </Grid>
                            </Grid>
                            <Container sx={{ width: '95%', mx: 'auto', mt: 5, mb: 0 }}>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item xs={5}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#868585' }}>
                                            PRODUCTO
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} container justifyContent="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#868585' }}>
                                            PRECIO
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} container justifyContent="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#868585' }}>
                                            CANTIDAD
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Container>
                            {cartItems.map((item, index) => (
                                <Box key={item.id} sx={{ mt: 1 }}>
                                    <Card variant="outlined" sx={{ transition: "0.3s", '&:hover': { backgroundColor: 'rgba(0,0,0,0.00)', transform: 'scale(1.03)' }, borderRadius: '10px', borderWidth: 2, }}>
                                        <Grid container alignItems="center" sx={{ padding: 1.2 }} height="200">
                                            <Grid item xs={5}>
                                                <Box display="flex" flexDirection="row" alignItems="center">
                                                    <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', marginRight: 20, borderRadius: '7px' }} />
                                                    <Box>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#4B4B4B' }}>
                                                            {item.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {item.provider}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={4} container justifyContent="center">
                                                <Box>
                                                    <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>{'$ '}{discoutOneProduct(index)}</Typography>
                                                    <Typography style={{ textDecoration: 'line-through' }}>{'$ '}{item.price}</Typography>
                                                    <Typography style={{ color: 'red' }}>{'-'}{item.discout}{'%'}</Typography>
                                                </Box>

                                            </Grid>

                                            <Grid item xs={2} container justifyContent="center">
                                                <ProductQuantityButtons product={item} onQuantityChange={onQuantityChange} />
                                            </Grid>

                                            <Grid item xs={1} container justifyContent="flex-end">
                                                <IconButton onClick={() => handleRemoveProduct(item.id)} aria-label="delete" sx={{ color: 'black', '&:hover': { color: '#32569b' } }}>
                                                    <DeleteIcon sx={{ fontSize: '2rem' }} />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Box>
                            )
                            )
                            }
                        </Paper>
                        <Paper elevation={3} sx={{ paddingTop: 3, paddingRight: 2, paddingBottom: 3, paddingLeft: 18, margin: '0 auto' }}>
                            <Grid container alignItems="center">
                                <Grid item xs={0}>
                                    <LocalShippingOutlinedIcon sx={{ fontSize: 50 }} />
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000000', marginLeft: 1 }}>
                                        Pedidos
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} container justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        startIcon={<DeleteSweepIcon />}
                                        onClick={handleEnvios}
                                        sx={{ backgroundColor: '#16193b', color: 'white', ':hover': { backgroundColor: '#32569b' } }}
                                    >
                                        Limpiar Pedidos
                                    </Button>
                                </Grid>
                            </Grid>
                            <Box sx={{ mt: 2 }}>
                                {shippingItems.map((producto, index) => (
                                    <ProductoConEstado key={index} producto={producto} />
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ paddingTop: 10, position: 'sticky', top: 60, height: 'fit-content' }}>
                        <Grid container justifyContent="center" >
                            <Button variant="contained" onClick={handleBackToHome} fullWidth
                                sx={{ marginTop: 7, backgroundColor: '#16193b', color: 'white', ':hover': { backgroundColor: '#32569b' } }}
                            >
                                Agregar Productos
                            </Button>
                        </Grid>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                                Resumen de pedido
                            </Typography>
                            <Typography variant="body1">
                                Descuento total: {'$'}{totalDiscountSet}
                            </Typography>
                            <Typography variant="body1">
                                Subtotal: {'$'}{globalTotalmount}
                            </Typography>
                            <Typography variant="body1" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Total de la compra: {'$'}{totalBuy}
                            </Typography>
                            <Box sx={{ marginTop: 1 }}>

                                <Button
                                    variant="contained" onClick={handleCupon}
                                    fullWidth
                                    sx={{ marginBottom: 2, backgroundColor: '#16193b', color: 'white', ':hover': { backgroundColor: '#32569b' } }}
                                >
                                    info Codigo del cupon

                                </Button>
                                {/* Diálogo */}

                                <Dialog open={openDialog} onClose={handleCloseDialog}>
                                    <DialogTitle>{'Ingresa el código de tu cupón, este está compuesto por tres números y tres letras'}</DialogTitle>
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog} color="primary">
                                            Cerrar
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                                <Box sx={{ marginTop: 0, marginBottom: 1 }}>
                                    {/* Campo de texto para el código del cupón */}
                                    <TextField
                                        value={couponInput}
                                        onChange={handleCouponInputChange}
                                        label="Código del cupón"
                                    />
                                </Box>

                                <Button
                                    variant="contained" onClick={handleApplyCoupon}
                                    fullWidth
                                    sx={{ marginBottom: 2, backgroundColor: '#16193b', color: 'white', ':hover': { backgroundColor: '#32569b' } }}                                >
                                    Aplicar Cupón
                                </Button>
                                {/* Snackbar para mostrar el mensaje del cupón */}
                                <Snackbar
                                    open={snackbarOpen}
                                    autoHideDuration={6000}
                                    onClose={handleSnackbarClose}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    sx={{
                                        position: 'fixed',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        bottom: '10px',
                                        zIndex: 200000,
                                    }}                                >
                                    <Alert onClose={handleSnackbarClose} severity="info">
                                        {res}
                                    </Alert>
                                </Snackbar>
                                {/* Diálogo */}
                                <Button
                                    variant="contained" onClick={handleInvoice}
                                    fullWidth
                                    sx={{ marginBottom: 2, backgroundColor: '#16193b', color: 'white', ':hover': { backgroundColor: '#32569b' } }}
                                >
                                    Ver Factura
                                </Button>
                                <Button
                                    variant="contained" onClick={handleQR}
                                    color="primary"
                                    fullWidth
                                    sx={{ marginBottom: 2, backgroundColor: '#16193b', color: 'white', ':hover': { backgroundColor: '#32569b' } }}                                >
                                    Finalizar Compra
                                </Button>

                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </UserProvider>
    );
};

ShoppingCart.propTypes = {
    onQuantityChange: PropTypes.func.isRequired
};
export default ShoppingCart;
