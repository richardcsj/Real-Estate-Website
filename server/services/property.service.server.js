module.exports=function(app,models){
  var propertyModel = models.propertyModel;
/*
properties = [
    {_id:"12",type:"appartment",description:"Apartment For Rent Unfurnished Rental Studio, 1 bath",size:950,latitude:40.702029,longitude:-73.989844,
    available:true,price:2500,valid:true,owner:{_id:"234"},customer:{_id:""},validatedBy:"123"},
    {_id:"23",type:"garage",description:"Garage for rent in San Francisco",size:500,latitude:37.734204,longitude:-122.437434,
    available:true,price:1100,valid:false,owner:{_id:"234"},customer:{_id:""},validatedBy:""},
    {_id:"34",type:"house",description:"House For Rent in San Francisco",size:1500,latitude: 37.736003,longitude:-122.434795,
    available:false,price:5000,valid:true,owner:{_id:"234"},customer:{_id:"456"},validatedBy:"123"},
    {_id:"45",type:"appartment",description:"Apartment For Rent in Washington",size:1000,latitude:47.407644,longitude:-118.864689,
    available:true,price:3000,valid:false,owner:{_id:"234"},customer:{_id:""},validatedBy:"123"},
    {_id:"56",type:"offices",description:"Offices for rent in Washington",size:1200,latitude:47.415544,longitude:-119.169559,
    available:true,price:4000,valid:true,owner:{_id:"234"},customer:{_id:""},validatedBy:"123"}
  ]
*/
  api = {
    'createProperty': createProperty,
    'findAllProperties' : findAllProperties,
    'findAllPropertiesForOwner': findAllPropertiesForOwner,
    'findPropertyById': findPropertyById,
    'updateProperty': updateProperty,
    'deleteProperty': deleteProperty
  };

  app.post('/api/property/owner/:ownerId',api.createProperty);
  app.get('/api/property/owner/:ownerId',api.findAllPropertiesForOwner);
  app.get('/api/property',api.findAllProperties);
  app.get('/api/property/:propertyId',api.findPropertyById);
  app.put('/api/property/:propertyId',api.updateProperty);
  app.delete('/api/property/:propertyId',api.deleteProperty);

  function createProperty(req,res){
  	var property = req.body.property;
  	var ownerId = req.params.ownerId;
    property.owner = ownerId;
    propertyModel.createProperty(property)
      .then(
        function(result){
          res.send(result);
        },
        function(error){
          console.log(error);
          res.status(500).send("Couldn't create property");
        }
      );
  }

  function findAllProperties(req,res){
    propertyModel.findAllProperties()
      .then(
        function(properties){
          res.send(properties);
        },
        function(error){
          console.log(error);
          res.status(500).send("Couldn't find properties");
        }
      );
  }

  function findAllPropertiesForOwner(req,res){
  	var ownerId = req.params.ownerId;
  	propertyModel.findAllPropertiesForOwner(ownerId)
      .then(
        function(properties){
          res.send(properties);
        },
        function(error){
          console.log(error);
          res.status(500).send("Couldn't find properties");
        }
      );
  }

  function findPropertyById(req,res){
  	var propertyId = req.params.propertyId;
    propertyModel.findPropertyById(propertyId)
      .then(
        function(properties){
          res.send(properties);
        },
        function(error){
          console.log(error);
          res.status(404).send("Couldn't find property for propertyId");
        }
      );
  }

  function updateProperty(req,res){
  	var propertyId = req.params.propertyId;
  	var property = req.body.property;
    propertyModel.updateProperty(propertyId,property)
      .then(
        function(property){
          res.send(property);
        },
        function(error){
          console.log(error);
          res.status(404).send("Couldn't update property for propertyId");
        }
      );
  }

  function deleteProperty(req,res){
  	var propertyId = req.params.propertyId;
    propertyModel.deleteProperty(propertyId)
      .then(
        function(properties){
          res.send({deleted:true});
        },
        function(error){
          console.log(error);
          res.status(404).send("Couldn't delete property for propertyId");
        }
      );
  }

	
}