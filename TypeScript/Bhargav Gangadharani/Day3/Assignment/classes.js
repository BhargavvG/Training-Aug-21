"use strict";
exports.__esModule = true;
exports.Hiring = exports.ApplicantData = exports.Vacancies = void 0;
var list_1 = require("./list");
var Vacancies = /** @class */ (function () {
    function Vacancies() {
    }
    Vacancies.prototype.setVacancyData = function (data) {
        list_1.vacancyList.push(data);
    };
    Vacancies.prototype.removeVacancy = function (VacancyID) {
        for (var _i = 0, VL_1 = list_1.vacancyList; _i < VL_1.length; _i++) {
            var item = VL_1[_i];
            if (VacancyID == item.VacancyID) {
                var index = list_1.vacancyList.indexOf(item);
                list_1.vacancyList.splice(index, 1);
            }
        }
    };
    return Vacancies;
}());
exports.Vacancies = Vacancies;
var ApplicantData = /** @class */ (function () {
    function ApplicantData() {
    }
    ApplicantData.prototype.setApplicantData = function (data) {
        for (var _i = 0, VL_2 = list_1.vacancyList; _i < VL_2.length; _i++) {
            var item = VL_2[_i];
            if (data.VacancyID == item.VacancyID) {
                if (item.status == true && data.Result != null) {
                    list_1.ApplicantList.push(data);
                }
                else {
                    console.log("This interview is completed please enter the result of applicant");
                }
                if (item.status == false && data.Result == null) {
                    list_1.ApplicantList.push(data);
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
        for (var _i = 0, AL_1 = list_1.ApplicantList; _i < AL_1.length; _i++) {
            var item = AL_1[_i];
            console.log(item);
        }
    };
    return ApplicantData;
}());
exports.ApplicantData = ApplicantData;
var Hiring = /** @class */ (function () {
    function Hiring() {
    }
    //constructor() { }
    Hiring.prototype.scheduleInterview = function () {
        for (var _i = 0, VL_3 = list_1.vacancyList; _i < VL_3.length; _i++) {
            var item = VL_3[_i];
            if (item.status == false) {
                console.log("Interview for ".concat(item.Post, " On ").concat(item.DateOfInterview));
            }
        }
    };
    Hiring.prototype.storingResult = function () {
        var ApplicantResult = [];
        for (var _i = 0, AL_2 = list_1.ApplicantList; _i < AL_2.length; _i++) {
            var item = AL_2[_i];
            if (item.Result != null) {
                ApplicantResult.push({ ID: item.VacancyID, Name: item.Name, Result: item.Result });
            }
        }
        return ApplicantResult;
    };
    Hiring.prototype.HiringApplicant = function () {
        console.log("List of Hired Applicant");
        for (var _i = 0, AL_3 = list_1.ApplicantList; _i < AL_3.length; _i++) {
            var item = AL_3[_i];
            if (item.Result != null && item.Result > 60) {
                console.log("".concat(item.Name, "\t").concat(item.Result));
            }
        }
    };
    Hiring.prototype.GenerateReport = function () {
        for (var _i = 0, VL_4 = list_1.vacancyList; _i < VL_4.length; _i++) {
            var item = VL_4[_i];
            if (item.status == true) {
                console.log("For Post of ".concat(item.Post));
                for (var _a = 0, AL_4 = list_1.ApplicantList; _a < AL_4.length; _a++) {
                    var a = AL_4[_a];
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
