
export const expenseValidate = () => {
    if (req.body.name === ('')) {
        res.send("Name must be entered");
    }
    else if (req.body.password.length < 8 || req.body.password === ('')) {
        res.send("Enter the correct password");
    } else {
        next();
    }
}