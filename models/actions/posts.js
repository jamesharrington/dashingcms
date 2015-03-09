var mongoose = require('mongoose'),
    slug = require('slug'),
    ub = App.require('/helpers/ub');


PostsSchema = new mongoose.Schema({
  created: {type:Number, default: Date.now()},
  title:{type:String, required:[true, 'Please supply a title']},
  slug:{type:String},
  category:{type:String, required:[true, 'Please supply a category']},
  body:{type:String, required:[true, 'Please supply body']},
});



PostsSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = slug(this.title);
    next();
  };
  next();
});





Page = module.exports = mongoose.model('Page', PostsSchema);
