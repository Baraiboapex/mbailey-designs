class FECodeErrorHandlers{
    constructor({
        errorMessage
    }){
        this.errorMessage = errorMessage;
    }

    getError(){
        return {
            error:new Error(this.errorMessage)
        }
    }
    
    logError(){
        //TBD
    }
}

export default FECodeErrorHandlers;