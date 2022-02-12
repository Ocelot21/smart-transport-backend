import User from "../models/user.model";

const createOrFindAdminAccount = async() => {
    const user = {
        username: 'afan',
        email: "afanb99@gmail.com",
        role: "admin"
    };
    const admin = await User.findOne(user);

    if(!admin){
        await User.create({
            ...user,
            password: "$2a$12$w1v9Zn3s1/v5T8wz5ayDDOsYhxGebIn.3M8ZHZm543vvXeTdwrcnW"
        })
    }
}

export default createOrFindAdminAccount;