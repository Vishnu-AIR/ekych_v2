const UserModel = require("./usermodel")


class UserService{
    static async registerUser({mobile, gender, state, ageBand, isIssued, caseId}){
        try {

            

            const createUser =  new UserModel({mobile, gender, state, ageBand, isIssued, caseId});
            
            return await createUser.save();

        } catch (error) {
            return error
        }
    }

    
}


module.exports = UserService;