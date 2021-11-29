"use strict";
exports.__esModule = true;
exports.Hiring = void 0;
var vacancy_1 = require("./vacancy");
var applicantData_1 = require("./applicantData");
var Hiring = /** @class */ (function () {
    function Hiring() {
    }
    //constructor() { }
    Hiring.prototype.scheduleInterview = function () {
        for (var _i = 0, VL_1 = vacancy_1.vacancyList; _i < VL_1.length; _i++) {
            var item = VL_1[_i];
            if (item.status == false) {
                console.log("Interview for ".concat(item.Post, " On ").concat(item.DateOfInterview));
            }
        }
    };
    Hiring.prototype.storingResult = function () {
        var ApplicantResult = [];
        for (var _i = 0, AL_1 = applicantData_1.ApplicantList; _i < AL_1.length; _i++) {
            var item = AL_1[_i];
            if (item.Result != null) {
                ApplicantResult.push({ ID: item.VacancyID, Name: item.Name, Result: item.Result });
            }
        }
        return ApplicantResult;
    };
    Hiring.prototype.HiringApplicant = function () {
        console.log("List of Hired Applicant");
        for (var _i = 0, AL_2 = applicantData_1.ApplicantList; _i < AL_2.length; _i++) {
            var item = AL_2[_i];
            if (item.Result != null && item.Result > 60) {
                console.log("".concat(item.Name, "\t").concat(item.Result));
            }
        }
    };
    Hiring.prototype.GenerateReport = function () {
        for (var _i = 0, VL_2 = vacancy_1.vacancyList; _i < VL_2.length; _i++) {
            var item = VL_2[_i];
            if (item.status == true) {
                console.log("For Post of ".concat(item.Post));
                for (var _a = 0, AL_3 = applicantData_1.ApplicantList; _a < AL_3.length; _a++) {
                    var a = AL_3[_a];
                    if (a.VacancyID == item.VacancyID) {
                        if (a.Result > 60) {
                            console.log("".concat(a.ApplicantID, "  ").concat(a.Name, "  ").concat(a.Result, "  Selected"));
                        }
                        else {
                            console.log("".concat(a.ApplicantID, "  ").concat(a.Name, "  ").concat(a.Result, "  Not Selected"));
                        }
                    }
                }
            }
            else {
                console.log("Interview for the Post of ".concat(item.Post, " to be held on ").concat(item.DateOfInterview));
            }
        }
    };
    return Hiring;
}());
exports.Hiring = Hiring;
