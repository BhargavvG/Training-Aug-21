"use strict";
exports.__esModule = true;
exports.Vacancies = exports.vacancyList = void 0;
exports.vacancyList = [
    {
        VacancyID: 1,
        DateOfInterview: new Date(28 - 11 - 2021),
        Post: ".Net Developer",
        Experience: 2,
        venue: "Ahmedabad",
        TotalSeat: 7,
        Salary: 30000,
        Bond: 2,
        status: true
    },
    {
        VacancyID: 2,
        DateOfInterview: new Date(26 - 11 - 2021),
        Post: "React Developer",
        Experience: 2,
        venue: "Ahmedabad",
        TotalSeat: 7,
        Salary: 30000,
        status: false
    }
];
var Vacancies = /** @class */ (function () {
    function Vacancies() {
    }
    Vacancies.prototype.setVacancyData = function (data) {
        exports.vacancyList.push(data);
    };
    Vacancies.prototype.removeVacancy = function (VacancyID) {
        for (var _i = 0, vacancyList_1 = exports.vacancyList; _i < vacancyList_1.length; _i++) {
            var item = vacancyList_1[_i];
            if (VacancyID == item.VacancyID) {
                var index = exports.vacancyList.indexOf(item);
                exports.vacancyList.splice(index, 1);
            }
        }
    };
    return Vacancies;
}());
exports.Vacancies = Vacancies;
