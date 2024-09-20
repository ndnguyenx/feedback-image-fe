interface IDataUser {
    userId: string;
    userRoles: string[];
    userEmail: string;
    userName: string;
    userIsRootAdmin: boolean;
}

export interface IAuthLogin {
    account: string;
    password: string;
}

export interface IResponseLogin {
    token: string;
    user: IDataUser;
}

export interface ICategory {
    id?: string;           
    name: string;         
    description?: string; 
    parentId?: string;    
    createdAt?: Date;   
    updatedAt?: Date;   
  }