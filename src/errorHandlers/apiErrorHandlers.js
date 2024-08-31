class APIErrorHandler{
    constructor({
        resCode,
        errorMessage
    }){
        this.resCode = resCode;
        this.errorMessage = errorMessage;
    }

    getError(){
        return {
            resCode:this.resCode,
            error:new Error(this.errorMessage)
        }
    }
    
    logError(){
        //TBD
    }
}

export default APIErrorHandler;