const express = require('express');
const skripsiRouter = express.Router();
//Model
const Skripsi = require('../../models/Skripsi');

//CRUD 
//Create
skripsiRouter.post('/', (req, res)=>{
  const file = new File(req.body);
  file.save((err, document)=>{
    if(err){
      res.status(500).json({
        msg:{
          msgBody : "Gagal menambahkan file!",
          msgError: true
        }
      })
    }
    else {
      res.status(200).json({
        msg:{
          msgBody : "Sukses menambahkan file!",
          msgError: false
        }
      })
    }
  })
})
//Read
skripsiRouter.get('/', (req, res)=>{
  Skripsi.find({}, (err,response) =>{
    if(err){
      res.status(500).json({
        msg:{
          msgBody : "Gagal mengambil file!",
          msgError: true
        }
      })
    }
  })
})

//Delete
skripsiRouter.delete('/:id', (req, res)=>{
  Skripsi.findByIdAndDelete(req.params.id, err=>{
    if(err){
      res.status(500).json({
        msg:{
          msgBody : "Gagal menghapus file!",
          msgError: true
        }
      })
    }
    else {
      res.status(200).json({
        msg:{
          msgBody : "Sukse menghapus file!",
          msgError: false
        }
      })
    }
  })
})

//Update
skripsiRouter.put('/:id', (req, res)=>{
  Skripsi.findOneAndUpdate(req.params.id, req.body, {runValidators : true}, (err, response)=>{
    if(err){
      res.status(500).json({
        msg:{
          msgBody : "Gagal mengubah file!",
          msgError: true
        }
      })
    }
    else {
      res.status(200).json({
        msg:{
          msgBody : "Sukse mengubah file!",
          msgError: false
        }
      })
    }
  })
})
module.exports = skripsiRouter;
