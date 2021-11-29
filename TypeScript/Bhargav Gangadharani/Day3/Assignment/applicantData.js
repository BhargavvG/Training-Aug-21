"use strict";
exports.__esModule = true;
exports.ApplicantData = exports.ApplicantList = void 0;
var vacancy_1 = require("./vacancy");
exports.ApplicantList = [
    {
        ApplicantID: 1,
        Name: "Varun",
        Age: 22,
        Experience: 2,
        Address: "Ahmedabad",
        VacancyID: 2
    },
    {
        ApplicantID: 2,
        Name: "Tarun",
        Age: 23,
        Experience: 2,
        Address: "Vadodara",
        VacancyID: 1,
        Result: 60
    },
    {
        ApplicantID: 3,
        Name: "Aarun",
        Age: 22,
        Experience: 1,
        Address: "Ahmedabad",
        VacancyID: 2
    },
    {
        ApplicantID: 4,
        Name: "Kevin",
        Age: 23,
        Experience: 3,
        Address: "Rajkot",
        VacancyID: 1,
        Result: 50
    }
];
var ApplicantData = /** @class */ (function () {
    function ApplicantData() {
    }
    ApplicantData.prototype.setApplicantData = function (data) {
        for (var _i = 0, VL_1 = vacancy_1.vacancyList; _i < VL_1.length; _i++) {
            var item = VL_1[_i];
            if (data.VacancyID == item.VacancyID) {
                if (item.status == true && data.Result != null) {
                    exports.ApplicantList.push(data);
                }
                else {
                    console.log("This interview is completed please enter the result of applicant");
                }
                if (item.status == false && data.Result == null) {
                    exports.ApplicantList.push(data);
                }
                else {
                    console.log("This interview is not completed please do not enter the result of applicant");
                }
            }
            else {
                console.log("No vacancy available for VacancyID ".concat(data.VacancyID));
            }
        }
    };
    ApplicantData.prototype.ShowApplicants = function () {
        for (var _i = 0, ApplicantList_1 = exports.ApplicantList; _i < ApplicantList_1.length; _i++) {
            var item = ApplicantList_1[_i];
            console.log(item);
        }
    };
    return ApplicantData;
}());
exports.ApplicantData = ApplicantData;
