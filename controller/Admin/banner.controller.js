var mongoose = require('mongoose');
const BannerController = require('../../models/Admin/banner.model');
// const AWS = require('aws-sdk');
// const BUCKET_NAME = 'komboloans3';
// const IAM_USER_KEY = 'AKIAI43JE2LK4X3U4CIA';
// const IAM_USER_SECRET = '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';
// const Handler = require('../../Handlers/app.handler');
// const Busboy = require('busboy');

// function  uploadFileInS3(fileRandom,req){ 
//     if(!fileRandom){return}
//     return new Promise((resolve,reject)=>{
//         var busboy = new Busboy({ headers: req.headers });
//       busboy.on('finish', function() {
//           var file = fileRandom
//                let s3bucket = new AWS.S3({
//              accessKeyId: IAM_USER_KEY,
//              secretAccessKey: IAM_USER_SECRET,
//              Bucket: BUCKET_NAME,
//            });
//           s3bucket.createBucket(function () {
//              var params = {
//               Bucket: BUCKET_NAME,
//                ACL:'public-read',
//               Key: file.name,
//               Body: file.data,
//              };
//                  s3bucket.upload(params, function (err, data) {
//                   if (err) {
//                  console.log('error in callback');
//                    console.log(err);

//                     reject(error)
//                   }
//                   else{
//                        resolve(data.Location)
//                        }
//                      })
//                    })
//                  }); 
//           req.pipe(busboy);                
//     })
// };

// adminController.addProfilePic = async (req, res) => {
//     user.findOneAndUpdate({_id:req.body.id},
//         {$set: {profile_pic:await uploadFileInS3(req.files.pic,req)
//                }
//          },
//         function(err,Client){
//            if(err){
//                console.log("Error");
//            }else{
               
//               return res.status(200).send({message:"Profile picture updated",code:200})           
//            }
//        });

// }

exports.addBannerImage = ( req, res, next ) => {

}

exports.create = (req, res, next) => {
    const data = new BannerController({
        banner_title: req.body.banner_title,
        banner_category: req.body.banner_category,
        banner_image: req.body.banner_image,
        is_active: true,
       
    }, {
        timestamps: true,
        versionKey: false // You should be aware of the outcome after set to false
    });
    return data.save()
        .then((result) => {
            Handler.createHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.getAll = ( req, res, next ) => {
    return BannerController.find()
    .exec()
    .then((data) => {
        Handler.getAllHandler(res, data);
    })
    .catch((error) => {
        Handler.errorHandler(res, error);
    });
};

exports.getById = ( req, res, next ) => {
    const id = req.params.id;
    // console.log('reqparams', req.params)
    const details = { '_id': mongoose.Types.ObjectId(id) };
    return BannerController.findOne(details)
    .exec()
    .then((data) => {
       Handler.getByIdHandler(res, data); 
    })
    .catch((error) => {
        Handler.errorHandler(res, error);
    });
};

exports.updateById = ( req, res, next ) => {
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    var data = {};
    if (req.body.banner_title != null) {
        data['banner_title'] = req.body.banner_title;
    }
    if( req.body.banner_category != null ) {
        data['banner_category'] = req.body.banner_category;
    }
    if( req.body.banner_image != null ) {
        data['banner_image'] = req.body.banner_image;
    }
    if (req.body.is_active != null ) {
        data['is_active'] = req.body.is_active;
    }

    return BannerController.updateOne(details, data)
    .exec()
    .then((result) => {
        Handler.updateByIdHandler( res, data, result );
    })
    .catch((error) => {
        Handler.errorHandler( res, error);
    })
}

exports.deleteById = (req, res, next) => {
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    return DoctorController.deleteOne(details)
        .exec()
        .then((result) => {
            Handler.deleteByIdHandler(res, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};
