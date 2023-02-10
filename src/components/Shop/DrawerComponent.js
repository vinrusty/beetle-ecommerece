import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Close, ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Checkbox, Collapse, Divider, Drawer, List, ListItemButton, ListItemText, 
    ToggleButtonGroup, ToggleButton, RadioGroup, Radio, FormControlLabel, Slider, useMediaQuery, IconButton } from '@mui/material'

function DrawerComponent({setFilter}) {

  const { id } = useParams()

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
        <div style={{padding: "0 30px", display:"flex"}}>
            <h2 style={{textAlign: "left", fontFamily: "Poppins"}}>All Products</h2>
            <IconButton sx={{marginLeft:"auto"}}>
                <Close onClick={() => setFilter(false)} />
            </IconButton>
        </div>

        <List>
            <ListItemButton sx={{px: "30px"}} onClick={() => setBrandOpen(!brandopen)}>
                <ListItemText primary="Brands" />
                { brandopen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Divider />
            <Collapse in={brandopen} timeout="auto" unmountOnExit>
                <List>
                    <ListItemButton sx={{px: "30px"}}>
                        <Checkbox />
                        <ListItemText primary="Nike" />
                    </ListItemButton>
                    <ListItemButton sx={{px: "30px"}}>
                        <Checkbox />
                        <ListItemText primary="Adidas" />
                    </ListItemButton>
                    <ListItemButton sx={{px: "30px"}}>
                        <Checkbox />
                        <ListItemText primary="Puma" />
                    </ListItemButton>
                    <ListItemButton sx={{px: "30px"}}>
                        <Checkbox />
                        <ListItemText primary="New Balance" />
                    </ListItemButton>
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
                        <Checkbox checked={menChecked} onClick={() => setMenChecked(!menChecked)} />
                        <ListItemText primary="Men" />
                    </ListItemButton>
                    <ListItemButton sx={{px: "30px"}}>
                        <Checkbox checked={womenChecked} onClick={() => setWomenChecked(!womenChecked)} />
                        <ListItemText primary="Women" />
                    </ListItemButton>
                    <ListItemButton sx={{px: "30px"}}>
                        <Checkbox checked={kidsChecked} onClick={() => setKidsChecked(!kidsChecked)} />
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
                                <ToggleButton key={s} value={s} aria-label={s}>
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
                                <FormControlLabel sx={{m: "2px"}} control={<Radio sx={{color: `${s}`, background: `${s}` ,'&.Mui-checked': {color: `${s}`, background: "none"}}} />} value={s} />
                            )
                        })
                    }

                </RadioGroup>
            </Collapse>
            <Divider />
            <Box sx={{width: "80%", padding: "10px"}}>
                <Slider
                    value={price}
                    onChange={(event, newPrice) => setPrice(newPrice)}
                    valueLabelDisplay="on"
                    min={2500}
                    max={40000}
                    step={500}
                 />
            </Box>
        </List>
    </div>
  )
}

export default DrawerComponent