'use client'
import { useRouter } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box,Stack,MenuItem,TextField } from '@mui/material';
import { useState, useEffect } from "react";
import axiosInterceptorInstance from "@/app/axios/interceptor";
import { ENDPOINTS } from "@/app/constants/endpoints";
import BasicModal from '../marketing/cuponDescuento/page';
import { PRODUCT_SELECT_OPTIONS } from '@/app/constants/productSelectOptions';

function ProductsCatalog(){
  const [products, setProducts] =useState([]);
  const [selectValue, setSelectValue] = useState(PRODUCT_SELECT_OPTIONS.all)
  const router = useRouter();
  useEffect(() => {
    const getProducts = async () => {
      try {
          const response = await axiosInterceptorInstance.get(
            `${ENDPOINTS.products}/${20}/${selectValue}`
          );
          setProducts(response.data.data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };
    getProducts()
  }, [selectValue]);

  const handleCardClick = (productId) => {
    router.push(`/product/${productId}`);
  };
  const styleLabel = {
    position: 'absolute',
    top:0,
    left: 0,
    zIndex: 99,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '2px 20px',
  }
  const styleDescription = {
    width:'100%',
    position:'absolute',
    top: '40%',
    left: 0,
    zIndex:99,
    padding:'2px 15px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  }

    return (
      <>
        <BasicModal />
       <Grid container spacing={3} sx={{width: '70%' , margin: 'auto', marginTop: 12, }}>
          <Grid item xs={12}>
            <TextField label="Productos" select variant="filled" fullWidth onChange={(e) => {setSelectValue(e.target.value) }}>
              <MenuItem value={PRODUCT_SELECT_OPTIONS.all}>Todos</MenuItem>
              <MenuItem value={PRODUCT_SELECT_OPTIONS.inOffer}>En Oferta</MenuItem>
              <MenuItem value={PRODUCT_SELECT_OPTIONS.noOffer}>Sin Oferta</MenuItem>
            </TextField>
          </Grid>
          {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} >
              <Card sx={{position:'relative'}}>
                
                <CardMedia onClick={() => handleCardClick(product.id)}
                  component="img"
                  height="200"
                  width='100'
                  image={product.image}
                  alt={product.name}
                />
                { product.promotions.length > 0 &&
                  (<>
                    <Box sx={styleLabel}
                    >
                      <Typography>Oferta limitada</Typography>
                    </Box>
                    <Box>
                    <Typography sx={styleDescription}>{product.promotions[0].discount.name}</Typography>
                  </Box>
                  </>)
                }
                
                <CardContent >
                  <Typography variant="h5" component="div" sx={{textAlign:'center'}}>
                    {product.name}
                  </Typography>
                  
                    {
                    product.promotions.length > 0 
                    ?(<Stack direction={'row'} justifyContent={'space-around'}>
                        <Box>
                        <Typography variant="body2" component={'span'}>Antes:</Typography>
                          <Typography variant="body2" color="text.secondary" component={'span'} sx={{ textAlign: 'center', textDecoration:'line-through'}}>
                            {product.price} Bs.
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" component={'span'}>Ahora:</Typography>
                          <Typography variant="body2" color="text.secondary" component={'span'} sx={{ textAlign: 'center' }}>
                          {Number(product.price)- Number(product.promotions[0].discount.value)} Bs.
                        </Typography>
                        </Box>
                    </Stack>)
                      : (<Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                        {product.price} Bs.
                      </Typography>)
                    }
                  <div style={{width: '100%', textAlign: 'center',  display: 'flex', justifyContent: 'center' }}>
                  <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            margin: 'auto',
                            marginTop: 2,
                            backgroundColor: "#6788C3",
                            borderRadius: '5px',
                            '&:hover': {
                            backgroundColor: '#6788D9',
                            },
                          }}
                        >
                        Añadir al carrito
                    </Button>
                  </div>
                </CardContent>
              </Card>
          </Grid>
          ))}
        </Grid>
        </>
      );    
}

export default ProductsCatalog;