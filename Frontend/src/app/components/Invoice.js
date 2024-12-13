'use client'
import { useMemo } from 'react';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { Paper, Table, TableBody, TableCell, TableContainer, Button, TableHead, TableRow } from '@mui/material';

const Invoice = () => {
  const { cartItems } = useCart();
  const { userInfo } = useUser();

  const totalAmount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalDiscount = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity * item.discout / 100), 0);
  }, [cartItems]);

  const handleCart = () => {
    window.location.href = '/cart';
  };

  const totalPrice = totalAmount - totalDiscount;

  const styles = {
    paperContainer: {
      padding: 20,
      fontSize: '0.875rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      width: '60%',
      margin: 'auto',
      padding: '20px',
      height: '100vh'
    },
    header: {
      fontWeight: 'bold',
      padding: '16px 0',
      textAlign: 'center',
    },
    section: {
      margin: '20px 0',
    },
    table: {
      width: '100%',
      marginBottom: '20px',
    },
    tableRow: {
      backgroundColor: '#dedcdc',
    },
    tableCell: {
      border: '1px solid #ddd',
      padding: '8px',
    },
    bold: {
      fontWeight: 'bold',
    },
    totalsRow: {
      backgroundColor: '#dedcdc',
    },
  };

  return (
    <Paper style={styles.paperContainer}>
      <div style={styles.header}>FACTURA</div>
      <div style={styles.section}>
        <div style={styles.bold}>Información de facturación:</div>
        <div>{userInfo.name}</div>
        <div>{userInfo.address}</div>
      </div>
      <TableContainer component={Paper} style={styles.table}>
        <Table>
          <TableHead>
            <TableRow style={styles.tableRow}>
              <TableCell style={styles.tableCell}>Cantidad</TableCell>
              <TableCell style={styles.tableCell}>Descripción</TableCell>
              <TableCell style={styles.tableCell}>Precio (Unitario)</TableCell>
              <TableCell style={styles.tableCell}>Descuento</TableCell>
              <TableCell style={styles.tableCell}>Total c/Descuento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell style={styles.tableCell}>{item.quantity}</TableCell>
                <TableCell style={styles.tableCell}>{item.name}</TableCell>
                <TableCell style={styles.tableCell}>{`${item.price.toFixed(2)} $`}</TableCell>
                <TableCell style={styles.tableCell}>{`${item.discout.toFixed(0)}%`}</TableCell>
                <TableCell style={styles.tableCell}>{`${(item.price * item.quantity * (1 - item.discout / 100)).toFixed(2)} $`}</TableCell>
              </TableRow>
            ))}
            <TableRow style={styles.totalsRow}>
              <TableCell colSpan={4} style={styles.tableCell}>Total Descuentos</TableCell>
              <TableCell style={styles.tableCell}>{`${totalDiscount.toFixed(2)} $`}</TableCell>
            </TableRow>
            <TableRow style={styles.totalsRow}>
              <TableCell colSpan={4} style={styles.tableCell}>Total Final</TableCell>
              <TableCell style={styles.tableCell}>{`${totalPrice.toFixed(2)} $`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
        <Button
            variant="contained" onClick={handleCart}
            color="primary"
            fullWidth
            sx={{ marginBottom: 2, backgroundColor: '#16193b', color: 'white', ':hover': { backgroundColor: '#32569b' } }}
        >
            regresar
        </Button>
    </Paper>
  );
};

export default Invoice;
