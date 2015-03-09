/*globals App*/
var express = require('express'),
    router = express.Router(),
    auth = App.require('/helpers/auth'),
    Events = App.require('/models/modules/events');

router.route('/events/:id?')
.post(auth.creds, function (req, res, next) {
  var event = new Events({
    title:       req.body.title,
    image:       req.body.image,
    slug:        req.body.slug,
    category:    req.body.category,
    body:        req.body.body,
    startDate:   req.body.startDate,
    endDate:     req.body.endDate,
    location:    req.body.location,
    eventStatus: req.body.eventStatus
  });
  event.save(function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
})
.get(function (req, res, next) {
  Events.find(function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
})
.put(auth.creds, function (req, res, next) {
  Events.findOne({'_id': req.body._id}, function(err, doc){
    if (err) {return next(err);}
    
    doc.title =       req.body.title       || doc.title;
    doc.image =       req.body.image       || doc.image;
    doc.slug =        req.body.slug        || doc.slug;
    doc.category =    req.body.category    || doc.category;
    doc.body =        req.body.body        || doc.body;
    doc.startDate =   req.body.startDate   || doc.startDate;
    doc.endDate =     req.body.endDate     || doc.endDate;
    doc.location =    req.body.location    || doc.location;
    doc.eventStatus = req.body.eventStatus || doc.eventStatus;

    doc.save(function(err, doc){
      if (err) {return next(err);}
      res.success(doc);
    });
  });
})
.delete(auth.creds, function (req, res, next) {
  Events.remove({'_id': req.body._id}, function(err, doc){
    if (err) {return next(err);}
    res.success(doc);
  });
});





module.exports = router;
