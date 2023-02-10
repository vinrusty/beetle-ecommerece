import React, { useState } from 'react'
import axios from 'axios'
import { Box, FormControlLabel, FormGroup, InputAdornment, TextField, Radio, RadioGroup, Button, Snackbar, Alert } from '@mui/material'
import { v4 as uuid } from 'uuid'
import { RootState } from '../../Context/Context'
import { useNavigate } from 'react-router-dom'

function CustomerDetails({axiosJWT, URL}) {

  const {cartState, authState, cartDispatch} = RootState()
  
  const [status, setStatus] = useState('')
  const [billName, setBillName] = useState('')
  const [billAddress, setBillAddress] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [phone, setPhone] = useState('')
  const [successToast, setSuccessToast] = useState(false)
  const [errorToast, setErrorToast] = useState(false)
  const navigate = useNavigate()

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  const totalPrice = () => {
    let sum = 0
    cartState && cartState.cart.forEach(item => {
      sum += Number(item.quantity)*Number(item.product.price)
    })
    return sum
  }

  const handleDeleteAll = async () => {
    try{
      const data = await axiosJWT.delete(URL+"/cart/all", {
        headers: {
          'x-access-token': authState?.aToken
        },
        data: {
          email: authState?.user.email,
        }
      })
      const message = await data.data
      if(message.message === 'success'){
        cartDispatch({
          type: "DELETE_ALL_FROM_CART",
          payload: {
            product: {}
          }
        })
        navigate(process.env.PUBLIC_URL+"/orders")
      }
      else{

      }
    }
    catch(err){
      console.log(err)
    }
  }

  const handleOrderProceed = async () => {
    const date = new Date()
    try{
      const data = await axiosJWT.post(URL+"/order/",
        {
          email: authState?.user.email,
          orderId: uuid(),
          orderName: billName,
          address: billAddress + ", " + city + " ," + district + ", " + state,
          total: totalPrice(),
          zipcode: zip,
          cartItems: cartState.cart,
          phone: phone,
          paymentMode: status,
          orderDate: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
        },
        {
          headers: {'x-access-token': authState?.aToken}
        }
      )
      const savedOrder = await data.data;
      console.log(savedOrder)
      if(savedOrder.message === "success"){
        // handleOrderMail(savedOrder.order)
        handleDeleteAll()
        setSuccessToast(true)
      }
    }
    catch(err){
      setErrorToast(true)
    }
  }

  // const handleOrderMail = async(order) => {
  //   const date = new Date()
  //   try{
  //     const data = await axios.post("http://localhost:3001/order/order-mail",
  //       {
  //           email: authState?.user.email,
  //           orderId: uuid(),
  //           orderName: billName,
  //           address: billAddress + ", " + city + " ," + district + ", " + state,
  //           total: totalPrice(),
  //           zipcode: zip,
  //           cartItems: cartState.cart,
  //           phone: phone,
  //           paymentMode: status,
  //           orderDate: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
  //       }
  //     )
  //     const message = await data.data;
  //     console.log(message)
  //   }
  //   catch(err){
  //     console.error(err)
  //   }
  // }

  const initPayment = (data) => {
		const options = {
			key: "rzp_test_cKEHrnAam8deou",
			amount: data.amount,
			currency: data.currency,
			name: 'Beetles',
			description: "Shoes purchase",
			image: '',
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = URL+"/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					if(data.message === 'Payment verified successfully'){
              handleOrderProceed()
          }
          else{
        
          }
				} catch (error) {

				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = URL+"/payment/orders";
			const { data } = await axios.post(orderUrl, { amount: Number(totalPrice()) });
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};
  
  return (
    <div>
        <Box sx={{padding: "2rem", textAlign: "left"}}>
            <h2>Billing Address</h2>
            <TextField fullWidth variant='outlined' label='Billing Name' onChange={(e) => setBillName(e.target.value)} required />
            <TextField sx={{mt: "15px"}} fullWidth variant='outlined' label='Address' onChange={(e) => setBillAddress(e.target.value)} required />
            <TextField sx={{mt: "15px"}} fullWidth variant='outlined' label='City' required onChange={(e) => setCity(e.target.value)} />
            <TextField sx={{mt: "15px"}} fullWidth variant='outlined' label='District' required onChange={(e) => setDistrict(e.target.value)} />
            <TextField sx={{mt: "15px"}} fullWidth variant='outlined' label='State' required onChange={(e) => setState(e.target.value)} />
            <TextField sx={{mt: "15px"}} fullWidth variant='outlined' label='Zip code' required onChange={(e) => setZip(e.target.value)} />
            <TextField sx={{mt: "15px"}} fullWidth variant='outlined' label='Phone' onChange={(e) => setPhone(e.target.value)} InputProps={{startAdornment: <InputAdornment>+91</InputAdornment>}} required />
            <FormGroup sx={{display: "flex", mt: "15px"}}>
                <RadioGroup onChange={handleStatusChange}>
                    <FormControlLabel value="COD" control={<Radio color="secondary" />} label="Cash on Delivery" />
                    <FormControlLabel value="online" control={<Radio color="secondary" />} label="Pay Online" />
                </RadioGroup>
            </FormGroup>
            <Button color="secondary" variant="contained" sx={{width: "250px"}} onClick={status === 'COD' ? handleOrderProceed : handlePayment}>Proceed</Button>
        </Box>
        <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={successToast} onClose={() => setSuccessToast(false)} autoHideDuration={2000}>
          <Alert onClose={() => setSuccessToast(false)} severity='success' sx={{ width: '100%' }}>Order placed successfully!</Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={errorToast} onClose={() => setErrorToast(false)} autoHideDuration={2000}>
          <Alert onClose={() => setSuccessToast(false)} severity='error' sx={{ width: '100%' }}>Unable to place the order :(</Alert>
        </Snackbar>
    </div>
  )
}

export default CustomerDetails