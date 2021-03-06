const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
// const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
}));

//add other middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
// app.use(morgan('dev'));

//start app 
const port = process.env.PORT || 3000;

app.post('/upload-avatar', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + Date.now() + '-' + avatar.name );

            //send response
            res.send({
                status: true,
                message: 'File is uploaded 1',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);