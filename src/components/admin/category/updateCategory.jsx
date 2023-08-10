import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useSnackbar } from 'notistack'; 
import '../../../index.css'
import { Typography, Box, Paper, Grid, TextField, InputLabel, MenuItem, FormControl, Select, FormHelperText, Button, Stack} from '@mui/material';
import CheckPageAccess from '../../../contexts/checkPageAccess.js';
    
const UpdateCategory = () => {
    const params = useParams();
    document.title = 'Update Category'
    CheckPageAccess();
    const history = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        errors: {},
        category: '',
        status: ''
    })

    const handleOnChange = (e) => {
        e.preventDefault();
        let targetName = e.target.name;
        let targetValue = e.target.value;
        console.log('-addCategory--typing-:', targetValue);

        let data = {[targetName]: targetValue}
        
        let flag = 1;
        let err = validate(data);
      
        setFormData(prev => {
            return {
                ...prev,
                [targetName]: targetValue
            }
        })
    }

    const validate = (data) => {
        console.log('-validate--data-:', data);
        let category;
        if(data.hasOwnProperty('category')){
            if(data.category === ''){
                category = 'This field is required'
            }else {
                category = '';
            }
        }
        setFormData({
            ...formData,
            errors: {category}
        })
        return {category};
    }
    
    const handleSubmit = (e) => {
        // e.preventDefault();
        const model = {
            id: params.id,
            category: formData.category,
            status: formData.status === 1 ? true : false,
        }
        console.log('-handleSubmit--model:', model);

        let err = validate(model);
        let flag = 1;
        for(let key in err){
            if(err[key] !== ''){
                console.log('err[key]:', err[key])
                flag = 0;
            }
        }
        
        if(flag){
            Axios.post(`${process.env.REACT_APP_API_SERVICE}/category/update`, model)
            .then((result) => {
                console.log('-handleSubmit--update category--success--:', result);
                enqueueSnackbar('Form updated sucessfully!', { variant: 'success'});
                setTimeout(() => {
                    history('../manage-category');
                }, 2000)
            })
            .catch((error)=> {
                console.log('-handleSubmit--update category--error--:', error);
                enqueueSnackbar('Oops!, Something went wrong.', { variant: 'warning'})
            })
        }else {
            enqueueSnackbar('Kindly fix the highlighted errors.', { variant: 'error'})
        }
    }

    const getData = () => {
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/category/getById/` + params.id)
        .then((result) => {
            console.log('-useEffect--get data from server--success--:', result, result.data);
            setFormData((prev) => {
                return {
                    ...prev,
                    category: result.data.category,
                    status: result.data.status === true ? 1 : 2
                }
            })
        })
        .catch((error)=> {
            console.log('-useEffect--get data from server--error--:', error);
        })
    }

    useEffect(() => {
        getData();
    }, [1])

    return (
        <Box className="container">
        <Typography variant="h2.heading" component="h2" className="page-heading">Update Category</Typography>
        <Paper elevation={4} className="paper">
            <Grid container>
                <Grid item xs={12} sm={12} md={6} className="input-padding">
                    <TextField
                        name="category"
                        fullWidth
                        id="outlined-error-helper-text"
                        label="Category Name"
                        color="secondary"
                        value={formData.category}
                        onChange={handleOnChange}
                        helperText={formData.errors.category ?? formData.errors.category}
                        error={formData.errors.category ?? formData.errors.category === '' ? true : false}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="input-padding">
                    <FormControl fullWidth>
                        <InputLabel color="secondary">Status</InputLabel>
                        <Select
                            name="status"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.status}
                            label="Status"
                            color="secondary"
                            onChange={handleOnChange}
                            error={formData.errors.status ?? formData.errors.status === '' ? true : false}
                            // helperText={formData.errors.status ?? formData.errors.status}
                        >
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={2}>Inactive</MenuItem>
                        </Select>
                        <FormHelperText style={{color: '#d32f2f'}}>{formData.errors.status ?? formData.errors.status}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} className="input-padding" justifyContent="flex-end">
                    <Stack direction="row" spacing={2} mt={2} justifyContent="flex-end">
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className="primary-button-dark"
                            onClick={handleSubmit}
                            >Update
                        </Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className="primary-button-dark"
                            onClick={() => { history('../manage-category') }}
                            >Cancel
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
        </Box>
    )
}

export default UpdateCategory;