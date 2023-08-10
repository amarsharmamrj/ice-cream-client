import React from 'react';
import { useState, useEffect } from 'react' 
import LinearProgress from '@mui/material/LinearProgress';
import { styled, useThemeProps } from '@mui/material/styles';
import { Typography, CircularProgress, Box, Paper, Grid, TextField, InputLabel, MenuItem, FormControl, Select, FormHelperText, Button, Stack} from '@mui/material';
import { useDebugValue } from 'react';
import {v4} from 'uuid'

import { storage } from '../../firebase/firebase';
import { ref, uploadBytes, listAll, list, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

const Input = styled('input')({
    display: 'none',
  });

const UploadFile = (props) => {
    const [ imageUpload, setImageUpload] = useState(null);
    const [ fileName, setFileName] = useState(''); 
    const [ imageUrl, setImageUrl] = useState(''); 
    const [ imageUrls, setImageUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    const [buffer, setBuffer] = useState(0);

    const imageListRef = ref(storage, 'image/')

    function CircularProgressWithLabel(props) {
        return (
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="caption" component="div" color="text.secondary">
                {`${Math.round(props.value)}%`}
              </Typography>
            </Box>
          </Box>
        );
      }

    const handleUpload = (e) => {
        console.log("--uploadFIle----e.target.files[0]:", e.target.files[0], e.target.files[0]);
        setImageUpload(e.target.files[0])
        setFileName(e.target.files[0].name);
        props.setFormData((prev) => {
            return {
                ...prev,
                'image_name': e.target.files[0].name
            }
        })
        uploadImage();
    }

    const uploadImage = () => {
        if(imageUpload == null) return;
        const imageRef = ref(storage, `image/${imageUpload.name + v4()}`); 

        // const uploadTask  = uploadBytes(imageRef, imageUpload)
        const uploadTask = uploadBytesResumable(imageRef, imageUpload);
        
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("progress:", progress)
            setProgress(progress);
            if (progress > 100) {
                setProgress(0);
                setBuffer(0);
              } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
              }
        },
        (error) => {
            console.log("uncessfull upload:", error)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setImageUrls((prev) => [downloadURL]);
                setImageUrl(downloadURL);
                props.setFormData((prev) => {
                    return {
                        ...prev,
                        'image_url': downloadURL
                    }
                })
                // props.setImageUrl();
            });
        }
        )
    }

    useEffect(() => {
        // listAll(imageListRef).then((response) => {
        //     console.log("response", response)
        //     response.items.forEach((item) => {
        //         getDownloadURL(item).then((url) => {
        //             setImageUrls((prev) => [...prev, url]);
        //         })
        //     })
        // })
    }, [])

    return (
        <>
         <Box sx={{ width: '100%' }}>
              <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
        </Box>
         <Stack direction="row" spacing={2} mt={2} justifyContent="space-between">
            <label htmlFor="contained-button-file">
            <Input 
                accept="image/*" 
                id="contained-button-file" 
                single="true" type="file" 
                disabled={progress > 0 && progress < 100 ? true : false} 
                onChange={handleUpload}
                />
                {progress > 0 && progress < 100 ? (
                    <CircularProgress className="color-blue" />
                ) : (
                    <Button variant="contained" component="span"  className="bg-blue">
                        Upload
                    </Button> 
                )}
            </label>

            {fileName}
            
            {imageUrls.length > 0 ? (<img src={imageUrls[0]} style={{height: '180px', width: '280px', borderRadius: '10px'}} alt="preview" />) : '' }

        </Stack>
        <FormHelperText style={{color: '#d32f2f'}}>{props.formData.errors.image_url ?? props.formData.errors.image_url}</FormHelperText>
        </>
    )
} 

export default UploadFile;