export const GlobalVariable = Object.freeze({
    BASE_API_URL:"http://localhost:51020"
});

export const RequestApi = Object.freeze({
    
    //User API Call
    POST_USER_LOGIN:GlobalVariable.BASE_API_URL+'/user/signin',
  
	//Bank and Branch API Call
    GET_GetBankList:GlobalVariable.BASE_API_URL+'/api/BankBranch/GetBankList',
    GET_GetBranchList: GlobalVariable.BASE_API_URL+'/api/BankBranch/GetBranchList',
    POST_AddBranch:GlobalVariable.BASE_API_URL+'/api/bankbranch/addbranch',
    PUT_UpdateBranch:GlobalVariable.BASE_API_URL+'/api/BankBranch/UpdateBranch',
    DELETE_DeleteBranch:GlobalVariable.BASE_API_URL+'/api/BankBranch/DeleteBranch/',

     //Get Customer List
     GET_CustomerList:GlobalVariable.BASE_API_URL+'/api/Invoice/GetCustomerList',
});