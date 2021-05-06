var mongoose = require('mongoose');
var CONNECTION = 'mongodb+srv://cristhian:Cris@cluster0.nnqvo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&ssl=true';
mongoose.connect(CONNECTION, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then((db) => {
      console.log("DB is connected")
  })
  .catch(err => console.error(err));
