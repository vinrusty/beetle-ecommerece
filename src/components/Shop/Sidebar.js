import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Checkbox, Collapse, Divider, List, ListItemButton, ListItemText, ToggleButtonGroup, ToggleButton, RadioGroup, FormControlLabel, Slider } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { RootState } from '../../Context/Context';

function Sidebar() {

  const { id } = useParams()
  const { productDispatch } = RootState()

  const [catopen, setCatOpen] = useState(true);
  const [brandopen, setBrandOpen] = useState(true);
  const [sizeopen, setSizeOpen] = useState(true);
  const [coloropen, setColorOpen] = useState(true);
  const [menChecked, setMenChecked] = useState(id === 'men' ? true : false);
  const [womenChecked, setWomenChecked] = useState(id === 'women' ? true : false);
  const [kidsChecked, setKidsChecked] = useState(id === 'kids' ? true : false);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState([0]);

  return (
    <div>
        <Box  xs= 'none' sm='block'
            className='sidebar'
            sx={{
             boxSizing: 'border-box', width: "250px", height: "90vh", position: "fixed", marginTop: "75px", borderWidth: 0, overflowY: "auto",
             scrollbarColor: "black", scrollbarWidth: "10px"
          }}
        >
        <div style={{padding: "0 30px"}}>
            <h2 style={{textAlign: "left", fontFamily: "Poppins"}}>All Products</h2>
        </div>

        <List>
            <ListItemButton sx={{px: "30px"}} onClick={() => setBrandOpen(!brandopen)}>
                <ListItemText primary="Brands" />
                { brandopen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Divider />
            <Collapse in={brandopen} timeout="auto" unmountOnExit>
                <List>
                {
                ["Nike", "Adidas", "Puma", "New Balance"].map((brand, index) => {
                    return(
                        <ListItemButton sx={{px: "30px"}}>
                            <Checkbox onChange={(e) => productDispatch({
                                type: "FILTER_BY_BRAND",
                                payload: {
                                    brand: brand
                                }
                            })} />
                            <ListItemText key={index} primary={brand} />
                        </ListItemButton>
                    )
                })
            }
                </List>
            </Collapse>
            {
                ["Life Style", "Jordans", "Basketball", "Running", "Athletics", "Football", "Tennis"].map((text, index) => {
                    return(
                        <ListItemButton sx={{px: "30px"}}>
                            <ListItemText key={index} primary={text} />
                        </ListItemButton>
                    )
                })
            }
            <Divider />
            <ListItemButton sx={{px: "30px"}} onClick={() => setCatOpen(!catopen)}>
                <ListItemText primary="Categories" />
                { catopen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={catopen} timeout="auto" unmountOnExit>
                <List>
                    <ListItemButton sx={{px: "30px"}}>
                        <Checkbox checked={menChecked} onClick={() => setMenChecked(!menChecked)} 
                        onChange = {(e) => productDispatch({
                            type: "FILTER_BY_CATEGORY",
                            payload: {
                                category: "Men"
                            }
                        })} />
                        <ListItemText primary="Men" />
                    </ListItemButton>
                    <ListItemButton sx={{px: "30px"}}>
                        <Checkbox checked={womenChecked} onClick={() => setWomenChecked(!womenChecked)}
                        onChange = {(e) => productDispatch({
                            type: "FILTER_BY_CATEGORY",
                            payload: {
                                category: "Women"
                            }
                        })} />
                        <ListItemText primary="Women" />
                    </ListItemButton>
                    <ListItemButton sx={{px: "30px"}}>
                        <Checkbox checked={kidsChecked} onClick={() => setKidsChecked(!kidsChecked)}
                        onChange = {(e) => productDispatch({
                            type: "FILTER_BY_CATEGORY",
                            payload: {
                                category: "Kids"
                            }
                        })} />
                        <ListItemText primary="Kids" />
                    </ListItemButton>
                </List>
            </Collapse>
            <Divider />
            <ListItemButton sx={{px: "30px"}} onClick={() => setSizeOpen(!sizeopen)}>
                <ListItemText primary="Size" />
                { sizeopen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={sizeopen} timeout="auto" unmountOnExit>
                <ToggleButtonGroup color="primary" value={size} onChange={(e, nextSize) => setSize(nextSize)} sx={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "10px"}}>
                    {
                        [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10, 11, 12, 13, 14].map((s, index) => {
                            return(
                                <ToggleButton key={s} value={s}
                                onClick={(e) => {
                                    productDispatch({
                                        type: "FILTER_BY_SIZE",
                                        payload: {
                                            size: s
                                        }
                                    })
                                }} aria-label={s}>
                                    {s}
                                </ToggleButton>
                            )
                        })
                    }
                </ToggleButtonGroup>
            </Collapse>
            <Divider />
            <ListItemButton sx={{px: "30px"}} onClick={() => setColorOpen(!coloropen)}>
                <ListItemText primary="Color" />
                { coloropen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={coloropen} timeout="auto" unmountOnExit>
                <RadioGroup value={color} onChange={(e, nextColor) => setColor(nextColor)} sx={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "2rem"}}>
                    {
                        ["red", "blue", "green", "yellow", "black", "gray"].map((s, index) => {
                            return(
                                <FormControlLabel sx={{m: "2px"}} control={<Checkbox sx={{color: `${s}` ,'&.Mui-checked': {color: `${s}`, background: "none"}}}
                                onChange = {(e) => {
                                    productDispatch({
                                        type: "FILTER_BY_COLOR",
                                        payload: {
                                            color: s
                                        }
                                    })
                                }} />} value={s} />
                            )
                        })
                    }

                </RadioGroup>
            </Collapse>
            <Divider />
        </List>
        </Box>
    </div>
  )
}

export default Sidebar