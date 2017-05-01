export class ApiResponse<T> {
    public message:string;
    public model:T;

    deserialize(input:any):ApiResponse<T> {
        if(input) {
            this.message = input.message;
            this.model = input.model;
        }

        return this;
    }
}