import React from 'react';
import { useState} from 'react' 
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import {  Chip, Tooltip, CircularProgress, Box, FormHelperText, Button, Stack} from '@mui/material';
import {v4} from 'uuid'

import { storage } from '../../firebase/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

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

    // const imageListRef = ref(storage, 'image/')

    const handleDownload = () => {
       console.log('-handleDownload--:', imageUrl);
        const element = document.createElement('a');
        // element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(imageUrl));
        element.setAttribute('href', imageUrl.blob());

        element.setAttribute('download', fileName);
        document.body.appendChild(element);
        element.click();
    }

    const handleDelete = () => {
        console.log('-handleDownload--:', imageUrl);
        setImageUpload(null)
        setFileName('');
        setImageUrls([]);
        setImageUrl('');
        props.setFormData((prev) => {
            return {
                ...prev,
                'image_name': '',
                'image_url': ''
            }
        })
     }
 
    const handleUpload = (e) => {
        console.log("--uploadFIle----e.target.files[0]:", e.target.files[0]);
        setImageUpload(e.target.files[0])
        setFileName(e.target.files[0].name);
        props.setFormData((prev) => {
            return {
                ...prev,
                'image_name': e.target.files[0].name
            }
        })
        uploadImage(e.target.files[0]);
    }

    const uploadImage = (uploadedImage) => {
        if(uploadedImage == null) return;
        const imageRef = ref(storage, `image/${uploadedImage.name + v4()}`); 

        // const uploadTask  = uploadBytes(imageRef, uploadedImage)
        const uploadTask = uploadBytesResumable(imageRef, uploadedImage);
        
        uploadTask.on('state_changed', (snapshot) => {
            console.log('-uploadImage--uploadTask:', imageUpload)
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
            });
        }
        )
    }

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

            {/* {fileName} */}
            
            {imageUrls.length > 0 ? (
                <Tooltip title="Click to download or click on close to delete flle">
               <Chip
                label={fileName}
                variant="outlined"
                onClick={handleDownload}
                onDelete={handleDelete}
                /> 
                </Tooltip>
            ) : ''}
            
            {imageUrls.length > 0 ? (<img src={imageUrls[0]} style={{height: '180px', width: '280px', borderRadius: '10px'}} alt="preview" />) : '' }

        </Stack>
        <FormHelperText style={{color: '#d32f2f'}}>{props.formData.errors.image_url ?? props.formData.errors.image_url}</FormHelperText>
        </>
    )
}   

export default UploadFile;