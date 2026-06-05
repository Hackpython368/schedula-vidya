import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    checkUser(){
        return {message: "User created Successfully !!"}
    }
}
