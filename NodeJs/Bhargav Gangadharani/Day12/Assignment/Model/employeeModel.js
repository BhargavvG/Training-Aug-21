const mongoose = require('mongoose');
const database = 'mongodb://localhost/Task';

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MonoDB Connected...");
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

const employeeSchema = new mongoose.Schema({
    EmpId: { 
        type : Number, 
        required : true},
    Address:{
        line1: String,
        line2: String,
        line3: String
    },
    Assignments :[
        {
            AssignmentId  : Number,
            AssignmentName  : String,
            ActionCode  : String,
            ActionReasonCode  : String,
            ActualTerminationDate  : Date,
            AssignmentCategory  : String,
            assignmentDFF  : Array,
            assignmentExtraInformation  : Array,
            AssignmentNumber  : String,
            AssignmentProjectedEndDate  : Date,
            AssignmentStatus  : String,
            AssignmentStatusTypeId  : Number,
            BusinessUnitId  : Number,
            CreationDate  : Date,
            DefaultExpenseAccount  : String,
            DepartmentId  : Number,
            EffectiveEndDate  : Date,
            EffectiveStartDate  : Date,
            empreps  : Array,
            EndTime  : String,
            Frequency  : String,
            FullPartTime  : String,
            GradeId  : Number,
            GradeLadderId  : Number,
            JobId  : Number,
            LastUpdateDate  : Date,
            LegalEntityId  : Number,
            links  : Array,
            LocationId  : Number,
            ManagerAssignmentId  : Number,
            ManagerId  : Number
        }
    ],
    CitizenshipId : Number,
    CitizenshipLegislationCode : String,
    CitizenshipStatus : String,
    CitizenshipToDate : Date,
    City : String,
    CorrespondenceLanguage : String,
    Country : String,
    CreationDate :{
        type : Date , 
        default: Date.now
      },
    DateOfBirth : Date,
    directReports : Array,
    DisplayName : String,
    DriversLicenseExpirationDate : Date,
    DriversLicenseId : Number,
    DriversLicenseIssuingCountry : String,
    EffectiveStartDate : Date,
    Ethnicity : String,
    FirstName : {
        type: String,
        required: true,
        minlength : 3,
        maxlength : 255,
        trim: true
        },
    Gender : String,
    HireDate : Date,
    HomeFaxAreaCode : String,
    HomeFaxCountryCode : String,
    HomeFaxExtension : String,
    HomeFaxLegislationCode : String,
    HomeFaxNumber : String,
    HomePhoneAreaCode : String,
    HomePhoneCountryCode : String,
    HomePhoneExtension : String,
    HomePhoneLegislationCode : String,
    HomePhoneNumber : String,
    Honors : String,
    LastName : String,
    LastUpdateDate : Date,
    LegalEntityId : Number,
    LicenseNumber : String,
    links : Array,
    MaritalStatus : String,
    MiddleName : String,
    MilitaryVetStatus : String,
    NameSuffix : String,
    NationalId : String,
    NationalIdCountry : String,
});


const EmployeeModel = mongoose.model('employees', employeeSchema);

module.exports = EmployeeModel;