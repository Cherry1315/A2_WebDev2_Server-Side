    //creating a variable called dbcon that imports the hospital_db database to access it/connect to the database.
    var dbcon = require ("../hospital_db");
    //creating a variable called con that invokes a connection to hospital_db database with getconnection
    var con = dbcon.getconnection();
    //calling/starting the con method/connection. Opens a connection to the SQL database server.
    con.connect();
    //importing the express module
    var express = require("express");
    //creating a variable called router that wraps express.Router() object.
    var router = express.Router();



    /**
    For HTTP/client connection.
    -getting the root path ("/") of the router on a HTTP request.
    -arrow function with request (object) & response (object) parameters ((req, res) =>{}). This is a callback function.
    -query() (within the callback function) function has 2 parameters: SQL is the first parameter (that is selecting all
    from the doctor table within the hospital_db database), and the second parameter is error handling (err = error
    object/error within the query. records = if query is successful, a result is returned). fields = all data from
    the columns in the query result).
    -if else statement used for error handling. if error occurs then a message will print to the console, else send the
     database data to the client/HTTP response.
    **/
//    router.get("/", (req, res) =>{
//        con.query("SELECT * FROM hospital_db.doctor", (err, records, fields) => {
//            if (err) {
//                console.error("Error while retrieving the data");
//            } else {
//                res.send(records);
//            }
//        })
//    })

    //Get method endpoint.
    router.get("/", (req, res) => {
        con.query("SELECT DISTINCT " +
                   "doctor.DOCTOR_ID, " +
                   "doctor.NAME, " +
                   "doctor.MEDICALDEGREE, " +
                   "doctor.QUALIFICATION, " +
                   "doctor.SPECIALTY_ID, " +
                   "specialty.NAME AS SPECIALTY_NAME " +
                   "FROM " +
                   "doctor " +
                   "JOIN " +
                   "specialty ON doctor.SPECIALTY_ID = specialty.SPECIALTY_ID " +
                   "WHERE " +
                   "doctor.DOCTOR_ID;",  (err, records, fields) => {
        if (err) {
            console.error("error while retrieving the data");
        } else {
            res.send(records);
            }
        })
    })

    //Get method endpoint (this one is not required for the assignment/isn't utilised in Angular myApp).
    router.get("/:id", (req, res) => {
        con.query("SELECT DISTINCT " +
                   "doctor.DOCTOR_ID, " +
                   "doctor.NAME, " +
                   "doctor.MEDICALDEGREE, " +
                   "doctor.QUALIFICATION, " +
                   "doctor.SPECIALTY_ID, " +
                   "specialty.NAME AS SPECIALTY_NAME " +
                   "FROM " +
                   "doctor " +
                   "JOIN " +
                   "specialty ON doctor.SPECIALTY_ID = specialty.SPECIALTY_ID " +
                   "WHERE " +
                   "doctor.DOCTOR_ID=" + req.params.id, (err, records, fields) => {
        if (err) {
            console.error("error while retrieving the data");
        } else {
            res.send(records);
            }
        })
    })

    //post method endpoint.
    router.post("/", (req, res) => {
        var DOCTOR_ID = req.body.DOCTOR_ID;
        var NAME = req.body.NAME;
        var MEDICALDEGREE = req.body.MEDICALDEGREE;
        var QUALIFICATION = req.body.QUALIFICATION;
        var SPECIALTY_ID = req.body.SPECIALTY_ID;
        con.query("INSERT hospital_db.doctor (DOCTOR_ID, NAME, MEDICALDEGREE, QUALIFICATION, SPECIALTY_ID) VALUES(" + DOCTOR_ID + ",'" + NAME + "','" + MEDICALDEGREE + "','" + QUALIFICATION  + "'," + SPECIALTY_ID + ")",
        	(err, result)=> {
        		 if (err){
        			 console.error("Error while retrieving the data" + err);
        		 }else{
        			 res.send({insert: "Successfully added to the database"});
        		 }
        	})
    })

    //put/update method endpoint.
    router.put("/", (req, res) => {
        var DOCTOR_ID = req.body.DOCTOR_ID;
        var NAME = req.body.NAME;
        var MEDICALDEGREE = req.body.MEDICALDEGREE;
        var QUALIFICATION = req.body.QUALIFICATION;
        var SPECIALTY_ID = req.body.SPECIALTY_ID;
        con.query("UPDATE hospital_db.doctor SET NAME = '" + NAME + "'," +
        "MEDICALDEGREE = '" + MEDICALDEGREE + "'," +
        "QUALIFICATION = '" + QUALIFICATION + "'," +
        "SPECIALTY_ID = " + SPECIALTY_ID +
        " WHERE hospital_db.doctor.DOCTOR_ID =" + DOCTOR_ID,
            (err, result)=> {
                 if (err){
                     console.error("Error while updating the data" + err);
                 }else{
                     res.send({update: "Successfully updated "});
                 }
            })
    })

    //delete method endpoint
    router.delete("/:id", (req, res) => {
        con.query("DELETE FROM hospital_db.doctor WHERE DOCTOR_ID =" + req.params.id, (err, records, fields) => {
            if (err) {
                console.error("error while deleting the data");
            } else {
                res.send({delete: "Successfully deleted"});
            }
        })
    })





//        console.log("Received POST data:", req.body);
//        con.query("INSERT INTO hospital_db.doctor (DOCTOR_ID, NAME, MEDICALDEGREE, QUALIFICATION, SPECIALTY_ID) VALUES(" + doctorID + ",'" + doctorName + "','" + medicalDegree + "','" + qualification  + "'," + specialtyID + ")",
//        (err, result)=> {
//        		 if (err){
//        			 console.error("Error while retrieve the data" + err);
//        		 }else{
//        			 res.send({insert:"success"});
//        		 }
//        	})
//        })

    //export the router
    module.exports = router;

//    {
//            "doctorID": 11,
//            "doctorName": "Hermione Smiggins",
//            "medicalDegree": "DR",
//            "qualification": "MD, FRACS",
//            "specialtyID": 3
//    }



//       console.log("Received POST data:", req.body);
//
//console.log("Values to be inserted into the database:");
//    console.log("DOCTOR_ID:", DOCTOR_ID);
//    console.log("NAME:", NAME);
//    console.log("MEDICALDEGREE:", MEDICALDEGREE);
//    console.log("QUALIFICATION:", QUALIFICATION);
//    console.log("SPECIALTY_ID:", SPECIALTY_ID);


//
//    router.get("/:id", (req, res) => {
//        con.query("SELECT * FROM hospital_db.doctor WHERE DOCTOR_ID =" + req.params.id, (err, records, fields) => {
//            if (err) {
//                console.error("error while retrieving the data");
//            } else {
//                res.send(records);
//            }
//        })
//    })


//SELECT *
//FROM doctor
//JOIN specialty ON doctor.SPECIALTY_ID = specialty.SPECIALTY_ID