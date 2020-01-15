const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const db = req.app.get('db');
    const { username, password, isAdmin } = req.body;

    const existingUser = await db.checkForUser(username);

    if(existingUser[0]){
        res.status(409).json('Username already taken, please choose another');
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await db.registerUser(username, hash, isAdmin);

        req.session.user = {
            user_id: newUser[0].user_id,
            username: newUser[0].username,
            isAdmin: newUser[0].isadmin
        }
        res.status(200).json(req.session.user);
    }
}

const login = async (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;

    const existingUser = await db.checkForUser(username);

    if(!existingUser[0]){
        res.status(403).json('Please create an account')
    } else {
        const authUser = bcrypt.compareSync(password, existingUser[0].hash);

        if(!authUser){
            res.status(403).json('Username or password incorrect, please try again')
        } else {
            req.session.user = {
                user_id: existingUser[0].user_id,
                username: existingUser[0].username,
                isAdmin: existingUser[0].isadmin
            }
            res.status(200).json(req.session.user)
        }
    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.status(200).json('Logout successful')
}

module.exports = {
    register,
    login,
    logout
}