import bcrypt from "bcryptjs";

export const handleSignUp = (newUser: UserDetailsState) => {
    // Promise for simulating like an api call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // If no users exists get an empty array
            const allUsers = JSON.parse(window.localStorage.getItem("users") ?? '[]');
            // add new user in the user's list
            const userList: UserDetailsState[] = [...allUsers, newUser];

            localStorage.setItem("users", JSON.stringify(userList))
            // setting authentication to true
            localStorage.setItem("authenticated", 'true')
            resolve(true);
        }, 500);
    });
}

async function checkEmailAndPassword(users: UserDetailsState[], email: string, password: string): Promise<boolean> {
    for (const user of users) {
        if (user.email === email) {
            // Check password if email is found and if matches return true
            return await bcrypt.compare(password, user.password);
        }
    }

    // Email not found
    return false;
}

export const handleLogin = (email: string, password: string) => {
    // getting all users from localStorage
    const allUsers = JSON.parse(localStorage.getItem("users") ?? '[]');
    // Promise for simulating api call
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            // check if email and password matches
            if (await checkEmailAndPassword(allUsers, email, password)) {
                // setting authentication to true
                localStorage.setItem("authenticated", 'true')
                resolve(true);
            } else {
                reject(new Error('Invalid username or password'));
            }
        }, 500);
    });
};