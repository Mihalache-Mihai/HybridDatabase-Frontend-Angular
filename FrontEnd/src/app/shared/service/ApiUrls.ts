export class ApiUrl{
    static readonly signUp = '/users/sign-up';
    static readonly login = '/login';
    static readonly companyUrl = '/company/';
    static readonly employeeUrl= '/employee/';
    static readonly medicineUrl= '/medicine/';
    static readonly medicineMongoUrl='/medicineMongo/';
    static readonly prescriptionUrl='/prescription/';

    //find by cui
    //static readonly CUI='12234123';
    static readonly CUI='123456';


    //find by username
    static readonly username='mihai';

    //find by name and stock
    static readonly medicineMongoName='mihaitest/';
    static readonly medicineMongoStock='2019';

    //find by name and county

    static readonly prescriptionName='mihai/';
    static readonly prescriptionCounty='brasov';

    static readonly serverUrl = 'http://localhost:8080';
}