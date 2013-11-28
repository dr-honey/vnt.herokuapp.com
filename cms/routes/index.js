
/*
 * GET home page.
 */
 var db = require('../config');
 // var file = require('../req.files');
 
 var express = require("express");
var app = express();
var url = require('url');
 
/* app.configure(function () {
  app.use(express.bodyParser());
});
*/

var client =db.dbconnect();



exports.index = function(req,res)
{
 res.render('index');
};

exports.testimonial = function(req,res)
{
	var query= url.parse(req.url, true).query;
	
	var orderBy="TestimonialId";          //defaults orderby
    var msg;	
	if(query.orderby)
	{
	  orderBy = query.orderBy;
	}
	
	else if(query.dl)
	 {
		 var dl=query.dl;
		client.query('DELETE FROM testimonialinfo WHERE TestimonialId=?',[dl],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  }
			  else{
			     msg="delete";	  
				  }
			});
	 }
	else
	{}
client.query('SELECT * FROM testimonialinfo ORDER BY ?',[orderBy],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 
			 res.render("testimonial",{users:data,msg:msg});
			  
		   }
		  });
};

exports.reachUs = function(req,res)
{
	var query= url.parse(req.url, true).query;
	
	var orderBy="ContactId";          //defaults orderby
	var msg;
	if(query.orderby)
	{
	  orderBy = query.orderBy;
	}
	else if(query.dl)
	 {
		 var dl=query.dl;
		client.query('DELETE FROM contactinfo WHERE contactId=?',[dl],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  }
			  else{
			     msg="delete";	  
				  }
			});
	 }
	else{}
	
client.query('SELECT * FROM contactinfo ORDER BY ?',[orderBy],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 
			  res.render('reachUs',{users:data,msg:msg});
			  
		   }
		  });

};

exports.editTestimonial = function(req,res)
{
	var query= url.parse(req.url, true).query;
	 var id=query.id;
	client.query('SELECT * FROM testimonialinfo where testimonialId=?',[id],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 
			 res.render("edit-testmonial",{users:data});
			  
		   }
		  });


};
exports.saveTestimonial = function(req,res)
{
	var query= url.parse(req.url, true).query;
    var id = query.id;
	
	var data =req.body;
	var txtDescription=data.txtDescription;
	var txtPosition=data.txtPosition;
	var txtName=data.txtName;
	var txtDate=new Date();
	
	
	client.query('UPDATE testimonialinfo SET TestimonialDescription=?,PersonPosition=?,PersonName=?,CreatedDate=? WHERE TestimonialId=?',[txtDescription,txtPosition,txtName,txtDate,id],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 
			 res.redirect('/testimonial');
			 res.end();
			  
		   }
		  });


};


exports.createTestimonial = function(req,res)
{
   var query= url.parse(req.url, true).query;
    var id = query.id;
	
	var data =req.body;
	var txtDescription=data.txtDescription;
	var txtPosition=data.txtPosition;
	var txtName=data.txtName;
	var txtDate=new Date();
	
	
	client.query('INSERT INTO testimonialinfo (TestimonialDescription,PersonPosition,PersonName,CreatedDate) VALUES(?,?,?,?)',[txtDescription,txtPosition,txtName,txtDate],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 
			 res.redirect('/testimonial');
			 res.end();
			  
		   }
		  });
};
exports.editReachUs=function(req,res)
{
    var query= url.parse(req.url, true).query;
    var id = query.id;
	client.query('SELECT * FROM contactinfo where ContactId=?',[id],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 res.render("edit-reachUs",{users:data});
			  
		   }
		  });
	
	
}
exports.saveReachUs=function(req,res)
{
    var query= url.parse(req.url, true).query;
    var id = query.id;
	
	var qname =req.body.txtRName;
	var txtREmail =req.body.txtREmail;
	var txtRPhone=req.body.txtRPhone;
	var cmbRCountry=req.body.cmbRCountry;
	var txtRSubject=req.body.txtRSubject;
	var txtRMessage=req.body.txtRMessage;
	var createDate = new Date();
  
	client.query('UPDATE contactinfo SET ContactName=?,ContactEmail=?,ContactTelephone=?,ContactCountry=?,ContactSubject=?,ContactMessage=?,CreatedDate=? WHERE ContactId=?',[qname,txtREmail,txtRPhone,cmbRCountry,txtRSubject,txtRMessage,createDate,id],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 
			 res.redirect('/reach-us');
			 res.end();
			  
		   }
		  });
}
