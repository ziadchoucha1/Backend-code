const validateSignup = (req, res, next) => {
    let { name, email, password } = req.body;

    name = sanitizeInput(name);
    email = sanitizeInput(email);

    const requiredError = validateRequired({ name, email, password }, ['name', 'email', 'password']);
    if (requiredError) return res.status(400).json({error: requiredError});

    const emailError = validateEmail(email); 
    if (emailError) return res.status(400).json({ error: emailError });

    const passwordError = validatePassword(password);
    if (passwordError) return res.status(400).json({ error: passwordError }); 

    req.body = { name, email, password };
    next();
};

module.exports = {
    validateSignup
};




const validateLogin = (req, res, next) => {
    let { name, email, password } = req.body;

    email = sanitizeInput(email);

    const requiredError = validateRequired({ email, password }, ['name', 'email', 'password']);
    if (requiredError) return res.status(400).json({error: requiredError});

    const emailError = validateEmail(email); 
    if (emailError) return res.status(400).json({ error: emailError });

    const passwordError = validatePassword(password);
    if (passwordError) return res.status(400).json({ error: passwordError }); 

    req.body = { email };
    next();
};

module.exports = {
    validateSignup,
    validateLogin
};