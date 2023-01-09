
export interface UserT {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string
    };
    email: string;
    login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
    };
    dob: {
        date: string;
        age: number;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };

}

interface infoT {
    seed: string;
    results: number;
    page: number;
    version: string;
}

export interface RandomUsersI {
    results: Array<UserT>,
    info: infoT
}