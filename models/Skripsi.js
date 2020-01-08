const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkripsiSchema = new Schema({
  judul: {
    type : String,
    required: true
  },
  penulis: {
    type : String,
    required: true,
  },
  tahun: {
    type : String,
    required: true
  }
});

module.exports = Skripsi = mongoose.model('Skripsi', SkripsiSchema);
